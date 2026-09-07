# Trust & Life Protocol

**信·生开放互信协议**  
**An Open Protocol for Verifiable Commerce**

> **See reality. Verify trust.**  
> **看见真实，验证信任。**

Trust & Life is an open protocol for making commercial and supply-chain claims more inspectable, portable, and independently verifiable.

信·生不是要求公众“相信平台”，而是尝试减少必须无条件信任任何单一机构的地方。

## Core model / 核心模型

**Claim → Evidence → Integrity → Signature → Status → Verification → Trust**

A protocol implementation MUST keep the following concepts separate:

- **Integrity** — retrieved bytes match a recorded digest.
- **Authenticity** — a holder of a declared signing key signed a defined payload.
- **Authority** — the signer is recognized as appropriate for the role or claim.
- **Truth / compliance** — the underlying statement is factually correct and satisfies applicable rules.

A valid hash or signature is not a food-safety guarantee.

## Evidence-strength levels

| Level | Meaning |
| --- | --- |
| **T0 — Declared** | Self-declared information. |
| **T1 — Evidence-backed** | Required evidence is linked to the claim. |
| **T2 — Continuously Observable** | Defined processes have recurring/continuous observational evidence with visible scope and gaps. |
| **T3 — Independently Verified** | A defined claim has an independent qualified verification or attestation. |

Overall conformance is not allowed to silently exceed the weakest included claim unless a domain profile explicitly defines another aggregation rule.

## v0.3 — Cryptographic Trust & Federation

v0.3 adds the first portable cryptographic/federation loop:

**Organization → Subject → Evidence bytes → Signed manifest → Signed credential → Signed status → Registry → Peer Registry**

Included:

- real SHA-256 evidence verification;
- Ed25519 public keys represented as JWK;
- compact JWS signatures using `EdDSA`;
- a producer-signed evidence manifest;
- a W3C VC Data Model 2.0 laboratory-attestation payload secured by a detached JWS fixture;
- a signed credential-status record;
- signed primary and secondary Registry descriptors using distinct keys;
- source-preserving federation discovery;
- key lifecycle fields for active, retired, and revoked keys;
- CI that verifies hashes, signatures, status, and Registry API endpoints;
- a consumer QR-target page that displays integrity and signature states separately.

No private signing keys are stored in this repository.

## Run

```bash
cd reference-implementation
npm run verify
npm run serve
```

Then open:

```text
http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001
```

## Federation principle

Trust & Life does not define a single root Registry. Independent registries may publish signed descriptors and discover peers. Peer records retain their source identity. If registries disagree, an implementation should expose the disagreement rather than silently choosing a winner.

See [`interoperability/crypto-federation.md`](interoperability/crypto-federation.md) and [`registry/README.md`](registry/README.md).

## Standards direction

The project currently targets stable standards where practical:

- GS1 EPCIS 2.0.1 / CBV 2.0.0 for supply-chain visibility events;
- W3C Verifiable Credentials Data Model 2.0 for portable credentials;
- JOSE/JWS with Ed25519/EdDSA for the v0.3 dependency-free signature fixture;
- W3C Verifiable Credential Data Integrity 1.0 and EdDSA Cryptosuites 1.0 as compatible future securing profiles;
- W3C Controlled Identifiers 1.0 for richer controller/key publication;
- W3C Bitstring Status List 1.0 as the preferred interoperable credential-status direction.

References do not imply endorsement or certification by GS1, W3C, ISO, regulators, laboratories, or other standards bodies.

## Repository map

```text
standards/                  normative Trust & Life requirements
schemas/                    machine-readable data models
interoperability/           EPCIS, VC, crypto and federation mappings
examples/apple-supply-chain synthetic v0.3 evidence and signatures
registry/                   discovery, status and federation fixtures
reference-implementation/   verifier, crypto checker, Registry API and web UI
marketplace/                optional commerce-layer boundary
```

## Non-goals

Trust & Life is not a legal certification authority, a universal trust score, a mandatory blockchain, a surveillance system, or a guarantee that a product is absolutely safe.

**Status: v0.3 draft reference implementation.** All example organizations, products, credentials and Registry endpoints are synthetic.

## License

Original code and project documentation are released under the repository license. Third-party standards and trademarks remain subject to their own terms.
