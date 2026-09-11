#!/usr/bin/env node
import http from 'node:http';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const host = '127.0.0.1';
const port = Number(process.env.TL_SUSPENDED_TEST_PORT || 18081);
const baseUrl = `http://${host}:${port}`;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${baseUrl}${path}`, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = body ? JSON.parse(body) : null; } catch {}
        resolve({ status: res.statusCode, headers: res.headers, json });
      });
    });
    req.on('error', reject);
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
    env: {
      ...process.env,
      HOST: host,
      PORT: String(port),
      TL_PILOT_STATE_PATH: '../field-pilot/demo-suspended-state.json'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let stderr = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', chunk => { stderr += chunk; });

  try {
    await waitForServer(child);
    const subjectId = encodeURIComponent('tl:subject:apple-2026-0001');

    const pilot = await request('/v1/pilots/tl%3Apilot%3Aapple-demo-2026-01');
    assert(pilot.status === 200, `suspended pilot detail expected 200, got ${pilot.status}`);
    assert(pilot.json?.state === 'suspended', 'fixture injection must expose suspended lifecycle state');
    assert(pilot.json?.publicProjectionAllowed === false, 'suspended pilot must not allow current public projection');

    const subject = await request(`/v1/subjects/${subjectId}`);
    assert(subject.status === 200, 'historical verification view should remain available during suspension');
    assert(subject.json?.pilotLifecycle?.state === 'suspended', 'verification view must expose suspended lifecycle');
    assert(subject.json?.publicationAllowed === false, 'verification view must expose blocked publication');

    const projection = await request(`/v1/public-projection/${subjectId}`);
    assert(projection.status === 409, `suspended projection expected 409, got ${projection.status}`);
    assert(projection.json?.error === 'public_projection_not_allowed', 'suspended projection error contract changed');
    assert(projection.json?.pilotState === 'suspended', '409 response must expose suspended state');

    const resolver = await request(`/r/${subjectId}`);
    assert(resolver.status === 302, 'resolver/history path must remain available during suspension');

    console.log('Suspended lifecycle HTTP checks passed.');
  } finally {
    if (child.exitCode === null) child.kill('SIGTERM');
    await Promise.race([new Promise(resolve => child.once('exit', resolve)), delay(1000)]);
    if (stderr.trim()) process.stderr.write(stderr);
  }
}

main().catch(error => {
  console.error(`Suspended HTTP check failed: ${error.message}`);
  process.exit(1);
});
