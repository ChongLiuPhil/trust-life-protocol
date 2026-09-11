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

    const health = await request('/health');
    assert(health.status === 200 && health.json?.ok === true, 'health contract failed');
    assert(health.headers['cache-control'] === 'no-store', 'health must disable caching');

    const subjectId = 'tl%3Asubject%3Aapple-2026-0001';
    const projection = await request(`/v1/public-projection/${subjectId}`);
    assert(projection.status === 200, 'live public projection should be available');
    assert(projection.json?.requestedSubjectId === 'tl:subject:apple-2026-0001', 'projection subject mismatch');

    const missingSubject = await request('/v1/subjects/tl%3Asubject%3Amissing');
    assert(missingSubject.status === 404, 'missing subject must return 404');
    assert(missingSubject.json?.error === 'subject_not_found', 'missing subject error contract changed');

    const missingProjection = await request('/v1/public-projection/tl%3Asubject%3Amissing');
    assert(missingProjection.status === 404, 'missing public projection must return 404');
    assert(missingProjection.json?.error === 'public_projection_not_found', 'missing projection error contract changed');

    const missingKey = await request('/v1/keys/tl%3Akey%3Amissing');
    assert(missingKey.status === 404, 'missing key must return 404');
    assert(missingKey.json?.error === 'key_not_found', 'missing key error contract changed');

    const missingRoute = await request('/v1/does-not-exist');
    assert(missingRoute.status === 404 && missingRoute.json?.error === 'not_found', 'unknown route contract changed');

    const postHealth = await request('/health', { method: 'POST' });
    assert(postHealth.status === 405, 'non-GET request must return 405');
    assert(postHealth.json?.error === 'method_not_allowed', 'method error contract changed');

    const resolver = await request(`/r/${subjectId}`);
    assert(resolver.status === 302, 'resolver must redirect');
    assert(resolver.headers.location === `/verify?subject=${subjectId}`, 'resolver redirect target changed');

    console.log('HTTP contract checks passed.');
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
