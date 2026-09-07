# Trust & Life Protocol

**信·生开放互信协议**  
**An Open Protocol for Verifiable Commerce**

> **See reality. Verify trust.**  
> **看见真实，验证信任。**

Trust & Life is an open protocol for making commercial and supply-chain claims more inspectable, portable, contestable, and independently verifiable.

信·生不是要求公众“相信平台”，而是尝试减少必须无条件信任任何单一机构的地方：标准公开、范围明确、证据可检查、来源可验证、缺口可见、决定可解释、错误可纠正、争议可申诉。

## Core model / 核心模型

**Scope → Requirement → Claim → Evidence → Integrity → Signature / Status → Finding → Conformance**

The protocol keeps different epistemic and operational questions separate:

- **Scope** — exactly which organization, facility, product, batch, shipment, process, and period are being discussed?
- **Requirement** — which public rule applies, and which version?
- **Evidence** — what information supports the claim, and what is missing?
- **Integrity** — do retrieved bytes match the recorded digest?
- **Authenticity** — did a holder of the declared key sign the stated payload?
- **Authority / independence** — is the signer/verifier appropriate and sufficiently independent for the role?
- **Finding** — did this particular requirement pass, have a gap, become blocked, or require qualified review?
- **Conformance** — what does the set of requirement-level findings justify for the declared scope?
- **Truth / safety / legality** — separate real-world questions that cannot be inferred merely from hashes, signatures, or a platform badge.

A valid hash, signature, credential, or Trust & Life `ready` state is **not** an absolute food-safety guarantee or regulatory approval.

## Evidence-strength levels

| Level | Meaning |
| --- | --- |
| **T0 — Declared** | Self-declared information. |
| **T1 — Evidence-backed** | Required evidence is linked to the claim. |
| **T2 — Continuously Observable** | Defined processes have recurring/continuous observational evidence with visible scope and gaps. |
| **T3 — Independently Verified** | A defined claim has an independent qualified verification or attestation. |

T-levels are granular evidence states, not permanent organization-wide trust scores.

## v0.4 — Pilot Onboarding & Explainable Conformance

v0.4 connects the existing evidence, cryptographic, and federation layers to a reproducible participant-onboarding loop:

**Applicant → Scoped Application → Versioned Profile → Claims / Evidence → Deterministic Evaluator → Requirement Findings → Ready / Not-ready → Public Resolver / QR View**

### Included in v0.4

- `TL-ONBOARD-001` — transparent participant onboarding rules;
- `TL-CONF-001` — explainable conformance-assessment rules;
- a machine-readable `TL-FRESH-PRODUCE-001` **pilot transparency baseline**;
- schemas for onboarding applications, requirement profiles, assessments, corrective actions, and appeals;
- explicit public vs verifier-only data boundaries;
- deterministic requirement-level findings: `pass`, `gap`, `blocked`, `not-applicable`, `manual-review`;
- blocking requirements that cannot be averaged away by unrelated strengths;
- facility ownership/scope consistency checks;
- T-level, evidence-category, and independent-verifier rules;
- unresolved serious-incident blocking policy;
- privacy, correction, and appeal declarations as blocking pilot requirements;
- a synthetic positive onboarding fixture that MUST evaluate to `ready`;
- a synthetic negative fixture that MUST evaluate to `not-ready`;
- a read-only Registry API exposing profiles, onboarding records, assessments, evidence, signatures, status, and federation sources;
- `/r/{subjectId}` as a portable Trust & Life demo resolver for QR targets;
- a consumer page showing requirement-level findings rather than only a badge;
- `docs/threat-model.md`, `docs/pilot-readiness.md`, `docs/conformance-governance.md`, and `SECURITY.md`;
- CI covering both positive and negative conformance behavior plus all public reference API routes.

The fresh-produce profile is intentionally a **pilot transparency/evidence baseline**, not a complete fresh-produce food-safety standard.

## Cryptographic and federation layer

v0.3 capabilities remain part of the v0.4 reference implementation:

- actual SHA-256 verification of local evidence bytes;
- Ed25519 public keys as JWK;
- EdDSA/JWS signatures for evidence manifests and synthetic credential fixtures;
- signed credential status;
- key lifecycle fields;
- signed primary and peer Registry descriptors using distinct keys;
- source-preserving federation where disagreements are exposed rather than silently collapsed.

No private signing keys are stored in this repository.

## Machine-readable profiles

Normative standards explain **what should be true**. Machine-readable profiles under [`profiles/`](profiles/) state **which parts the reference evaluator can test and how**.

A profile distinguishes blocking, advisory, and conditional requirements. A machine evaluator MUST NOT fabricate a pass for a requirement explicitly reserved for qualified manual review.

The reference project rejects the idea that heterogeneous dimensions should be collapsed into one universal trust or moral score.

## Run the complete synthetic pilot

```bash
cd reference-implementation
npm run verify
npm run serve
```

