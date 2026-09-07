import { evaluateConformance } from './conformance.js';

const ready = new Set(['ready', 'ready-with-advisories']);
const byId = xs => new Map((xs || []).map(x => [x.id, x]));

export function buildPublicProjection({ application, profile, bundle, pilot, evaluatorVersion = '0.5.0' }) {
  const assessment = evaluateConformance({
    application,
    profile,
    bundle,
    evaluatedAt: pilot.updatedAt,
    evaluatorVersion
  });

  const reasons = [];
  if (pilot.applicationId !== application.id) reasons.push('pilot/application mismatch');
  if (pilot.profileId !== profile.id) reasons.push('pilot/profile mismatch');
  if (pilot.state !== 'live') reasons.push(`pilot lifecycle is ${pilot.state}, not live`);
  if (pilot.publicProjectionAllowed !== true) reasons.push('publicProjectionAllowed is not true');
  if (!ready.has(assessment.decision)) reasons.push(`current assessment decision is ${assessment.decision}`);
  if (pilot.currentAssessmentDecision !== assessment.decision) reasons.push(`pilot state records ${pilot.currentAssessmentDecision} but current evaluator returns ${assessment.decision}`);
  const allowed = reasons.length === 0;

  const orgs = byId(bundle.organizations);
  const subjects = byId(bundle.subjects);
  const evidence = byId(bundle.evidence);
  const evidenceIds = [...new Set(assessment.findings.flatMap(f => f.basis?.evidenceIds || []))];

  const evidenceMetadata = evidenceIds.map(id => evidence.get(id)).filter(Boolean).map(ev => ({
    id: ev.id,
    subjectId: ev.subjectId,
    category: ev.category,
    sourceOrganizationId: ev.sourceOrganizationId,
    capturedAt: ev.capturedAt,
    mediaType: ev.mediaType,
    integrity: ev.integrity,
    privacy: ev.privacy,
    publicContentAvailable: ev.privacy === 'public'
  }));

  const projection = allowed ? {
    protocol: 'Trust & Life Protocol',
    projectionVersion: '0.5',
    pilot: {
      pilotId: pilot.pilotId,
      state: pilot.state,
      updatedAt: pilot.updatedAt,
      reason: pilot.reason
    },
    application: {
      id: application.id,
      applicantOrganization: orgs.get(application.applicantOrganizationId) || { id: application.applicantOrganizationId },
      publicDisplayName: application.publicDisplayName,
      scope: application.scope,
      publicChannels: application.publicChannels || {}
    },
    profile: {
      id: profile.id,
      version: profile.version,
      title: profile.title,
      status: profile.status
    },
    assessment: {
      id: assessment.id,
      decision: assessment.decision,
      evaluatedAt: assessment.evaluatedAt,
      evaluator: assessment.evaluator,
      overallEvidenceLevel: assessment.overallEvidenceLevel,
      findings: assessment.findings,
      blockingGaps: assessment.blockingGaps,
      advisories: assessment.advisories,
      notice: assessment.notice,
      limitations: assessment.limitations
    },
    subjects: (application.scope?.coveredSubjectIds || []).map(id => subjects.get(id)).filter(Boolean),
    evidenceMetadata,
    publicationBoundary: 'This projection contains scoped public metadata only. Restricted/private source data are not copied by the reference publication layer.'
  } : null;

  return {
    allowed,
    reasons,
    assessment,
    pilotState: pilot.state,
    projection,
    notice: 'Publication permission is an operational guard over a Trust & Life assessment. It is not regulatory approval or proof of product safety.'
  };
}
