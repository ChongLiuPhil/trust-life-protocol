const LEVEL = { T0: 0, T1: 1, T2: 2, T3: 3 };

const byId = xs => new Map((xs || []).map(x => [x.id, x]));
const nonEmpty = value => Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== '';

function readPath(object, dotted) {
  return dotted.split('.').reduce((value, key) => value == null ? undefined : value[key], object);
}

function finding(requirement, status, message, basis = {}) {
  return {
    requirementId: requirement.id,
    class: requirement.class,
    status,
    message,
    basis: {
      claimIds: basis.claimIds || [],
      evidenceIds: basis.evidenceIds || [],
      verificationIds: basis.verificationIds || [],
      incidentIds: basis.incidentIds || [],
      fields: basis.fields || [],
      missing: basis.missing || []
    }
  };
}

function applicationFieldFinding(requirement, application, bundle) {
  const missing = (requirement.requiredFields || []).filter(path => !nonEmpty(readPath(application, path)));
  const subjects = byId(bundle.subjects);
  const organizations = byId(bundle.organizations);

  if (!organizations.has(application.applicantOrganizationId)) missing.push('applicantOrganizationId:unknown-organization');

  for (const id of application.scope?.facilitySubjectIds || []) {
    const subject = subjects.get(id);
    if (!subject) missing.push(`facilitySubjectId:${id}:unknown`);
    else {
      if (subject.kind !== 'facility') missing.push(`facilitySubjectId:${id}:not-facility`);
      if (subject.organizationId !== application.applicantOrganizationId) missing.push(`facilitySubjectId:${id}:wrong-owner`);
    }
  }

  for (const id of application.scope?.coveredSubjectIds || []) {
    if (!subjects.has(id)) missing.push(`coveredSubjectId:${id}:unknown`);
  }

  return missing.length
    ? finding(requirement, 'gap', 'Required scope or identity fields are missing or inconsistent.', { fields: requirement.requiredFields, missing })
    : finding(requirement, 'pass', 'Applicant, facility scope, and covered subjects are explicitly registered.', { fields: requirement.requiredFields });
}

function declarationFinding(requirement, application) {
  const fields = requirement.requiredDeclarationFields || [];
  const missing = fields.filter(field => application.declarations?.[field] !== true);
  return missing.length
    ? finding(requirement, requirement.class === 'advisory' ? 'gap' : 'gap', 'One or more required declarations are not true.', { fields, missing })
    : finding(requirement, 'pass', 'Required declarations are present.', { fields });
}

function claimFinding(requirement, application, bundle) {
  const claims = bundle.claims || [];
  const evidence = byId(bundle.evidence);
  const verifications = byId(bundle.verifications);
  const subjects = byId(bundle.subjects);
  const covered = new Set(application.scope?.coveredSubjectIds || []);
  const response = (application.requirementResponses || []).find(x => x.requirementId === requirement.id);

  if (!response || response.response === 'pending') {
    return finding(requirement, 'gap', 'The application has no completed requirement mapping.', { missing: ['requirementResponse'] });
  }
  if (response.response === 'not-applicable') {
    return finding(requirement, 'gap', 'This pilot profile does not permit this blocking claim requirement to be bypassed as not applicable.', { missing: ['permitted-not-applicable-rule'] });
  }

  let candidates = claims.filter(claim => covered.has(claim.subjectId) && (requirement.claimRequirementIds || []).includes(claim.requirementId));
  if ((response.claimIds || []).length) candidates = candidates.filter(claim => response.claimIds.includes(claim.id));
  if (!candidates.length) {
    return finding(requirement, 'gap', 'No in-scope claim matches the required source requirement and applicant mapping.', { claimIds: response.claimIds || [], missing: ['qualifying-claim'] });
  }

  const failures = [];
  for (const claim of candidates) {
    const claimEvidence = (claim.evidenceIds || []).map(id => evidence.get(id)).filter(Boolean);
    const claimVerifications = (claim.verificationIds || []).map(id => verifications.get(id)).filter(Boolean);
    const min = LEVEL[requirement.minimumLevel || 'T0'];
    if ((LEVEL[claim.level] ?? -1) < min) {
      failures.push(`${claim.id}:level-below-${requirement.minimumLevel}`);
      continue;
    }
    if ((requirement.evidenceAnyOf || []).length && !claimEvidence.some(ev => requirement.evidenceAnyOf.includes(ev.category))) {
      failures.push(`${claim.id}:evidence-category-missing`);
      continue;
    }
    if (requirement.requiresIndependentVerification) {
      const subject = subjects.get(claim.subjectId);
      const independent = claimVerifications.some(v => v.status === 'verified' && subject && v.verifierOrganizationId !== subject.organizationId);
      if (!independent) {
        failures.push(`${claim.id}:independent-verification-missing`);
        continue;
      }
    }
    return finding(requirement, 'pass', `Qualifying ${claim.level} claim satisfies the pilot requirement.`, {
      claimIds: [claim.id],
      evidenceIds: claimEvidence.map(x => x.id),
      verificationIds: claimVerifications.map(x => x.id)
    });
  }

  return finding(requirement, 'gap', 'Mapped claims exist but do not satisfy all level, evidence, or independence rules.', {
    claimIds: candidates.map(x => x.id),
    missing: failures
  });
}

