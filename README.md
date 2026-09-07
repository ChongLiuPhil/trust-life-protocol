# Trust & Life Protocol

**信·生开放互信协议**  
**An Open Protocol for Verifiable Commerce**

> **See reality. Verify trust.**  
> **看见真实，验证信任。**

Trust & Life is an open protocol for making commercial and supply-chain claims more inspectable, portable, contestable, and independently verifiable.

信·生不是要求公众“相信平台”，而是尝试减少必须无条件信任任何单一机构的地方：标准公开、范围明确、证据可检查、来源可验证、缺口可见、决定可解释、错误可纠正、争议可申诉、暂停可见。

## Core model / 核心模型

**Scope → Requirement → Claim → Evidence → Integrity → Signature / Status → Finding → Conformance → Lifecycle → Public Projection**

The protocol keeps different questions separate:

- **Scope** — exactly which organization, facility, product, batch, shipment, process, and period are being discussed?
- **Requirement** — which public rule applies, and which version?
- **Evidence** — what information supports the claim, and what is missing?
- **Integrity** — do retrieved bytes match the recorded digest?
- **Authenticity** — did a holder of the declared key sign the stated payload?
- **Authority / independence** — is the signer/verifier appropriate and sufficiently independent for the role?
- **Finding** — did this particular requirement pass, have a gap, become blocked, or require qualified review?
- **Conformance** — what does the set of requirement-level findings justify for the declared scope?
- **Lifecycle** — is the pilot currently intake, review, live, suspended, withdrawn, or completed?
- **Public projection** — is the current result allowed to be presented publicly now?
- **Truth / safety / legality** — separate real-world questions that cannot be inferred merely from hashes, signatures, or a platform badge.

A valid hash, signature, credential, `ready` assessment, or `live` lifecycle state is **not** an absolute food-safety guarantee or regulatory approval.

## Evidence-strength levels

| Level | Meaning |
| --- | --- |
| **T0 — Declared** | Self-declared information. |
| **T1 — Evidence-backed** | Required evidence is linked to the claim. |
| **T2 — Continuously Observable** | Defined processes have recurring/continuous observational evidence with visible scope and gaps. |
| **T3 — Independently Verified** | A defined claim has an independent qualified verification or attestation. |

T-levels are granular evidence states, not permanent organization-wide trust scores.

## v0.5 — Field Pilot Operations & Guarded Publication

v0.5 does not pretend the synthetic repository has become a real certification service. It adds the operational controls needed to hand the project to a bounded real-world pilot team without putting real sensitive participant data in the public repository.

The operational loop is:

**Private Intake → Data Classification → Scope Review → Evidence Mapping → Automated Preflight → Human Review → Approved → Live → Monitoring → Correction / Suspension / Appeal → Superseding Assessment / Completion**

### Included in v0.5

- `field-pilot/` operating kit for a deployment-local real pilot;
- machine-readable lifecycle states including `live`, `suspended`, `withdrawn`, and `completed`;
- lifecycle validation that forbids a `live` state without a current `ready` / `ready-with-advisories` assessment;
- a negative suspension fixture proving that historical evidence cannot silently keep a current public result live;
- a centralized **publication guard** shared by CLI and Registry API;
- guarded public projection export that requires exact application/profile/lifecycle alignment;
- `/v1/pilots` and `/v1/pilots/{pilotId}` lifecycle endpoints;
- `/v1/public-projection/{subjectId}` which returns the current public projection only when lifecycle and conformance rules allow it;
- consumer UI that displays assessment state separately from lifecycle/publication state;
- data-inventory and evidence-register templates with public/restricted boundaries;
- go-live, operator, incident/suspension/correction/appeal runbooks;
- deployment-zone guidance separating private intake, verifier workspace, public Registry projection, and audit history;
- participant-facing handbook explaining scope, privacy, monitoring, correction, appeal, withdrawal, and commercial neutrality;
- a pilot-plan template with success metrics, stop/suspend conditions, and exit criteria;
- a privacy-safe GitHub field-pilot-interest form that explicitly forbids sensitive onboarding material;
- CI that verifies both **publication allowed** and **publication blocked** paths.

### Publication invariant

The reference implementation enforces the following operational rule:

```text
current public projection allowed
  only if
pilot.state == live
AND pilot.publicProjectionAllowed == true
AND current deterministic assessment ∈ {ready, ready-with-advisories}
AND pilot/application/profile identities match exactly
```

A resolver may remain reachable after suspension so users can see that status, but a suspended or withdrawn pilot must not continue exposing a current `ready` public projection.

## v0.4 — Pilot Onboarding & Explainable Conformance

v0.4 established the reproducible participant-onboarding and requirement-level assessment layer:

**Applicant → Scoped Application → Versioned Profile → Claims / Evidence → Deterministic Evaluator → Requirement Findings → Ready / Not-ready**

It includes `TL-ONBOARD-001`, `TL-CONF-001`, the machine-readable `TL-FRESH-PRODUCE-001` pilot transparency baseline, positive/negative onboarding fixtures, correction/appeal objects, and a read-only Registry/consumer verification view.

The fresh-produce profile is intentionally a **pilot transparency/evidence baseline**, not a complete fresh-produce food-safety standard.

## Cryptographic and federation layer

Earlier capabilities remain part of v0.5:

- actual SHA-256 verification of local evidence bytes;
- Ed25519 public keys as JWK;
- EdDSA/JWS signatures for evidence manifests and synthetic credential fixtures;
- signed credential status;
- key lifecycle fields;
- signed primary and peer Registry descriptors using distinct keys;
- source-preserving federation where disagreements are exposed rather than silently collapsed.

