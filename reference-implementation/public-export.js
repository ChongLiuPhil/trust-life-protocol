#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { buildPublicProjection } from './publication.js';

const args = process.argv.slice(2);
const positional = args.filter(x => !x.startsWith('--'));
const expected = args.find(x => x.startsWith('--expect-allowed='))?.split('=')[1];
if (positional.length < 4) {
  console.error('Usage: node public-export.js <application.json> <profile.json> <bundle.json> <pilot-state.json> [--expect-allowed=true|false]');
  process.exit(2);
}

const readJson = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const [applicationFile, profileFile, bundleFile, pilotFile] = positional;
const result = buildPublicProjection({
  application: readJson(applicationFile),
  profile: readJson(profileFile),
  bundle: readJson(bundleFile),
  pilot: readJson(pilotFile),
  evaluatorVersion: '0.5.0'
});

console.log(JSON.stringify({
  allowed: result.allowed,
  reasons: result.reasons,
  assessmentDecision: result.assessment.decision,
  pilotState: result.pilotState,
  projection: result.projection,
  notice: result.notice
}, null, 2));

if (expected !== undefined && result.allowed !== (expected === 'true')) {
  console.error(`Expected allowed=${expected}, received ${result.allowed}`);
  process.exit(1);
}
process.exit(0);
