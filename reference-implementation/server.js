#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const demoRoot = path.join(repoRoot, 'examples', 'apple-supply-chain');
const webRoot = path.join(here, 'web');
const bundlePath = path.join(demoRoot, 'trust-bundle.json');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8080);

const readBundle = () => JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
const byId = xs => new Map((xs || []).map(x => [x.id, x]));

function json(res, status, value) {
  res.writeHead(status, {'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','cache-control':'no-store'});
  res.end(JSON.stringify(value, null, 2));
}

function safeFile(base, relative) {
  const full = path.resolve(base, relative);
  const prefix = base.endsWith(path.sep) ? base : base + path.sep;
  return full.startsWith(prefix) ? full : null;
}

function serveFile(res, file, type) {
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) return json(res, 404, {error:'not_found'});
  res.writeHead(200, {'content-type':type,'cache-control':'no-store'});
  fs.createReadStream(file).pipe(res);
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
    evidence: (c.evidenceIds || []).map(id => evidence.get(id)).filter(Boolean).map(e => ({...e, publicUri:`/demo/${e.uri}`})),
    verifications: (c.verificationIds || []).map(id => verifications.get(id)).filter(Boolean).map(v => ({
      ...v,
      verifierName: orgs.get(v.verifierOrganizationId)?.name,
      credentialPublicUri: v.credentialUri ? `/demo/${v.credentialUri}` : undefined
    }))
  }));
  const incidents = (bundle.incidents || []).filter(i => i.subjectId === subjectId);
  return {
    protocol:'Trust & Life Protocol',
    bundleVersion:bundle.bundleVersion,
    subject,
    owner:orgs.get(subject.organizationId) || null,
    conformance,
    claims,
    incidents,
    unresolvedIncidents:incidents.filter(i => !['resolved','not-substantiated'].includes(i.status)).length,
    verificationPath:`/verify?subject=${encodeURIComponent(subject.id)}`,
    notice:'This view reports evidence and verification status. It is not a food-safety guarantee or purchasing recommendation.'
  };
}

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
    if (req.method !== 'GET') return json(res, 405, {error:'method_not_allowed'});
    if (url.pathname === '/health') return json(res, 200, {ok:true, protocol:'trust-life', referenceImplementation:'0.2.0'});
    const bundle = readBundle();
    if (url.pathname === '/v1/subjects') return json(res, 200, {items:bundle.subjects.map(s => ({...s, verificationPath:`/verify?subject=${encodeURIComponent(s.id)}`}))});
    if (url.pathname.startsWith('/v1/subjects/')) {
      const id = decodeURIComponent(url.pathname.slice('/v1/subjects/'.length));
      const view = verificationView(bundle, id);
      return view ? json(res, 200, view) : json(res, 404, {error:'subject_not_found'});
    }
    if (url.pathname === '/demo/trust-bundle.json') return serveFile(res, bundlePath, 'application/json; charset=utf-8');
    if (url.pathname.startsWith('/demo/')) {
      const file = safeFile(demoRoot, decodeURIComponent(url.pathname.slice('/demo/'.length)));
      const ext = path.extname(file || '').toLowerCase();
      const type = ext === '.json' || ext === '.jsonld' ? 'application/json; charset=utf-8' : 'application/octet-stream';
      return serveFile(res, file, type);
    }
    if (url.pathname === '/' || url.pathname === '/verify' || url.pathname === '/index.html') return serveFile(res, path.join(webRoot, 'index.html'), 'text/html; charset=utf-8');
    if (url.pathname === '/app.js') return serveFile(res, path.join(webRoot, 'app.js'), 'text/javascript; charset=utf-8');
    return json(res, 404, {error:'not_found'});
  } catch (error) {
    json(res, 500, {error:'internal_error', message:error.message});
  }
});

server.listen(port, host, () => console.log(`Trust & Life registry demo: http://${host}:${port}/verify?subject=tl%3Asubject%3Aapple-2026-0001`));