No private signing keys are stored in this repository.

## Machine-readable profiles and deterministic findings

Normative standards explain **what should be true**. Machine-readable profiles under [`profiles/`](profiles/) state **which parts the reference evaluator can test and how**.

A profile distinguishes blocking, advisory, and conditional requirements. A machine evaluator MUST NOT fabricate a pass for a requirement explicitly reserved for qualified manual review. Blocking failures cannot be averaged away by unrelated strengths.

The project rejects the idea that heterogeneous dimensions should be collapsed into one universal trust or moral score.

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

`npm run verify` now checks:

1. evidence bytes and cross-object trust semantics;
2. signatures and credential status;
3. Registry federation descriptors;
4. onboarding structure;
5. a positive `ready` conformance path;
6. a deliberate `not-ready` path;
7. valid `live` and `suspended` lifecycle fixtures;
8. a live public export that MUST be allowed;
9. a suspended public export that MUST be blocked.

See [`reference-implementation/README.md`](reference-implementation/README.md), [`field-pilot/README.md`](field-pilot/README.md), and [`registry/openapi.yaml`](registry/openapi.yaml).

## Real field-pilot boundary

The public GitHub repository is the protocol/reference implementation, **not a production data room**.

A real deployment should separate at least:

1. **private intake** — real legal identity, authorizations, private contacts, restricted documents;
2. **verification workspace** — evidence and reviewer material needed for assessment;
3. **public Registry projection** — minimum scoped public findings/evidence metadata/status;
4. **operational/audit history** — lifecycle transitions, corrections, suspensions, appeals, supersessions, and key events.

Never post real credentials, worker data, private facility details, secret URLs, API keys, private signing keys, or confidential laboratory/contract material to a public GitHub issue merely to join a pilot.

See [`field-pilot/deployment-architecture.md`](field-pilot/deployment-architecture.md) and [`SECURITY.md`](SECURITY.md).

## Physical labels and resolvers

The reference implementation exposes a Trust & Life resolver path:

```text
/r/{subjectId}
```

This is **not** a GS1 Digital Link identifier. When a real product legitimately uses properly assigned GS1 identification keys, a deployment may use a GS1-conformant resolver and link from that identifier to a Trust & Life verification resource.

Trust & Life MUST NOT invent plausible-looking GTINs/GLNs/SSCCs or imply that synthetic identifiers were assigned by GS1. See [`interoperability/digital-link.md`](interoperability/digital-link.md).

## Interoperability direction

The project prefers established external standards where practical:

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

Profiles and onboarding rules emphasize purpose limitation, process zones over person tracking, data minimization, prohibited private-area monitoring, public/restricted information separation, equivalent evidence instead of mandatory proprietary camera/sensor vendors, and visible gaps rather than false continuity.

See [`docs/privacy-principles.md`](docs/privacy-principles.md), [`docs/threat-model.md`](docs/threat-model.md), and [`field-pilot/participant-handbook.md`](field-pilot/participant-handbook.md).

## Governance and commercial neutrality

Standards steward, applicant, Registry operator, evaluator, qualified verifier, appeals reviewer, marketplace, and security/suspension operator are distinct roles even when a small pilot cannot assign each role to a separate legal entity.

At minimum:

- T3 verification must be independent of the responsible organization for the evaluated subject;
- payment, advertising, sponsorship, marketplace commission, or optional consulting MUST NOT change machine-checkable conformance findings;
- old assessments are superseded by new assessments rather than silently rewritten;
- material conflicts should be disclosed;
- adverse findings should have correction and appeal paths;
- suspension must remain available when continuing a public live claim could materially mislead users.

See [`GOVERNANCE.md`](GOVERNANCE.md), [`docs/conformance-governance.md`](docs/conformance-governance.md), and [`field-pilot/incident-runbook.md`](field-pilot/incident-runbook.md).

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
- rollback and failure-mode exercises;
- predefined pilot success metrics, stop conditions, and exit criteria.

Use [`docs/pilot-readiness.md`](docs/pilot-readiness.md), [`field-pilot/go-live-checklist.md`](field-pilot/go-live-checklist.md), and [`field-pilot/pilot-plan.template.md`](field-pilot/pilot-plan.template.md) before any real public launch.

## Repository map

```text
standards/                   normative protocol, onboarding and conformance rules
profiles/                    machine-readable pilot requirement profiles
schemas/                     portable trust/onboarding/assessment data models
interoperability/            EPCIS, VC, cryptography, federation and resolver mappings
onboarding/                  participant-onboarding workflow documentation
field-pilot/                 deployment-local pilot kit, lifecycle, runbooks and templates
examples/apple-supply-chain/ synthetic evidence, signatures and positive/negative applications
registry/                    read-only Registry API, status, lifecycle and federation fixtures
reference-implementation/    verifiers, evaluator, publication guard, Registry server and consumer UI
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
- a public repository for real sensitive participant data;
- a substitute for domain-specific law, professional inspection, laboratory standards, or food-safety management systems.

**Status: v0.5 draft field-pilot reference implementation.** All organizations, facilities, products, credentials, applications, assessments, lifecycle states, and Registry endpoints committed to this repository are synthetic.

## License

Original code and project documentation are released under the repository license. Third-party standards, identifiers, trademarks, reports, and evidence remain subject to their own terms.