function incidentFinding(requirement, application, bundle) {
  const covered = new Set(application.scope?.coveredSubjectIds || []);
  const nonBlocking = new Set(requirement.nonBlockingStates || []);
  const blockingSeverities = new Set(requirement.blockingSeverities || []);
  const incidents = (bundle.incidents || []).filter(i => covered.has(i.subjectId) && blockingSeverities.has(i.severity) && !nonBlocking.has(i.status));
  return incidents.length
    ? finding(requirement, 'blocked', 'Covered scope has one or more unresolved incidents that trigger the profile blocking policy.', { incidentIds: incidents.map(x => x.id) })
    : finding(requirement, 'pass', 'No incident in the covered scope triggers this blocking policy.');
}

function manualFinding(requirement) {
  return finding(requirement, 'manual-review', 'This requirement is explicitly reserved for qualified manual review.');
}

export function evaluateConformance({ application, profile, bundle, evaluatedAt = new Date().toISOString(), evaluatorVersion = '0.4.0' }) {
  const responses = new Map((application.requirementResponses || []).map(x => [x.requirementId, x]));
  const profileIds = new Set((profile.requirements || []).map(x => x.id));
  const findings = [];

  for (const requirement of profile.requirements || []) {
    if (!responses.has(requirement.id) && requirement.method !== 'incident-policy') {
      findings.push(finding(requirement, 'gap', 'Applicant did not provide a requirement response.', { missing: ['requirementResponse'] }));
      continue;
    }
    if (requirement.method === 'application-fields') findings.push(applicationFieldFinding(requirement, application, bundle));
    else if (requirement.method === 'declarations') findings.push(declarationFinding(requirement, application));
    else if (requirement.method === 'claim') findings.push(claimFinding(requirement, application, bundle));
    else if (requirement.method === 'incident-policy') findings.push(incidentFinding(requirement, application, bundle));
    else findings.push(manualFinding(requirement));
  }

  for (const response of application.requirementResponses || []) {
    if (!profileIds.has(response.requirementId)) {
      findings.push({
        requirementId: response.requirementId,
        class: 'advisory',
        status: 'gap',
        message: 'Application contains a response for an unknown profile requirement.',
        basis: { claimIds: [], evidenceIds: [], verificationIds: [], incidentIds: [], fields: [], missing: ['unknown-requirement-id'] }
      });
    }
  }

  const blockingGaps = findings.filter(f => f.class === 'blocking' && !['pass', 'not-applicable'].includes(f.status)).map(f => f.requirementId);
  const advisories = findings.filter(f => f.class !== 'blocking' && f.status !== 'pass').map(f => f.requirementId);
  const decision = blockingGaps.length ? 'not-ready' : advisories.length ? 'ready-with-advisories' : 'ready';

  const claimLevels = findings.filter(f => f.status === 'pass').flatMap(f => f.basis.claimIds || []).map(id => (bundle.claims || []).find(c => c.id === id)?.level).filter(Boolean);
  const overallEvidenceLevel = claimLevels.length ? Object.entries(LEVEL).find(([, n]) => n === Math.min(...claimLevels.map(x => LEVEL[x])))?.[0] || null : null;
  const suffix = application.id.replace(/^tl:onboarding:/, '').replace(/[^A-Za-z0-9._:-]/g, '-');

  return {
    assessmentVersion: '0.4',
    id: `tl:assessment:${suffix}:${profile.version}`,
    applicationId: application.id,
    profileId: profile.id,
    profileVersion: profile.version,
    evaluator: { name: 'Trust & Life Reference Conformance Evaluator', version: evaluatorVersion },
    evaluatedAt,
    decision,
    findings,
    blockingGaps,
    advisories,
    overallEvidenceLevel,
    notice: 'This assessment evaluates Trust & Life pilot transparency requirements. It is not a legal certification, professional audit opinion, purchasing recommendation, or guarantee of product safety.',
    limitations: profile.limitations || []
  };
}