Then open:

```text
http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001
```

`npm run verify` checks evidence bytes, signatures, credential status, federation descriptors, onboarding structure, a passing pilot, and a deliberate blocking-gap case.

See [`reference-implementation/README.md`](reference-implementation/README.md) and [`registry/openapi.yaml`](registry/openapi.yaml).

## Physical labels and resolvers

The reference implementation exposes a Trust & Life resolver path:

```text
/r/{subjectId}
```

This is **not** a GS1 Digital Link identifier. When a real product legitimately uses properly assigned GS1 identification keys, a deployment may use a GS1-conformant resolver and link from that identifier to a Trust & Life verification resource.

Trust & Life MUST NOT invent plausible-looking GTINs/GLNs/SSCCs or imply that synthetic identifiers were assigned by GS1. See [`interoperability/digital-link.md`](interoperability/digital-link.md).

## Interoperability direction

The project prefers stable external standards where practical:

- GS1 EPCIS / CBV for interoperable supply-chain visibility events and sensor/event semantics;
- GS1 Digital Link for resolver integration when legitimate GS1 identifiers are available;
- W3C Verifiable Credentials Data Model 2.0 for portable credential payloads;
- JOSE/JWS with Ed25519/EdDSA for the dependency-free cryptographic fixture;
- W3C Verifiable Credential Data Integrity / EdDSA cryptosuites as compatible securing directions;
- W3C Controlled Identifiers for richer controller/key publication;
- W3C Bitstring Status List as the preferred interoperable credential-status direction.

External standards retain their own assignment, conformance, copyright, and trademark rules. Mapping to them does not imply endorsement or certification by their standards bodies.

## Process transparency, not human surveillance

Trust & Life transparency is aimed at relevant production, storage, transport, inspection, and custody processes—not at maximizing observation of workers.

Profiles and onboarding rules therefore emphasize:

- purpose limitation;
- process zones over person tracking;
- data minimization;
- prohibited private-area monitoring;
- public/restricted information separation;
- equivalent evidence instead of mandatory proprietary camera/sensor vendors;
- visible observation gaps rather than false continuity.

See [`docs/privacy-principles.md`](docs/privacy-principles.md) and [`docs/threat-model.md`](docs/threat-model.md).

## Governance and commercial neutrality

Standards steward, applicant, Registry operator, evaluator, qualified verifier, appeals reviewer, and marketplace are distinct roles even when a small pilot cannot assign each role to a separate legal entity.

At minimum:

- T3 verification must be independent of the responsible organization for the evaluated subject;
- payment, advertising, sponsorship, marketplace commission, or optional consulting MUST NOT change machine-checkable conformance findings;
- old assessments are superseded by new assessments rather than silently rewritten;
- material conflicts should be disclosed;
- adverse findings should have correction and appeal paths.

See [`GOVERNANCE.md`](GOVERNANCE.md) and [`docs/conformance-governance.md`](docs/conformance-governance.md).

## Before a real organization goes live

Passing the synthetic CI suite is **not** enough to launch a real food pilot.

A production pilot still requires, for its actual jurisdiction and data flows:

- applicable legal/regulatory review;
- applicant authority and real facility/scope verification;
- food-safety controls required independently of Trust & Life;
- privacy/worker-monitoring review;
- qualified verifier/laboratory review and conflict assessment;
- secure production key management;
- secure evidence ingestion and restricted-data storage;
- incident, suspension, correction, and appeal operations;
- deployment/security testing and operational monitoring;
- public wording/label review;
- rollback and failure-mode exercises.

The complete pre-publication gate is in [`docs/pilot-readiness.md`](docs/pilot-readiness.md).

## Repository map

```text
standards/                   normative protocol, onboarding and conformance rules
profiles/                    machine-readable pilot requirement profiles
schemas/                     portable trust/onboarding/assessment data models
interoperability/            EPCIS, VC, cryptography, federation and resolver mappings
onboarding/                  participant-onboarding workflow documentation
examples/apple-supply-chain/ synthetic evidence, signatures and positive/negative applications
registry/                    read-only Registry API, status and federation fixtures
reference-implementation/    verifiers, evaluator, Registry server and consumer UI
docs/                        philosophy, privacy, governance, threat model and pilot readiness
marketplace/                 optional commerce-layer boundary
```

## Non-goals

Trust & Life is not:

- a legal certification authority;
- a government regulator;
- a universal trust score;
- a mandatory blockchain;
- a surveillance system;
- a pay-to-pass badge program;
- a guarantee that a product is absolutely safe;
- a substitute for domain-specific law, professional inspection, laboratory standards, or food-safety management systems.

**Status: v0.4 draft pilot reference implementation.** All example organizations, facilities, products, credentials, applications, assessments, and Registry endpoints are synthetic.

## License

Original code and project documentation are released under the repository license. Third-party standards, identifiers, trademarks, reports, and evidence remain subject to their own terms.
