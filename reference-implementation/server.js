#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unsignedObject, verifyCompactJws } from './crypto.js';
import { evaluateConformance } from './conformance.js';
import { buildPublicProjection } from './publication.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const demoRoot = path.join(repoRoot, 'examples', 'apple-supply-chain');
const webRoot = path.join(here, 'web');
const bundlePath = path.join(demoRoot, 'trust-bundle.json');
const applicationPath = path.join(demoRoot, 'onboarding', 'application.json');
const gapApplicationPath = path.join(demoRoot, 'onboarding', 'application-gap.json');
const profilePath = path.join(repoRoot, 'profiles', 'food-produce', 'TL-FRESH-PRODUCE-001.profile.json');
const pilotStatePath = process.env.TL_PILOT_STATE_PATH
  ? path.resolve(here, process.env.TL_PILOT_STATE_PATH)
  : path.join(repoRoot, 'field-pilot', 'demo-state.json');
const descriptorPath = path.join(repoRoot, 'registry', 'descriptor.json');
const peerDescriptorPath = path.join(repoRoot, 'registry', 'peers', 'secondary.json');
const statusPath = path.join(repoRoot, 'registry', 'demo', 'credential-status.json');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8080);

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const readBundle = () => readJson(bundlePath);
const readProfile = () => readJson(profilePath);
const readApplication = () => readJson(applicationPath);
const readPilotState = () => readJson(pilotStatePath);
const byId = xs => new Map((xs || []).map(x => [x.id, x]));

function json(res, status, value) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'cache-control': 'no-store'
  });
  res.end(JSON.stringify(value, null, 2));
}

function safeFile(base, relative) {
  const full = path.resolve(base, relative);
  const prefix = base + path.sep;
  return full === base || full.startsWith(prefix) ? full : null;
}

function serveFile(res, file, type) {
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) return json(res, 404, { error: 'not_found' });
  res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}

function verifySigned(obj, keys) {
  const keyId = obj.keyId || obj.keyIds?.[0];
  const key = keys.get(keyId);
  const result = verifyCompactJws(obj.jws, key, unsignedObject(obj));
  return { id: obj.id, keyId, valid: result.ok, reason: result.reason };
}

function cryptographicView(bundle, subjectId, claimIds) {
  const keys = byId(bundle.keys);
  const verifications = byId(bundle.verifications);
  const manifests = (bundle.manifests || []).filter(m => m.subjectId === subjectId).map(m => ({ type: 'evidence-manifest', ...verifySigned(m, keys) }));
  const credentials = [];

  for (const claimId of claimIds) {
    const claim = (bundle.claims || []).find(c => c.id === claimId);
    for (const verificationId of claim?.verificationIds || []) {
      const v = verifications.get(verificationId);
      if (!v?.credentialJwsUri) continue;
      const vcFile = safeFile(demoRoot, v.credentialUri);
      const jwsFile = safeFile(demoRoot, v.credentialJwsUri);
      const key = keys.get(v.keyId);
      if (!vcFile || !jwsFile || !fs.existsSync(vcFile) || !fs.existsSync(jwsFile)) {
        credentials.push({ verificationId, signatureValid: false, reason: 'fixture_missing' });
        continue;
      }
      const vc = readJson(vcFile);
      const sig = verifyCompactJws(fs.readFileSync(jwsFile, 'utf8').trim(), key, vc);
      const status = readJson(statusPath);
      const statusSig = verifySigned(status, keys);
      credentials.push({
        verificationId,
        credentialId: vc.id,
        keyId: v.keyId,
        signatureValid: sig.ok,
        signatureReason: sig.reason,
        status: status.status,
        statusSignatureValid: statusSig.valid,
        statusReason: statusSig.reason
      });
    }
  }

  const descriptor = readJson(descriptorPath);
  return {
    manifests,
    credentials,
    registryDescriptor: verifySigned(descriptor, keys),
    notice: 'Signature validity proves control of a declared key, not factual truth or safety.'
  };
}

