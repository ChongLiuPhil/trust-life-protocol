# Reference Implementation v0.5

The reference implementation remains dependency-free and uses Node.js built-ins for cryptography, HTTP, deterministic conformance logic, lifecycle checks, guarded public projection, and regression testing.

## Verify the complete synthetic field pilot

```bash
cd reference-implementation
npm run verify
```

`npm run verify` is the contributor and CI gate. A change should not be considered ready until this command succeeds locally and in GitHub Actions.

The verification suite checks:

1. trust-bundle cross-object semantics;
2. actual SHA-256 evidence bytes;
3. Ed25519 JWS signatures on evidence manifests;
4. the signed VC 2.0 demonstration fixture and credential status;
5. signed primary/peer Registry descriptors;
6. onboarding structure, facility ownership/scope, profile pinning, and secret-like-field guards;
7. a positive fresh-produce pilot application that MUST evaluate to `ready`;
8. a deliberate negative application that MUST evaluate to `not-ready`;
9. valid `live` and `suspended` field-pilot lifecycle fixtures;
10. a live public projection that MUST be allowed;
11. a suspended public projection that MUST be blocked;
12. the public Registry HTTP success and rejection contracts, including 404/405 behavior, cache/CORS headers, resolver redirects, public-safe onboarding views, and consumer UI availability;
13. OpenAPI drift checks for the complete documented read-only surface, unique operation IDs, expected response status codes, and critical safety/interoperability wording.

The negative paths are intentional. CI must prove that a blocking conformance gap cannot be averaged away, that a historical `ready` assessment cannot keep publishing as current after suspension, and that clients continue to receive stable rejection semantics.

## Useful commands

```bash
npm run verify:onboarding
npm run assess:pilot
npm run assess:gap
npm run verify:pilot-state
npm run export:public
npm run export:suspended
npm run verify:http
npm run verify:openapi
```

Use the narrower commands while developing a change, but run `npm run verify` before opening or merging a pull request.

Core modules and checks:

- `conformance.js` — deterministic requirement-level evaluation;
- `pilot-check.js` — lifecycle-state invariants;
- `publication.js` — single shared publication guard and public-projection builder;
- `public-export.js` — CLI wrapper around the publication guard;
- `crypto.js` / `crypto-check.js` — signature helpers/checks;
- `server.js` — read-only demonstration Registry/API;
- `http-contract-check.js` — end-to-end Registry/API success, privacy-boundary, header, redirect, and negative-path checks;
- `openapi-contract-check.js` — dependency-free guard against documented API/status-code drift;
- `web/` — consumer verification page.

The CLI and Registry server share the same conformance/publication modules so identical inputs cannot silently receive different machine decisions simply because they use a different interface.

## Run the Registry

```bash
npm run serve
```

Open:

```text
http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001
```

Useful v0.5 endpoints include:

- `/.well-known/trust-life-registry`
- `/v1/federation`
- `/v1/keys`
- `/v1/profiles`
- `/v1/profiles/TL-FRESH-PRODUCE-001`
- `/v1/onboarding`
- `/v1/onboarding/{applicationId}/assessment`
- `/v1/pilots`
- `/v1/pilots/{pilotId}`
- `/v1/public-projection/{subjectId}`
- `/v1/subjects/{subjectId}`
- `/v1/subjects/{subjectId}/assessment`
- `/v1/qr/{subjectId}`
- `/r/{subjectId}` — resolver redirect to the verification/history view

`/v1/public-projection/{subjectId}` is stricter than the resolver. It returns a current public projection only when the subject is in scope, lifecycle is `live`, publication is allowed, and the current assessment is `ready` or `ready-with-advisories`. A suspended pilot should still be able to resolve to a page explaining its status, but its current conformance projection must be blocked.

See `registry/openapi.yaml` for the documented read-only surface. If an endpoint, method, status code, or public contract changes intentionally, update the implementation, OpenAPI description, and contract checks together in the same pull request.

## Public API stability rules

The v0.x API is still a draft, but accidental drift should be treated as a defect. In particular:

- keep the Registry reference API read-only unless the protocol explicitly introduces a reviewed write surface;
- preserve explicit 404/405/409 semantics instead of collapsing expected client errors into 500 responses;
- keep public onboarding responses free of restricted document references and sensitive intake material;
- keep current publication state distinct from resolver/history availability;
- keep evidence/signature validity distinct from claims of truth, safety, legality, or regulatory approval;
- keep Trust & Life synthetic subject identifiers distinct from GS1-assigned identifiers;
- update `registry/openapi.yaml` and both contract checks whenever an intentional public behavior change is made.

## What the evaluator can decide

The reference evaluator can decide declared machine-readable conditions such as scope consistency, T-level minimums, evidence categories, independent-verifier separation, required declarations, and incident blocking policy.

It cannot establish:

- whether physical-world statements are factually true or complete;
- whether an applicant is legally compliant in a jurisdiction;
- whether a verifier/laboratory is professionally qualified beyond represented metadata;
- whether a laboratory method is scientifically/legally suitable;
- whether food is safe;
- whether a production deployment has passed legal/privacy/security review.

## What the publication guard can decide

It can decide whether the current synthetic inputs satisfy the reference operational rule for emitting a public projection. It cannot decide that the operator has lawfully collected data, completed required human review, or safely configured production infrastructure.

Production operators should use `field-pilot/go-live-checklist.md`, `field-pilot/deployment-architecture.md`, `docs/pilot-readiness.md`, and `docs/threat-model.md` before handling real data.

## Security boundary

No private signing keys are committed. Synthetic public keys and signatures exist only to exercise verification behavior. Do not reuse them for production identity or trust decisions.

The public repository must not be used as the private intake or verification workspace for a real participant.
