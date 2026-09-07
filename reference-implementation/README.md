# Reference Implementation v0.4

The reference implementation remains dependency-free and uses Node.js built-ins for cryptography, HTTP, and deterministic assessment logic.

## Verify the complete synthetic pilot

```bash
cd reference-implementation
npm run verify
```

The verification suite checks:

1. trust-bundle cross-object semantics;
2. actual SHA-256 evidence bytes;
3. Ed25519 JWS signatures on evidence manifests;
4. the signed VC 2.0 demonstration fixture and credential status;
5. signed primary/peer Registry descriptors;
6. onboarding structure, facility ownership/scope, profile pinning, and secret-like-field guards;
7. a positive fresh-produce pilot application that MUST evaluate to `ready`;
8. a deliberate negative application that MUST evaluate to `not-ready`.

The negative fixture is important: CI must prove that a blocking laboratory/appeal gap cannot be averaged away by unrelated passing requirements.

## Run individual assessment commands

```bash
npm run verify:onboarding
npm run assess:pilot
npm run assess:gap
```

The evaluator is implemented in `conformance.js` and shared by the CLI and Registry server so the same inputs/profile produce the same machine-checkable result.

## Run the Registry

```bash
npm run serve
```

Open:

```text
http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001
```

Useful v0.4 endpoints include:

- `/.well-known/trust-life-registry`
- `/v1/federation`
- `/v1/keys`
- `/v1/profiles`
- `/v1/profiles/TL-FRESH-PRODUCE-001`
- `/v1/onboarding`
- `/v1/onboarding/{applicationId}/assessment`
- `/v1/subjects/{subjectId}`
- `/v1/subjects/{subjectId}/assessment`
- `/v1/qr/{subjectId}`
- `/r/{subjectId}` — demo resolver redirect to the public verification view

See `registry/openapi.yaml` for the documented read-only surface.

## What the evaluator can decide

The reference evaluator can decide declared machine-readable conditions such as scope consistency, T-level minimums, evidence categories, independent-verifier separation, required declarations, and incident blocking policy.

It cannot establish:

- whether physical-world statements are factually true or complete;
- whether an applicant is legally compliant in a jurisdiction;
- whether a verifier/laboratory is professionally qualified beyond represented metadata;
- whether a laboratory method is scientifically/legally suitable;
- whether food is safe;
- whether a production deployment has passed legal/privacy/security review.

Those remain separate review layers. See `docs/pilot-readiness.md` and `docs/threat-model.md`.

## Security boundary

No private signing keys are committed. Synthetic public keys and signatures exist only to exercise verification behavior. Do not reuse them for production identity or trust decisions.
