#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const inputs = process.argv.slice(2);
if (!inputs.length) {
  console.error('Usage: node pilot-check.js <field-pilot-state.json> [...]');
  process.exit(2);
}

const allowedStates = new Set(['draft','intake','evidence-mapping','preflight','human-review','approved','live','suspended','corrective-action','withdrawn','completed']);
const ready = new Set(['ready','ready-with-advisories']);
let ok = true;
const reports = [];

for (const input of inputs) {
  const file = path.resolve(input);
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  const errors = [];
  if (!state.pilotId || !state.profileId || !state.applicationId) errors.push('pilotId, profileId and applicationId are required');
  if (!allowedStates.has(state.state)) errors.push(`unknown state ${state.state}`);
  if (!Array.isArray(state.history) || state.history.length === 0) errors.push('history must contain at least one event');
  if (state.history?.length && state.history.at(-1).state !== state.state) errors.push('last history state must equal current state');
  if (state.state === 'live') {
    if (state.publicProjectionAllowed !== true) errors.push('live state requires publicProjectionAllowed=true');
    if (!ready.has(state.currentAssessmentDecision)) errors.push('live state requires a ready assessment decision');
  }
  if (['suspended','withdrawn'].includes(state.state) && state.publicProjectionAllowed !== false) errors.push(`${state.state} state requires publicProjectionAllowed=false`);
  if (state.state === 'suspended' && state.currentAssessmentDecision !== 'suspended') errors.push('suspended lifecycle state must expose suspended assessment decision');
  if (state.state === 'withdrawn' && state.currentAssessmentDecision !== 'withdrawn') errors.push('withdrawn lifecycle state must expose withdrawn assessment decision');
  for (let i = 1; i < (state.history || []).length; i++) {
    const prev = Date.parse(state.history[i - 1].at), cur = Date.parse(state.history[i].at);
    if (!Number.isFinite(prev) || !Number.isFinite(cur) || cur < prev) errors.push(`history timestamps are invalid or out of order at index ${i}`);
  }
  const result = {file: path.relative(process.cwd(), file), pilotId: state.pilotId, state: state.state, publicProjectionAllowed: state.publicProjectionAllowed, ok: errors.length === 0, errors};
  reports.push(result);
  if (errors.length) ok = false;
}

console.log(JSON.stringify({ok, reports, notice:'Lifecycle validation protects publication-state consistency. It does not approve a real organization, verify legal compliance, or replace qualified human review.'}, null, 2));
process.exit(ok ? 0 : 1);