function publicApplicationView(application) {
  return {
    id: application.id,
    applicationVersion: application.applicationVersion,
    applicantOrganizationId: application.applicantOrganizationId,
    profileId: application.profileId,
    profileVersion: application.profileVersion,
    submittedAt: application.submittedAt,
    publicDisplayName: application.publicDisplayName,
    scope: application.scope,
    declarations: application.declarations,
    requirementResponses: (application.requirementResponses || []).map(x => ({ requirementId: x.requirementId, response: x.response, claimIds: x.claimIds || [], evidenceIds: x.evidenceIds || [] })),
    publicChannels: application.publicChannels || {},
    publicationConsent: application.publicationConsent,
    restrictedDocumentCount: (application.restrictedDocumentRefs || []).length,
    notice: 'Restricted verifier documents and sensitive material are intentionally excluded from this public view.'
  };
}

function publicPilotView(pilot) {
  return {
    pilotId: pilot.pilotId,
    profileId: pilot.profileId,
    applicationId: pilot.applicationId,
    state: pilot.state,
    updatedAt: pilot.updatedAt,
    publicProjectionAllowed: pilot.publicProjectionAllowed,
    currentAssessmentDecision: pilot.currentAssessmentDecision,
    reason: pilot.reason,
    notice: 'Lifecycle state controls whether a current public conformance projection may be published. Historical verification/resolver pages may remain available to explain suspension or withdrawal.'
  };
}

function assessmentFor(application, bundle, evaluatedAt = application.submittedAt) {
  return evaluateConformance({
    application,
    profile: readProfile(),
    bundle,
    evaluatedAt,
    evaluatorVersion: '0.5.0'
  });
}

function pilotApplicationForSubject(subjectId) {
  const application = readApplication();
  return (application.scope?.coveredSubjectIds || []).includes(subjectId) ? application : null;
}

function currentPublication(bundle) {
  return buildPublicProjection({
    application: readApplication(),
    profile: readProfile(),
    bundle,
    pilot: readPilotState(),
    evaluatorVersion: '0.5.0'
  });
}

