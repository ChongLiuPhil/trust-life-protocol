# Field Pilot Operator Runbook

## Daily / per-ingestion checks

- Verify new evidence arrived from the expected source and subject scope.
- Recompute or verify integrity/signature metadata before accepting a new public projection.
- Record observation/sensor outages and gaps; do not backfill them as continuous coverage.
- Reject evidence that unexpectedly contains secrets, unnecessary personal data, or out-of-scope material from the public pipeline.
- Re-run the applicable conformance evaluator after any trust-sensitive evidence or scope change.

## Before any public-state change

- Confirm the profile and evaluator versions.
- Confirm the assessment belongs to the same application and declared scope.
- Confirm no unresolved blocking/manual-review finding is being suppressed.
- Confirm credential/key status used by the assessment is current enough for the deployment policy.
- Record actor role, reason, timestamp, and superseded assessment/state.

## Periodic review

At the deployment's declared cadence:

1. review evidence freshness and declared validity windows;
2. verify public resolvers and evidence links still resolve;
3. review credential/key status and planned rotations;
4. review observation/sensor gaps;
5. review open incidents, corrective actions, and appeals;
6. verify public/private data classification has not drifted;
7. sample-check that Registry projection matches source assessment records;
8. test backup restoration and emergency suspension;
9. review verifier conflicts and commercial relationships;
10. document residual risks and any required profile/evaluator update.

## Change management

A new profile version, evaluator change, scope expansion, facility addition, new evidence source, or changed public-data policy may alter the basis of the result. The operator should create a new assessment rather than treating a materially different basis as the same decision.

## Emergency suspension

The deployment SHOULD support a narrowly permissioned way to change a `live` pilot to `suspended` without needing to delete evidence or rewrite prior assessments. The public page should show the suspension and reason at an appropriate level of disclosure.

## Recovery

After correction, re-run integrity/cryptographic checks and conformance evaluation, complete any required independent/human review, issue a superseding assessment, and only then restore `live` state.

## What the operator must never do

- change a requirement result because a participant paid more;
- hide a blocking gap by changing presentation only;
- call a signature or hash proof of physical-world truth;
- reuse a facility/product result for an unrelated scope;
- silently alter historical assessments;
- publish raw worker/private/commercial information merely in the name of transparency;
- invent accreditation, regulatory, GS1, laboratory, or standards-body authority.
