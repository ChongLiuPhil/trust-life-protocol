# Field Pilot Incident, Suspension, Correction, and Appeal Runbook

This runbook covers Trust & Life operational state. It does not replace emergency services, product-recall law, regulator notification, food-safety procedures, or contractual obligations.

## 1. Detect and classify

Record the incident source, affected scope, first-observed time, evidence references, severity, and whether the report is verified, disputed, or still under review. An accusation is not a verdict.

Potential Trust & Life impact classes:

- **data-integrity** — missing, altered, replayed, or conflicting evidence;
- **credential/key** — compromised, revoked, expired, or incorrectly attributed signing material;
- **scope** — public result covers the wrong organization/facility/product/batch/time period;
- **process/condition** — material deviation or observation gap relevant to a published claim;
- **privacy/security** — unauthorized disclosure, worker privacy problem, account/key compromise;
- **governance** — verifier conflict, biased decision process, pay-to-pass concern;
- **availability** — Registry/evidence outage that prevents meaningful verification.

## 2. Decide whether to suspend

The operator SHOULD suspend public `live` status when continued presentation could materially mislead users, including when:

- a blocking requirement is no longer satisfied;
- a high/critical verified incident is unresolved within covered scope;
- key or credential authenticity/status cannot be trusted;
- the public scope is materially wrong;
- evidence needed for the current result is unavailable beyond the declared outage policy;
- a serious privacy/security issue affects the public projection.

Suspension is a reversible operational state, not an automatic finding of misconduct.

## 3. Preserve history

Do not delete or silently rewrite the assessment that was previously public. Record a new lifecycle event and, where necessary, a corrective-action object. Preserve relevant hashes, timestamps, source references, decision rationale, and supersession links subject to lawful retention limits.

## 4. Investigate with role separation

Where feasible, the person or organization that caused or benefited from the disputed condition should not be the sole reviewer. T3 or other independent findings should be revisited by an appropriately independent reviewer.

## 5. Correct

Corrections may include:

- replacing an incorrect scope declaration;
- publishing missing evidence or an explicit evidence gap;
- rotating/revoking keys;
- obtaining a new laboratory/inspection attestation;
- correcting privacy/public-projection rules;
- changing a finding from pass to gap/blocked/manual-review;
- issuing a superseding assessment.

## 6. Republish or remain suspended

A suspended pilot returns to `live` only after the currently applicable blocking requirements are satisfied and the required human approval gate is complete. The new public result SHOULD link to the superseded assessment/history where appropriate.

## 7. Appeals

An affected participant may challenge factual or procedural errors through the declared appeal route. Appeal records should identify the challenged decision, grounds, submitted evidence, reviewer, outcome, and any superseding assessment. Filing an appeal does not automatically restore `live` status.

## 8. Withdrawal and completion

A participant may withdraw from the pilot, but withdrawal MUST NOT erase prior public history where retention is lawful and necessary to prevent misleading interpretation. Completed pilots should retain a clear end date and historical status rather than appearing continuously active.
