#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node onboarding-check.js <application.json> <profile.json> <bundle.json>');
  process.exit(2);
}

const readJson = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const [application, profile, bundle] = args.map(readJson);
const errors = [];
const warnings = [];
const profileIds = new Set((profile.requirements || []).map(x => x.id));
const responses = application.requirementResponses || [];
const responseIds = responses.map(x => x.requirementId);
const subjects = new Map((bundle.subjects || []).map(x => [x.id, x]));
const orgs = new Map((bundle.organizations || []).map(x => [x.id, x]));

if (application.applicationVersion !== '0.4') errors.push('applicationVersion must be 0.4');
if (application.profileId !== profile.id || application.profileVersion !== profile.version) errors.push('application profile ID/version must exactly match selected profile');
if (!orgs.has(application.applicantOrganizationId)) errors.push('applicantOrganizationId does not exist in bundle');
if (new Set(responseIds).size !== responseIds.length) errors.push('requirementResponses contain duplicate requirement IDs');

for (const requirement of profile.requirements || []) {
  if (requirement.class === 'blocking' && requirement.method !== 'incident-policy' && !responseIds.includes(requirement.id)) {
    errors.push(`missing blocking requirement response: ${requirement.id}`);
  }
}
for (const response of responses) if (!profileIds.has(response.requirementId)) errors.push(`unknown requirement response: ${response.requirementId}`);

for (const id of application.scope?.facilitySubjectIds || []) {
  const subject = subjects.get(id);
  if (!subject) errors.push(`unknown facility subject: ${id}`);
  else if (subject.kind !== 'facility') errors.push(`facilitySubjectIds entry is not kind=facility: ${id}`);
  else if (subject.organizationId !== application.applicantOrganizationId) errors.push(`facility is not controlled by applicant organization: ${id}`);
}
for (const id of application.scope?.coveredSubjectIds || []) if (!subjects.has(id)) errors.push(`unknown covered subject: ${id}`);

const prohibitedKeys = /(^|_)(password|secret|privatekey|private_key|token)$/i;
function scan(value, location = '$') {
  if (Array.isArray(value)) return value.forEach((item, i) => scan(item, `${location}[${i}]`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (prohibitedKeys.test(key)) errors.push(`prohibited secret-like field in onboarding packet: ${location}.${key}`);
    scan(child, `${location}.${key}`);
  }
}
scan(application);

for (const ref of application.restrictedDocumentRefs || []) {
  if (ref.visibility !== 'restricted-verifier') errors.push(`restricted document ${ref.id} must remain restricted-verifier`);
  for (const forbidden of ['content', 'body', 'raw', 'text']) if (forbidden in ref) errors.push(`restricted document ${ref.id} contains forbidden inline content field: ${forbidden}`);
}

if (application.publicationConsent !== true) warnings.push('publicationConsent is not true; a public Registry should not publish this application');

const report = {
  ok: errors.length === 0,
  applicationId: application.id,
  profile: `${profile.id}@${profile.version}`,
  errors,
  warnings,
  notice: 'This check validates onboarding structure and references. It does not verify legal authority, factual truth, food safety, or professional qualifications.'
};
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
