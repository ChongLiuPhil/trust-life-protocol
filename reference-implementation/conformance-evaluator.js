#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { evaluateConformance } from './conformance.js';

const args = process.argv.slice(2);
const positional = args.filter(x => !x.startsWith('--'));
const expected = args.find(x => x.startsWith('--expect='))?.split('=')[1];

if (positional.length < 3) {
  console.error('Usage: node conformance-evaluator.js <application.json> <profile.json> <bundle.json> [--expect=ready|ready-with-advisories|not-ready]');
  process.exit(2);
}

const readJson = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
const [applicationFile, profileFile, bundleFile] = positional;
const application = readJson(applicationFile);
const profile = readJson(profileFile);
const bundle = readJson(bundleFile);

const assessment = evaluateConformance({
  application,
  profile,
  bundle,
  evaluatedAt: application.submittedAt,
  evaluatorVersion: '0.4.0'
});

console.log(JSON.stringify(assessment, null, 2));

if (expected && assessment.decision !== expected) {
  console.error(`Expected decision ${expected}, received ${assessment.decision}`);
  process.exit(1);
}
process.exit(0);
