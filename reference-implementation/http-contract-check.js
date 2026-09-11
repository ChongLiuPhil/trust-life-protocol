#!/usr/bin/env node
import http from 'node:http';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const host = '127.0.0.1';
const port = Number(process.env.TL_TEST_PORT || 18080);
const baseUrl = `http://${host}:${port}`;

function request(path, { method = 'GET' } = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${baseUrl}${path}`, { method }, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        let parsed = null;
        try { parsed = body ? JSON.parse(body) : null; } catch {}
        resolve({ status: res.statusCode, headers: res.headers, body, json: parsed });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertJsonResponse(response, label, status = 200) {
  assert(response.status === status, `${label}: expected ${status}, got ${response.status}`);
  assert(response.headers['content-type']?.startsWith('application/json'), `${label}: expected JSON content type`);
  assert(response.headers['cache-control'] === 'no-store', `${label}: must disable caching`);
  assert(response.headers['access-control-allow-origin'] === '*', `${label}: public read API must preserve CORS contract`);
  assert(response.json !== null, `${label}: response must be valid JSON`);
}

async function waitForServer(child) {
  for (let i = 0; i < 40; i += 1) {
    if (child.exitCode !== null) throw new Error(`server exited early with code ${child.exitCode}`);
    try {
      const res = await request('/health');
      if (res.status === 200) return;
    } catch {}
    await delay(100);
  }
  throw new Error('server did not become ready');
}

async function get(path, label = path, status = 200) {
  const response = await request(path);
  assertJsonResponse(response, label, status);
  return response;
}

async function main() {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: new URL('.', import.meta.url),
    env: { ...process.env, HOST: host, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let stderr = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', chunk => { stderr += chunk; });

  try {
    await waitForServer(child);

    const subjectRaw = 'tl:subject:apple-2026-0001';
    const subjectId = encodeURIComponent(subjectRaw);
    const profileRaw = 'TL-FRESH-PRODUCE-001';
    const profileId = encodeURIComponent(profileRaw);
    const applicationRaw = 'tl:onboarding:green-orchard-2026-pilot';
    const applicationId = encodeURIComponent(applicationRaw);
    const pilotRaw = 'tl:pilot:apple-demo-2026-01';
    const pilotId = encodeURIComponent(pilotRaw);
    const credentialRaw = 'urn:uuid:9bca26a6-d31c-45e0-91fd-c2bf7f0b8a01';
    const credentialId = encodeURIComponent(credentialRaw);

    const health = await get('/health', 'health');
    assert(health.json?.ok === true, 'health contract failed');
    assert(health.json?.referenceImplementation === '0.5.0', 'health version changed unexpectedly');

    const descriptor = await get('/.well-known/trust-life-registry', 'registry descriptor');
    assert(descriptor.json?.id, 'registry descriptor must expose an id');

    const federation = await get('/v1/federation', 'federation');
    assert(federation.json?.registry?.signatureValid === true, 'primary registry descriptor signature must verify');
    assert(Array.isArray(federation.json?.peers), 'federation peers must be an array');

    const profiles = await get('/v1/profiles', 'profiles');
    assert(profiles.json?.items?.some(item => item.id === profileRaw), 'profile list must include pilot profile');
    await get(`/v1/profiles/${profileId}`, 'profile detail');

    const onboarding = await get('/v1/onboarding', 'onboarding list');
    assert(onboarding.json?.items?.some(item => item.id === applicationRaw), 'onboarding list must include demo application');
    const application = await get(`/v1/onboarding/${applicationId}`, 'onboarding detail');
    assert(application.json?.restrictedDocumentCount >= 0, 'public onboarding view must expose only restricted document count');
    assert(application.json?.restrictedDocumentRefs === undefined, 'public onboarding view must not expose restricted document refs');
    const onboardingAssessment = await get(`/v1/onboarding/${applicationId}/assessment`, 'onboarding assessment');
    assert(['ready', 'ready-with-advisories'].includes(onboardingAssessment.json?.decision), 'demo onboarding assessment must remain publishable');

    const pilots = await get('/v1/pilots', 'pilot list');
    assert(pilots.json?.items?.some(item => item.pilotId === pilotRaw), 'pilot list must include demo pilot');
    const pilot = await get(`/v1/pilots/${pilotId}`, 'pilot detail');
    assert(pilot.json?.state === 'live', 'demo pilot must remain live');
    assert(pilot.json?.publicProjectionAllowed === true, 'demo pilot must allow current public projection');

    const keys = await get('/v1/keys', 'keys');
    assert(Array.isArray(keys.json?.items) && keys.json.items.length > 0, 'public key list must not be empty');
    const firstKeyId = keys.json.items[0].id;
    const key = await get(`/v1/keys/${encodeURIComponent(firstKeyId)}`, 'key detail');
    assert(key.json?.id === firstKeyId, 'key detail id mismatch');

    const credentialStatus = await get(`/v1/credentials/${credentialId}/status`, 'credential status');
    assert(credentialStatus.json?.credentialId === credentialRaw, 'credential status id mismatch');

    const subjects = await get('/v1/subjects', 'subjects');
    assert(subjects.json?.items?.some(item => item.id === subjectRaw), 'subject list must include demo subject');
    const subject = await get(`/v1/subjects/${subjectId}`, 'subject detail');
    assert(subject.json?.subject?.id === subjectRaw, 'subject detail id mismatch');
    assert(subject.json?.publicationAllowed === true, 'live subject must expose publicationAllowed=true');
    assert(subject.json?.notice?.includes('not a food-safety guarantee'), 'verification safety boundary must remain visible');

    const subjectAssessment = await get(`/v1/subjects/${subjectId}/assessment`, 'subject assessment');
    assert(['ready', 'ready-with-advisories'].includes(subjectAssessment.json?.decision), 'subject assessment must remain publishable');

    const projection = await get(`/v1/public-projection/${subjectId}`, 'public projection');
    assert(projection.json?.requestedSubjectId === subjectRaw, 'projection subject mismatch');

    const qr = await get(`/v1/qr/${subjectId}`, 'QR target');
    assert(qr.json?.subjectId === subjectRaw, 'QR target subject mismatch');
    assert(qr.json?.gs1DigitalLinkNote?.includes('not itself a GS1'), 'QR response must preserve GS1 boundary');

    const resolver = await request(`/r/${subjectId}`);
    assert(resolver.status === 302, 'resolver must redirect');
    assert(resolver.headers.location === `/verify?subject=${subjectId}`, 'resolver redirect target changed');
    assert(resolver.headers['cache-control'] === 'no-store', 'resolver redirect must disable caching');

    const demoBundle = await request('/demo/trust-bundle.json');
    assert(demoBundle.status === 200, 'demo trust bundle must remain available');
    assert(demoBundle.headers['content-type']?.startsWith('application/json'), 'demo bundle must be served as JSON');
    assert(demoBundle.headers['cache-control'] === 'no-store', 'demo bundle must disable caching');

    const page = await request(`/verify?subject=${subjectId}`);
    assert(page.status === 200, 'verification UI must remain available');
    assert(page.headers['content-type']?.startsWith('text/html'), 'verification UI must be HTML');
    assert(page.headers['cache-control'] === 'no-store', 'verification UI must disable caching');

    const missingCases = [
      ['/v1/profiles/TL-MISSING', 'not_found'],
      ['/v1/onboarding/tl%3Aonboarding%3Amissing', 'not_found'],
      ['/v1/onboarding/tl%3Aonboarding%3Amissing/assessment', 'not_found'],
      ['/v1/pilots/tl%3Apilot%3Amissing', 'not_found'],
      ['/v1/public-projection/tl%3Asubject%3Amissing', 'public_projection_not_found'],
      ['/v1/keys/tl%3Akey%3Amissing', 'key_not_found'],
      ['/v1/credentials/urn%3Auuid%3Amissing/status', 'credential_status_not_found'],
      ['/v1/subjects/tl%3Asubject%3Amissing', 'subject_not_found'],
      ['/v1/subjects/tl%3Asubject%3Amissing/assessment', 'assessment_not_found'],
      ['/v1/qr/tl%3Asubject%3Amissing', 'subject_not_found'],
      ['/r/tl%3Asubject%3Amissing', 'subject_not_found'],
      ['/v1/does-not-exist', 'not_found']
    ];

    for (const [path, errorCode] of missingCases) {
      const response = await get(path, `negative ${path}`, 404);
      assert(response.json?.error === errorCode, `${path}: expected error ${errorCode}, got ${response.json?.error}`);
    }

    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      const response = await request('/health', { method });
      assertJsonResponse(response, `${method} rejection`, 405);
      assert(response.json?.error === 'method_not_allowed', `${method}: method error contract changed`);
    }

    console.log('HTTP contract checks passed across Registry, lifecycle, publication, resolver, UI, and negative paths.');
  } finally {
    if (child.exitCode === null) child.kill('SIGTERM');
    await Promise.race([
      new Promise(resolve => child.once('exit', resolve)),
      delay(1000)
    ]);
    if (stderr.trim()) process.stderr.write(stderr);
  }
}

main().catch(error => {
  console.error(`HTTP contract check failed: ${error.message}`);
  process.exit(1);
});
