# Machine-Readable Schemas

This directory will contain portable data schemas used by Trust & Life implementations.

The v0.1 schema work should remain small and testable. The first planned objects are:

- `organization` — participating organization identity and public profile;
- `facility` — site identity and scoped participation;
- `claim` — a structured trust claim linked to a requirement;
- `evidence` — evidence metadata, provenance, integrity references, access state, and coverage;
- `verification` — review method, verifier, result, validity, and limitations;
- `incident` — report, review, response, appeal, corrective action, and resolution state;
- `conformance` — profile/version scope and T-level results.

## Design rules

Schemas SHOULD:

1. use stable identifiers;
2. distinguish raw evidence from assertions about evidence;
3. preserve timestamps and version/supersession relationships;
4. represent uncertainty, unavailable data, and explicit gaps;
5. allow public metadata even when raw evidence is access-controlled;
6. support multilingual human-readable labels without making localized text the canonical identifier;
7. avoid embedding secrets or device credentials;
8. provide extension points for domain profiles.

## Interoperability

Do not create a second supply-chain event standard merely for Trust & Life. Where applicable, event data should map to or directly use GS1 EPCIS/CBV semantics.

Signed third-party attestations may be represented using W3C Verifiable Credentials or another interoperable mechanism.

## Planned v0.1 files

```text
schemas/
├── organization.schema.json
├── facility.schema.json
├── claim.schema.json
├── evidence.schema.json
├── verification.schema.json
├── incident.schema.json
└── conformance.schema.json
```

These files should be added together with example instances and validation tests so that schema design remains grounded in real use cases.
