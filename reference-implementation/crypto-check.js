#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { keyValidAt, unsignedObject, verifyCompactJws } from './crypto.js';

const input = process.argv[2];
if (!input) { console.error('Usage: node crypto-check.js <trust-bundle.json>'); process.exit(2); }
const bundlePath = path.resolve(input);
const bundleDir = path.dirname(bundlePath);
const repoRoot = path.resolve(bundleDir, '..', '..');
const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
const byId = xs => new Map((xs || []).map(x => [x.id, x]));
const keys = byId(bundle.keys);
const evidence = byId(bundle.evidence);
const errors = [], warnings = [], signatureChecks = [], statusChecks = [];

function safeResolve(base, relative) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(relative)) return null;
  const full = path.resolve(base, relative), prefix = repoRoot + path.sep;
  return full === repoRoot || full.startsWith(prefix) ? full : false;
}
function readJsonRelative(base, relative, context) {
  const file = safeResolve(base, relative);
  if (file === false) { errors.push(`${context}: path escapes repository`); return null; }
  if (file === null) { warnings.push(`${context}: remote resource not fetched by offline crypto checker`); return null; }
  if (!fs.existsSync(file)) { errors.push(`${context}: file not found: ${relative}`); return null; }
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
function checkSignedObject(obj, type, at) {
  const keyId = obj.keyId || obj.keyIds?.[0];
  const key = keys.get(keyId);
  if (!key) { errors.push(`${obj.id}: missing key ${keyId}`); return {valid:false, reason:'missing_key'}; }
  const validity = keyValidAt(key, at);
  if (!validity.ok) errors.push(`${obj.id}: key not valid at signing time (${validity.reason})`);
  const result = verifyCompactJws(obj.jws, key, unsignedObject(obj));
  signatureChecks.push({id:obj.id,type,keyId,valid:result.ok,reason:result.reason});
  if (!result.ok) errors.push(`${obj.id}: signature invalid (${result.reason})`);
  return {valid:result.ok, reason:result.reason, key};
}

for (const manifest of bundle.manifests || []) {
  const checked = checkSignedObject(manifest, 'evidence-manifest', manifest.createdAt);
  if (checked.key && checked.key.controller !== manifest.issuer) errors.push(`${manifest.id}: key controller does not match manifest issuer`);
  for (const entry of manifest.entries || []) {
    const ev = evidence.get(entry.evidenceId);
    if (!ev) { errors.push(`${manifest.id}: missing evidence ${entry.evidenceId}`); continue; }
    if (entry.sha256 !== ev.integrity?.digest) errors.push(`${manifest.id}: signed digest differs from evidence record for ${entry.evidenceId}`);
    const file = safeResolve(bundleDir, entry.uri);
    if (file && fs.existsSync(file)) {
      const actual = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
      if (actual !== entry.sha256) errors.push(`${manifest.id}: signed digest does not match bytes for ${entry.evidenceId}`);
    }
  }
}

for (const verification of bundle.verifications || []) {
  if (!verification.credentialJwsUri) continue;
  const key = keys.get(verification.keyId);
  if (!key) { errors.push(`${verification.id}: missing credential key ${verification.keyId}`); continue; }
  if (key.controller !== verification.verifierOrganizationId) errors.push(`${verification.id}: credential key controller differs from verifier organization`);
  const validity = keyValidAt(key, verification.verifiedAt);
  if (!validity.ok) errors.push(`${verification.id}: key not valid at verification time (${validity.reason})`);
  const vc = readJsonRelative(bundleDir, verification.credentialUri, verification.id);
  const jwsFile = safeResolve(bundleDir, verification.credentialJwsUri);
  if (!vc || !jwsFile || jwsFile === false || !fs.existsSync(jwsFile)) { if (jwsFile && !fs.existsSync(jwsFile)) errors.push(`${verification.id}: credential JWS file not found`); continue; }
  const result = verifyCompactJws(fs.readFileSync(jwsFile,'utf8').trim(), key, vc);
  signatureChecks.push({id:verification.id,type:'credential',keyId:key.id,valid:result.ok,reason:result.reason});
  if (!result.ok) errors.push(`${verification.id}: credential JWS invalid (${result.reason})`);
  if (verification.credentialStatusUri) {
    const status = readJsonRelative(bundleDir, verification.credentialStatusUri, `${verification.id}:status`);
    if (status) {
      const checked = checkSignedObject(status, 'credential-status', status.updatedAt);
      const idMatches = status.credentialId === vc.id, active = status.status === 'active';
      statusChecks.push({credentialId:vc.id,status:status.status,signatureValid:checked.valid,idMatches});
      if (!idMatches) errors.push(`${verification.id}: credential status id mismatch`);
      if (!active) errors.push(`${verification.id}: credential status is ${status.status}`);
    }
  }
}

for (const relative of ['registry/descriptor.json','registry/peers/secondary.json']) {
  const descriptor = JSON.parse(fs.readFileSync(path.join(repoRoot, relative), 'utf8'));
  const checked = checkSignedObject(descriptor, 'registry-descriptor', descriptor.updatedAt);
  if (checked.key && checked.key.controller !== descriptor.operatorOrganizationId) errors.push(`${descriptor.id}: key controller does not match registry operator`);
}

const report={ok:errors.length===0,bundleVersion:bundle.bundleVersion,signatureChecks,statusChecks,errors,warnings,notice:'Valid signatures establish integrity and control of declared keys, not authority, factual truth, legal compliance, or food safety.'};
console.log(JSON.stringify(report,null,2));
process.exit(report.ok?0:1);
