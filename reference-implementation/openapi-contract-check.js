#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const specPath = path.resolve(here, '..', 'registry', 'openapi.yaml');
const source = fs.readFileSync(specPath, 'utf8');
const lines = source.split(/\r?\n/);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseOperations() {
  const operations = [];
  let currentPath = null;
  let currentOperation = null;

  for (const line of lines) {
    const pathMatch = line.match(/^  (\/[^:]+):\s*$/);
    if (pathMatch) {
      currentPath = pathMatch[1];
      currentOperation = null;
      continue;
    }

    const verbMatch = line.match(/^    (get|post|put|patch|delete|head|options):\s*$/);
    if (currentPath && verbMatch) {
      currentOperation = {
        path: currentPath,
        method: verbMatch[1],
        operationId: null,
        responses: []
      };
      operations.push(currentOperation);
      continue;
    }

    if (!currentOperation) continue;

    const operationIdMatch = line.match(/^      operationId:\s*(\S+)\s*$/);
    if (operationIdMatch) {
      currentOperation.operationId = operationIdMatch[1];
      continue;
    }

    const responseMatch = line.match(/^        ['"]?(\d{3})['"]?:/);
    if (responseMatch) currentOperation.responses.push(Number(responseMatch[1]));
  }

  return operations;
}

const expected = new Map([
  ['/health', [200]],
  ['/.well-known/trust-life-registry', [200]],
  ['/v1/federation', [200]],
  ['/v1/profiles', [200]],
  ['/v1/profiles/{profileId}', [200, 404]],
  ['/v1/onboarding', [200]],
  ['/v1/onboarding/{applicationId}', [200, 404]],
  ['/v1/onboarding/{applicationId}/assessment', [200, 404]],
  ['/v1/pilots', [200]],
  ['/v1/pilots/{pilotId}', [200, 404]],
  ['/v1/public-projection/{subjectId}', [200, 404, 409]],
  ['/v1/keys', [200]],
  ['/v1/keys/{keyId}', [200, 404]],
  ['/v1/credentials/{credentialId}/status', [200, 404]],
  ['/v1/subjects', [200]],
  ['/v1/subjects/{subjectId}', [200, 404]],
  ['/v1/subjects/{subjectId}/assessment', [200, 404]],
  ['/v1/qr/{subjectId}', [200, 404]],
  ['/r/{subjectId}', [302, 404]]
]);

function main() {
  assert(/^openapi:\s*3\.1\.0\s*$/m.test(source), 'OpenAPI version must remain 3.1.0');
  assert(/^\s*version:\s*0\.5\.0\s*$/m.test(source), 'OpenAPI info.version must match reference implementation 0.5.0');

  const operations = parseOperations();
  assert(operations.length === expected.size, `expected ${expected.size} documented operations, found ${operations.length}`);

  const operationIds = new Set();
  const seenPaths = new Set();

  for (const operation of operations) {
    assert(operation.method === 'get', `${operation.path} must remain read-only GET in the reference API`);
    assert(operation.operationId, `${operation.path} is missing operationId`);
    assert(!operationIds.has(operation.operationId), `duplicate operationId: ${operation.operationId}`);
    operationIds.add(operation.operationId);
    seenPaths.add(operation.path);

    const expectedStatuses = expected.get(operation.path);
    assert(expectedStatuses, `undocumented contract path added without checker update: ${operation.path}`);
    const actual = [...new Set(operation.responses)].sort((a, b) => a - b);
    const wanted = [...expectedStatuses].sort((a, b) => a - b);
    assert(JSON.stringify(actual) === JSON.stringify(wanted), `${operation.path} response contract changed: expected ${wanted.join(',')}, got ${actual.join(',')}`);
  }

  for (const pathName of expected.keys()) {
    assert(seenPaths.has(pathName), `OpenAPI path missing: ${pathName}`);
  }

  assert(source.includes('not legal certification'), 'OpenAPI must preserve the non-certification safety boundary');
  assert(source.includes('not itself a GS1'), 'resolver documentation must preserve the GS1 identifier boundary');

  console.log(`OpenAPI contract checks passed (${operations.length} read-only operations).`);
}

try {
  main();
} catch (error) {
  console.error(`OpenAPI contract check failed: ${error.message}`);
  process.exit(1);
}
