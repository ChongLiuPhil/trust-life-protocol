# Registry, Federation, Onboarding and Assessment

Trust & Life does not require one central Registry. A Registry is an index and publication service for scoped evidence/trust records; it is not the ultimate source of truth and it does not acquire special authority merely by operating the API.

## Discovery and federation

A Registry SHOULD expose:

`/.well-known/trust-life-registry`

The signed descriptor identifies the Registry operator, supported formats/profiles, public signing keys, peer discovery information, update time, and source identity.

Peers are independent sources. A Registry MUST NOT silently relabel a peer record as local data. When peers disagree, implementations should expose source, signatures, validity/status, and the conflict itself rather than silently choosing a winner.

The reference API exposes `/v1/federation` to demonstrate this source-preserving model.

## Public keys and credential status

The v0.3/v0.4 demo publishes public keys and a small signed credential-status fixture so revocation/status behavior can be tested without additional dependencies. The custom fixture is not presented as W3C Bitstring Status List conformance. Production interoperability should prefer standardized credential-status mechanisms such as W3C Bitstring Status List 1.0 where appropriate.

## v0.4 profiles and onboarding

The Registry now exposes the exact pilot profile used by the evaluator and a **public-safe** onboarding view.

Public onboarding data may include:

- applicant organization;
- facility/subject scope;
- selected profile/version;
- requirement responses and public claim/evidence IDs;
- declarations relevant to privacy, correction, appeal, and portable resolution;
- current explainable assessment.

A public Registry MUST NOT expose verifier-only document bodies merely because they were used during onboarding. Restricted documents should remain outside the public API except for safe metadata where necessary.

## Explainable assessment

The reference Registry exposes requirement-level assessment results rather than only a badge or aggregate percentage.

A consumer or another Registry should be able to inspect:

- which requirement was evaluated;
- whether it passed, had a gap, was blocked, or required manual review;
- which claims/evidence/verifications formed the basis;
- which blocking gaps prevent a ready state;
- which profile/evaluator version produced the decision.

The same deterministic evaluator is used by CLI and Registry API.

## QR resolver

`/r/{subjectId}` is a Trust & Life demonstration resolver path that redirects to the consumer verification view. It is **not** itself a GS1 Digital Link identifier. See `interoperability/digital-link.md`.

A QR code is an encoding surface, not a central trust authority. Deployments should preserve durable subject/evidence identity even if storefront or Registry provider changes.

## Commercial neutrality

Marketplace ranking, advertising, commissions, sponsorships, preferred hardware, or partnerships MUST NOT alter the meaning of protocol conformance. The same machine-checkable inputs/profile/version should produce the same automated findings regardless of commercial relationship.

## Production boundary

The reference Registry is read-only and synthetic. A production onboarding service would additionally require authentication/authorization, secure evidence ingestion, restricted-data storage, abuse controls, audit logs, legal/privacy review, operational incident handling, production key management, and deployment hardening. Passing the synthetic CI suite is not a production security certification.
