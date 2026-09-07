# Registry, Federation, Onboarding, Lifecycle and Assessment

Trust & Life does not require one central Registry. A Registry is an index and publication service for scoped evidence/trust records; it is not the ultimate source of truth and it does not acquire special authority merely by operating the API.

## Discovery and federation

A Registry SHOULD expose:

`/.well-known/trust-life-registry`

The signed descriptor identifies the Registry operator, supported formats/profiles, public signing keys, peer discovery information, update time, and source identity.

Peers are independent sources. A Registry MUST NOT silently relabel a peer record as local data. When peers disagree, implementations should expose source, signatures, validity/status, and the conflict itself rather than silently choosing a winner.

The reference API exposes `/v1/federation` to demonstrate this source-preserving model.

## Public keys and credential status

The demo publishes public keys and a small signed credential-status fixture so revocation/status behavior can be tested without additional dependencies. The custom fixture is not presented as W3C Bitstring Status List conformance. Production interoperability should prefer standardized credential-status mechanisms where appropriate.

## Profiles and onboarding

The Registry exposes the exact pilot profile used by the evaluator and a **public-safe** onboarding view.

Public onboarding data may include applicant organization, facility/subject scope, selected profile/version, requirement responses, public claim/evidence IDs, relevant declarations, public correction/appeal channels, and current explainable assessment.

A public Registry MUST NOT expose verifier-only document bodies merely because they were used during onboarding. Restricted documents should remain outside the public API except for safe metadata where necessary.

## Explainable assessment

The reference Registry exposes requirement-level assessment results rather than only a badge or aggregate percentage.

A consumer or another Registry should be able to inspect which requirement was evaluated, its finding state, which claims/evidence/verifications formed the basis, which blocking gaps prevent readiness, and which profile/evaluator version produced the decision.

The same deterministic evaluator is used by CLI and Registry API.

## v0.5 lifecycle and guarded publication

Assessment state and current publication state are separate.

The demo exposes:

- `/v1/pilots` — lifecycle summaries;
- `/v1/pilots/{pilotId}` — current pilot state;
- `/v1/public-projection/{subjectId}` — the current public Registry projection only when allowed.

The public-projection endpoint is gated by the shared publication module. It returns the current projection only when:

- the requested subject is inside the application scope;
- pilot/application/profile identifiers match;
- lifecycle state is `live`;
- `publicProjectionAllowed` is true;
- the current deterministic assessment is `ready` or `ready-with-advisories`;
- the lifecycle's recorded assessment decision agrees with the evaluator result.

If these conditions are not met, a Registry should expose an appropriate blocked/suspended state rather than silently serving the last green result as current.

## Resolver versus public projection

`/r/{subjectId}` is a Trust & Life demonstration resolver path that redirects to the consumer verification/history view. It is **not** itself a GS1 Digital Link identifier.

A resolver may remain reachable after suspension or withdrawal so a user scanning an existing physical label can see the current status and historical context. This does **not** mean the current conformance projection remains publishable. The stricter `/v1/public-projection/{subjectId}` endpoint models that distinction.

A QR code is an encoding surface, not a central trust authority. Deployments should preserve durable subject/evidence identity even if storefront or Registry provider changes.

## Commercial neutrality

Marketplace ranking, advertising, commissions, sponsorships, preferred hardware, or partnerships MUST NOT alter the meaning of protocol conformance or publication eligibility. The same machine-checkable inputs/profile/version/lifecycle state should produce the same automated result regardless of commercial relationship.

## Production boundary

The reference Registry is read-only and synthetic. A production onboarding/Registry service would additionally require authentication/authorization, secure evidence ingestion, restricted-data storage, abuse controls, audit logs, legal/privacy review, operational incident handling, production key management, deployment hardening, backups, observability, and a reliable emergency-suspension path.

The public repository should not be used as a production intake store. See `field-pilot/deployment-architecture.md` and `field-pilot/go-live-checklist.md`.

Passing the synthetic CI suite is not a production security certification, regulatory approval, or food-safety certification.
