#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const LEVEL = { T0: 0, T1: 1, T2: 2, T3: 3 };
const input = process.argv[2];
if (!input) {
  console.error('Usage: node verifier.js <trust-bundle.json>');
  process.exit(2);
}

const bundlePath = path.resolve(input);
const bundleDir = path.dirname(bundlePath);
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
const errors = [];
const warnings = [];
const digestChecks = [];
const byId = xs => new Map((xs || []).map(x => [x.id, x]));
const orgs = byId(bundle.organizations);
const subjects = byId(bundle.subjects);
const claims = byId(bundle.claims);
const evidence = byId(bundle.evidence);
const verifications = byId(bundle.verifications);

function requireRef(map, id, context) {
  if (!map.has(id)) errors.push(`${context}: missing reference ${id}`);
}

function localEvidencePath(uri) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(uri)) return null;
  const candidate = path.resolve(bundleDir, uri);
  const prefix = bundleDir.endsWith(path.sep) ? bundleDir : bundleDir + path.sep;
  if (candidate !== bundleDir && !candidate.startsWith(prefix)) return false;
  return candidate;
}

for (const subject of bundle.subjects || []) requireRef(orgs, subject.organizationId, subject.id);

for (const ev of bundle.evidence || []) {
  requireRef(subjects, ev.subjectId, ev.id);
  requireRef(orgs, ev.sourceOrganizationId, ev.id);
  if (!ev.integrity || ev.integrity.algorithm !== 'sha256' || !/^[a-fA-F0-9]{64}$/.test(ev.integrity.digest || '')) {
    errors.push(`${ev.id}: invalid or missing sha256 integrity digest`);
    continue;
  }
  const localPath = localEvidencePath(ev.uri);
  if (localPath === false) {
    errors.push(`${ev.id}: evidence URI escapes the bundle directory`);
  } else if (localPath === null) {
    warnings.push(`${ev.id}: remote evidence URI was not fetched by the offline verifier`);
  } else if (!fs.existsSync(localPath) || !fs.statSync(localPath).isFile()) {
    errors.push(`${ev.id}: local evidence file not found at ${ev.uri}`);
  } else {
    const actual = crypto.createHash('sha256').update(fs.readFileSync(localPath)).digest('hex');
    const matches = actual.toLowerCase() === ev.integrity.digest.toLowerCase();
    digestChecks.push({ evidenceId: ev.id, uri: ev.uri, expected: ev.integrity.digest, actual, matches });
    if (!matches) errors.push(`${ev.id}: sha256 digest mismatch for ${ev.uri}`);
  }
}

for (const verification of bundle.verifications || []) {
  requireRef(claims, verification.claimId, verification.id);
  requireRef(orgs, verification.verifierOrganizationId, verification.id);
}

for (const claim of bundle.claims || []) {
  requireRef(subjects, claim.subjectId, claim.id);
  for (const id of claim.evidenceIds || []) requireRef(evidence, id, claim.id);
  for (const id of claim.verificationIds || []) requireRef(verifications, id, claim.id);
  const n = LEVEL[claim.level];
  if (n === undefined) errors.push(`${claim.id}: unknown level ${claim.level}`);
  if (n >= 1 && (claim.evidenceIds || []).length === 0) errors.push(`${claim.id}: ${claim.level} requires evidence`);
  if (n >= 2) {
    const hasContinuous = (claim.evidenceIds || []).some(id => ['continuous-observation', 'sensor'].includes(evidence.get(id)?.category));
    if (!hasContinuous) warnings.push(`${claim.id}: ${claim.level} has no continuous-observation or sensor evidence; profile-specific rules may still permit this`);
  }
  if (n >= 3) {
    const subject = subjects.get(claim.subjectId);
    const owner = subject && orgs.get(subject.organizationId);
    const independent = (claim.verificationIds || []).some(id => {
      const v = verifications.get(id);
      return v?.status === 'verified' && owner && v.verifierOrganizationId !== owner.id;
    });
    if (!independent) errors.push(`${claim.id}: T3 requires at least one verified independent verifier`);
  }
}

for (const conf of bundle.conformance || []) {
  requireRef(subjects, conf.subjectId, conf.id);
  for (const id of conf.claimIds || []) requireRef(claims, id, conf.id);
  const levels = (conf.claimIds || []).map(id => LEVEL[claims.get(id)?.level] ?? -1);
  const minClaimLevel = levels.length ? Math.min(...levels) : -1;
  if ((LEVEL[conf.level] ?? -1) > minClaimLevel) errors.push(`${conf.id}: conformance level ${conf.level} exceeds the lowest included claim level`);
}

const unresolved = (bundle.incidents || []).filter(i => !['resolved', 'not-substantiated'].includes(i.status));
const report = {
  ok: errors.length === 0,
  bundleVersion: bundle.bundleVersion,
  counts: {
    organizations: bundle.organizations?.length || 0,
    subjects: bundle.subjects?.length || 0,
    claims: bundle.claims?.length || 0,
    evidence: bundle.evidence?.length || 0,
    verifications: bundle.verifications?.length || 0,
    incidents: bundle.incidents?.length || 0,
    unresolvedIncidents: unresolved.length,
    digestChecks: digestChecks.length
  },
  digestChecks,
  errors,
  warnings,
  notice: 'Cryptographic integrity can show that referenced bytes match a recorded digest. It does not establish factual truth, legal compliance, or food safety.'
};
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