function verificationView(bundle, subjectId) {
  const orgs = byId(bundle.organizations);
  const evidence = byId(bundle.evidence);
  const verifications = byId(bundle.verifications);
  const subject = (bundle.subjects || []).find(x => x.id === subjectId);
  if (!subject) return null;

  const conformance = (bundle.conformance || []).find(x => x.subjectId === subjectId) || null;
  const claimIds = conformance?.claimIds || (bundle.claims || []).filter(c => c.subjectId === subjectId).map(c => c.id);
  const claims = claimIds.map(id => (bundle.claims || []).find(c => c.id === id)).filter(Boolean).map(c => ({
    ...c,
    evidence: (c.evidenceIds || []).map(id => evidence.get(id)).filter(Boolean).map(e => ({ ...e, publicUri: `/demo/${e.uri}` })),
    verifications: (c.verificationIds || []).map(id => verifications.get(id)).filter(Boolean).map(v => ({
      ...v,
      verifierName: orgs.get(v.verifierOrganizationId)?.name,
      credentialPublicUri: v.credentialUri ? `/demo/${v.credentialUri}` : undefined,
      credentialJwsPublicUri: v.credentialJwsUri ? `/demo/${v.credentialJwsUri}` : undefined
    }))
  }));
  const incidents = (bundle.incidents || []).filter(i => i.subjectId === subjectId);
  const application = pilotApplicationForSubject(subjectId);
  const publication = application ? currentPublication(bundle) : null;
  const pilot = application ? readPilotState() : null;

  return {
    protocol: 'Trust & Life Protocol',
    referenceImplementation: '0.5.0',
    bundleVersion: bundle.bundleVersion,
    subject,
    owner: orgs.get(subject.organizationId) || null,
    conformance,
    claims,
    incidents,
    unresolvedIncidents: incidents.filter(i => !['resolved', 'not-substantiated'].includes(i.status)).length,
    cryptographic: cryptographicView(bundle, subjectId, claimIds),
    pilotAssessment: publication?.assessment || null,
    pilotLifecycle: pilot ? publicPilotView(pilot) : null,
    publicationAllowed: publication?.allowed ?? null,
    publicationReasons: publication?.reasons || [],
    onboardingApplicationId: application?.id || null,
    verificationPath: `/verify?subject=${encodeURIComponent(subject.id)}`,
    qrResolverPath: `/r/${encodeURIComponent(subject.id)}`,
    publicProjectionPath: application ? `/v1/public-projection/${encodeURIComponent(subject.id)}` : null,
    notice: 'This view reports evidence, cryptographic integrity, signatures, status, lifecycle, and pilot conformance findings. It is not a food-safety guarantee or purchasing recommendation.'
  };
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
    if (req.method !== 'GET') return json(res, 405, { error: 'method_not_allowed' });
    if (url.pathname === '/health') return json(res, 200, { ok: true, protocol: 'trust-life', referenceImplementation: '0.5.0' });

    const bundle = readBundle();
    const keys = byId(bundle.keys);
    const profile = readProfile();
    const application = readApplication();
    const pilot = readPilotState();

    if (url.pathname === '/.well-known/trust-life-registry') return json(res, 200, readJson(descriptorPath));
    if (url.pathname === '/v1/federation') {
      const primary = readJson(descriptorPath);
      const peer = readJson(peerDescriptorPath);
      return json(res, 200, {
        registry: { ...primary, signatureValid: verifySigned(primary, keys).valid },
        peers: [{ ...peer, signatureValid: verifySigned(peer, keys).valid }],
        rule: 'Peer records retain their source identity; conflicts must be surfaced rather than silently resolved.'
      });
    }

    if (url.pathname === '/v1/profiles') return json(res, 200, { items: [{ id: profile.id, version: profile.version, status: profile.status, title: profile.title }] });
    if (url.pathname === `/v1/profiles/${encodeURIComponent(profile.id)}` || url.pathname === `/v1/profiles/${profile.id}`) return json(res, 200, profile);

    if (url.pathname === '/v1/onboarding') return json(res, 200, { items: [publicApplicationView(application)] });
    if (url.pathname === `/v1/onboarding/${encodeURIComponent(application.id)}` || url.pathname === `/v1/onboarding/${application.id}`) return json(res, 200, publicApplicationView(application));
    if (url.pathname === `/v1/onboarding/${encodeURIComponent(application.id)}/assessment` || url.pathname === `/v1/onboarding/${application.id}/assessment`) return json(res, 200, assessmentFor(application, bundle, pilot.updatedAt));

    if (url.pathname === '/v1/pilots') return json(res, 200, { items: [publicPilotView(pilot)] });
    if (url.pathname === `/v1/pilots/${encodeURIComponent(pilot.pilotId)}` || url.pathname === `/v1/pilots/${pilot.pilotId}`) return json(res, 200, publicPilotView(pilot));

    if (url.pathname.startsWith('/v1/public-projection/')) {
      const id = decodeURIComponent(url.pathname.slice('/v1/public-projection/'.length));
      const subject = (bundle.subjects || []).find(x => x.id === id);
      const scoped = (application.scope?.coveredSubjectIds || []).includes(id);
      if (!subject || !scoped) return json(res, 404, { error: 'public_projection_not_found' });
      const result = currentPublication(bundle);
      if (!result.allowed) return json(res, 409, {
        error: 'public_projection_not_allowed',
        subjectId: id,
        pilotState: result.pilotState,
        assessmentDecision: result.assessment.decision,
        reasons: result.reasons,
        notice: result.notice
      });
      return json(res, 200, { requestedSubjectId: id, ...result.projection });
    }

    if (url.pathname === '/v1/keys') return json(res, 200, { items: bundle.keys });
    if (url.pathname.startsWith('/v1/keys/')) {
      const id = decodeURIComponent(url.pathname.slice('/v1/keys/'.length));
      const key = keys.get(id);
      return key ? json(res, 200, key) : json(res, 404, { error: 'key_not_found' });
    }

    if (url.pathname.startsWith('/v1/credentials/') && url.pathname.endsWith('/status')) {
      const encoded = url.pathname.slice('/v1/credentials/'.length, -'/status'.length);
      const id = decodeURIComponent(encoded);
      const status = readJson(statusPath);
      return id === status.credentialId ? json(res, 200, status) : json(res, 404, { error: 'credential_status_not_found' });
    }

    if (url.pathname === '/v1/subjects') return json(res, 200, { items: bundle.subjects.map(s => ({ ...s, verificationPath: `/verify?subject=${encodeURIComponent(s.id)}`, qrResolverPath: `/r/${encodeURIComponent(s.id)}` })) });

    if (url.pathname.startsWith('/v1/subjects/') && url.pathname.endsWith('/assessment')) {
      const encoded = url.pathname.slice('/v1/subjects/'.length, -'/assessment'.length);
      const id = decodeURIComponent(encoded);
      const pilotApplication = pilotApplicationForSubject(id);
      return pilotApplication ? json(res, 200, assessmentFor(pilotApplication, bundle, pilot.updatedAt)) : json(res, 404, { error: 'assessment_not_found' });
    }

    if (url.pathname.startsWith('/v1/subjects/')) {
      const id = decodeURIComponent(url.pathname.slice('/v1/subjects/'.length));
      const view = verificationView(bundle, id);
      return view ? json(res, 200, view) : json(res, 404, { error: 'subject_not_found' });
    }

    if (url.pathname.startsWith('/v1/qr/')) {
      const id = decodeURIComponent(url.pathname.slice('/v1/qr/'.length));
      const subject = (bundle.subjects || []).find(x => x.id === id);
      return subject ? json(res, 200, {
        subjectId: id,
        resolverPath: `/r/${encodeURIComponent(id)}`,
        verificationPath: `/verify?subject=${encodeURIComponent(id)}`,
        publicProjectionPath: `/v1/public-projection/${encodeURIComponent(id)}`,
        gs1DigitalLinkNote: 'If an operator has properly assigned GS1 identifiers, a GS1-conformant resolver can link those identifiers to this verification service. The synthetic Trust & Life subject ID is not itself a GS1 Digital Link identifier.'
      }) : json(res, 404, { error: 'subject_not_found' });
    }

    if (url.pathname.startsWith('/r/')) {
      const id = decodeURIComponent(url.pathname.slice('/r/'.length));
      const subject = (bundle.subjects || []).find(x => x.id === id);
      if (!subject) return json(res, 404, { error: 'subject_not_found' });
      res.writeHead(302, { location: `/verify?subject=${encodeURIComponent(id)}`, 'cache-control': 'no-store' });
      return res.end();
    }

    if (url.pathname === '/demo/trust-bundle.json') return serveFile(res, bundlePath, 'application/json; charset=utf-8');
    if (url.pathname === '/demo/onboarding/application-gap.json') return serveFile(res, gapApplicationPath, 'application/json; charset=utf-8');
    if (url.pathname.startsWith('/demo/')) {
      const file = safeFile(demoRoot, decodeURIComponent(url.pathname.slice('/demo/'.length)));
      const ext = path.extname(file || '').toLowerCase();
      const type = ext === '.json' || ext === '.jsonld' ? 'application/json; charset=utf-8' : ext === '.jws' ? 'application/jose' : 'application/octet-stream';
      return serveFile(res, file, type);
    }

    if (url.pathname === '/' || url.pathname === '/verify' || url.pathname === '/index.html') return serveFile(res, path.join(webRoot, 'index.html'), 'text/html; charset=utf-8');
    if (url.pathname === '/app.js') return serveFile(res, path.join(webRoot, 'app.js'), 'text/javascript; charset=utf-8');
    return json(res, 404, { error: 'not_found' });
  } catch (error) {
    if (error instanceof URIError) return json(res, 400, { error: 'invalid_path_encoding' });
    json(res, 500, { error: 'internal_error', message: error.message });
  }
});

server.listen(port, host, () => console.log(`Trust & Life v0.5 registry: http://${host}:${port}/verify?subject=tl%3Asubject%3Aapple-2026-0001`));
