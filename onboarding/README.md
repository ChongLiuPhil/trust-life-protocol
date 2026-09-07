# Pilot onboarding workflow

Trust & Life onboarding is designed to be explainable and portable rather than a private approval form hidden inside one platform.

## Recommended pilot sequence

1. **Choose a profile and version.** A pilot must name the exact machine-readable profile it is requesting.
2. **Register organization and scope.** Identify responsible organization, facility scope, covered products/batches/shipments/processes, activities, and jurisdictions.
3. **Prepare requirement responses.** Map every blocking requirement to claims/evidence/declarations or an explicitly permitted not-applicable justification.
4. **Keep public and restricted material separate.** Public records should contain only what is necessary to interpret the trust claim. Verifier-only documents are referenced through safe metadata rather than dumped into the public Registry.
5. **Run the deterministic evaluator.** Structural and machine-checkable requirements produce requirement-level findings.
6. **Perform required manual/independent review.** Automation must not invent a pass where qualified review is required.
7. **Publish only an explainable result.** Public output shows scope, profile/version, findings, gaps, limitations, and correction/appeal routes.
8. **Correct through new evidence and reassessment.** Do not overwrite adverse history silently.
9. **Suspend or withdraw scope explicitly when needed.** A prior ready result is not a permanent badge.

## What the pilot must not do

- market onboarding as government approval or food-safety certification;
- require a proprietary camera, sensor, blockchain, cloud, or marketplace vendor when equivalent evidence is sufficient;
- publish worker personal data or trade secrets merely to appear transparent;
- allow sponsorship, commission, or payment to change a finding;
- turn a public allegation directly into a verified violation;
- produce a universal trust score that hides which requirements passed or failed.

## Repository fixture

`examples/apple-supply-chain/onboarding/` contains a synthetic passing pilot application and a deliberate gap case. CI runs both so that the reference evaluator must demonstrate both positive and negative behavior.