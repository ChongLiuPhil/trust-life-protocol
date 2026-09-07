#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
if (!input) {
  console.error('Usage: node vc-check.js <credential.json>');
  process.exit(2);
}

const vc = JSON.parse(fs.readFileSync(path.resolve(input), 'utf8'));
const errors = [];
const warnings = [];
const contexts = Array.isArray(vc['@context']) ? vc['@context'] : [vc['@context']].filter(Boolean);
const types = Array.isArray(vc.type) ? vc.type : [vc.type].filter(Boolean);

if (contexts[0] !== 'https://www.w3.org/ns/credentials/v2') errors.push('first @context must be the W3C credentials v2 context');
if (!types.includes('VerifiableCredential')) errors.push('type must include VerifiableCredential');
if (!vc.issuer) errors.push('issuer is required');
if (!vc.credentialSubject) errors.push('credentialSubject is required');
for (const key of ['validFrom', 'validUntil']) if (vc[key] && Number.isNaN(Date.parse(vc[key]))) errors.push(`${key} is not a parseable date-time`);
if (!vc.credentialStatus) warnings.push('credential has no status reference');
if (vc.validUntil && Date.now() > Date.parse(vc.validUntil)) warnings.push('credential validity period has ended');

const report = {
  ok: errors.length === 0,
  errors,
  warnings,
  notice: 'This command validates the VC 2.0 data-model fixture. The separate v0.3 crypto checker verifies its detached Ed25519 JWS and signed status record.'
};
console.log(JSON.stringify(report, null, 2));
process.exit(report.ok ? 0 : 1);
