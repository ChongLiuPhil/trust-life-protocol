#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { evaluateConformance } from './conformance.js';

const args = process.argv.slice(2);
const positional = args.filter(x => !x.startsWith('--'));
const expected = args.find(x => x.startsWith('--expect-allowed='))?.split('=')[1];
if (positional.length < 4) {
  console.error('Usage: node public-export.js <application.json> <profile.json> <bundle.json> <pilot-state.json> [--expect-allowed=true|false]');
  process.exit(2);
}
const readJson = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const [applicationFile, profileFile, bundleFile, pilotFile] = positional;
const application = readJson(applicationFile);
const profile = readJson(profileFile);
const bundle = readJson(bundleFile);
const pilot = readJson(pilotFile);
const assessment = evaluateConformance({application, profile, bundle, evaluatedAt: pilot.updatedAt, evaluatorVersion:'0.5.0'});
const ready = new Set(['ready','ready-with-advisories']);
const reasons = [];
if (pilot.applicationId !== application.id) reasons.push('pilot/application mismatch');
if (pilot.profileId !== profile.id) reasons.push('pilot/profile mismatch');
if (pilot.state !== 'live') reasons.push(`pilot lifecycle is ${pilot.state}, not live`);
if (pilot.publicProjectionAllowed !== true) reasons.push('publicProjectionAllowed is not true');
if (!ready.has(assessment.decision)) reasons.push(`current assessment decision is ${assessment.decision}`);
if (pilot.currentAssessmentDecision !== assessment.decision) reasons.push(`pilot state records ${pilot.currentAssessmentDecision} but current evaluator returns ${assessment.decision}`);
const allowed = reasons.length === 0;

const orgs = new Map((bundle.organizations || []).map(x => [x.id, x]));
const subjects = new Map((bundle.subjects || []).map(x => [x.id, x]));
const evidence = new Map((bundle.evidence || []).map(x => [x.id, x]));
const claims = new Map((bundle.claims || []).map(x => [x.id, x]));
const publicEvidence = id => {
  const ev = evidence.get(id);
  if (!ev) return null;
  return {
    id: ev.id,
    subjectId: ev.subjectId,
    category: ev.category,
    sourceOrganizationId: ev.sourceOrganizationId,
    capturedAt: ev.capturedAt,
    mediaType: ev.mediaType,
    integrity: ev.integrity,
    privacy: ev.privacy,
    publicContentAvailable: ev.privacy === 'public'
  };
};

const projection = allowed ? {
  protocol: 'Trust & Life Protocol',
  projectionVersion: '0.5',
  pilot: {pilotId: pilot.pilotId, state: pilot.state, updatedAt: pilot.updatedAt},
  application: {
    id: application.id,
    applicantOrganization: orgs.get(application.applicantOrganizationId) || {id: application.applicantOrganizationId},
    scope: application.scope,
    publicContact: application.publicContact || null
  },
  profile: {id: profile.id, version: profile.version, title: profile.title, status: profile.status},
  assessment: {
    id: assessment.id,
    decision: assessment.decision,
    evaluatedAt: assessment.evaluatedAt,
    overallEvidenceLevel: assessment.overallEvidenceLevel,
    findings: assessment.findings,
    blockingGaps: assessment.blockingGaps,
    advisories: assessment.advisories,
    notice: assessment.notice,
    limitations: assessment.limitations
  },
  subjects: (application.scope?.coveredSubjectIds || []).map(id => subjects.get(id)).filter(Boolean),
  evidenceMetadata: [...new Set(assessment.findings.flatMap(f => f.basis?.evidenceIds || []))].map(publicEvidence).filter(Boolean),
  publicationBoundary: 'This export contains public-projection metadata only. Restricted/private source data are not copied by this reference exporter.'
} : null;

console.log(JSON.stringify({allowed, reasons, assessmentDecision: assessment.decision, pilotState: pilot.state, projection}, null, 2));
if (expected !== undefined && allowed !== (expected === 'true')) {
  console.error(`Expected allowed=${expected}, received ${allowed}`);
  process.exit(1);
}
process.exit(0);
