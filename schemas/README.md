# Trust & Life Machine-Readable Schemas

v0.4 keeps the portable evidence/cryptographic model from v0.3 and adds machine-readable onboarding and explainable conformance objects.

## Trust and evidence objects

- `organization.schema.json` — accountable organizations
- `subject.schema.json` — facilities, products, batches, shipments, processes, and services
- `claim.schema.json` — scoped claims and T-levels
- `evidence.schema.json` — evidence metadata and SHA-256 integrity references
- `verification.schema.json` — verification actions and credential links
- `incident.schema.json` — public-review / incident lifecycle
- `conformance.schema.json` — profile-level conformance statements
- `key.schema.json` — public signing keys and lifecycle
- `signed-manifest.schema.json` — signed evidence manifests
- `credential-status.schema.json` — signed credential status fixture
- `registry-descriptor.schema.json` — signed Registry/federation descriptor
- `bundle.schema.json` — portable v0.3 trust bundle container

## v0.4 onboarding and assessment objects

- `onboarding-application.schema.json` — applicant, facility/subject scope, declarations, requirement mappings, public/restricted boundaries
- `requirement-profile.schema.json` — machine-readable blocking/advisory/conditional pilot rules
- `conformance-assessment.schema.json` — requirement-level findings and overall ready/not-ready result
- `corrective-action.schema.json` — gap remediation linked to a requirement and assessment
- `appeal.schema.json` — challenge/disposition history for material decisions

The trust bundle remains version `0.3` because v0.4 does not change its wire shape. Onboarding/application/profile/assessment formats have their own `0.4` version fields rather than forcing an unrelated bundle-format change.

## Validation layers

JSON Schema validates **shape**. The reference implementation separately checks:

1. cross-object relationships;
2. actual evidence bytes against SHA-256 digests;
3. Ed25519 JWS signatures;
4. key and credential-status state;
5. onboarding scope/references and public/restricted-data guards;
6. machine-readable profile requirements;
7. T-level/evidence-category/independent-verifier rules;
8. incident blocking policy;
9. positive and deliberate negative conformance fixtures.

None of these checks establishes factual truth, legal compliance, professional competence, laboratory method validity, or food safety.
