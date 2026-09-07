# TL-CORE-001 — Verifiable Transparency Core

**Status:** Draft v0.1  
**Category:** Core normative specification  
**Language:** English normative text with Chinese explanatory notes where useful

## 1. Purpose

TL-CORE-001 defines the minimum trust, evidence, transparency, privacy, and review requirements shared by Trust & Life conformance profiles.

This specification does **not** certify that a product is absolutely safe, ethical, sustainable, or legally compliant. Domain profiles define additional requirements for specific sectors.

## 2. Normative language

The terms **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** indicate requirement strength as defined by this project.

## 3. Required entities

A conforming implementation MUST be able to represent:

1. **Subject** — the organization, location, product, batch, shipment, process, or other entity being described.
2. **Claim** — a statement that can be evaluated using evidence.
3. **Requirement** — the normative rule associated with the claim.
4. **Evidence record** — a reference to information relevant to the claim.
5. **Evidence source** — the person, organization, device, service, or system that created or issued the record.
6. **Verification state** — the current review status and method.
7. **Validity scope** — relevant time period, product scope, facility scope, or event scope.
8. **Limitations** — known gaps, exclusions, uncertainty, conflicts, outages, or unresolved incidents.

## 4. Claim requirements

### TL-CORE-001-R001 — Scoped claims

A public trust claim MUST identify its subject and scope sufficiently to prevent a reasonable user from interpreting a narrow finding as an organization-wide guarantee.

### TL-CORE-001-R002 — Evidence linkage

A claim presented above T0 MUST link to the evidence categories required by the applicable profile.

### TL-CORE-001-R003 — No absolute guarantees

Implementations MUST NOT describe conformance, monitoring, or absence of known incidents as proof of absolute safety, absolute integrity, or zero risk.

### TL-CORE-001-R004 — Human-readable explanation

Public trust states SHOULD include a concise explanation understandable without specialist knowledge.

## 5. Evidence requirements

### TL-CORE-001-R010 — Provenance

Each evidence record MUST identify its source or source class and creation time where technically and legally feasible.

### TL-CORE-001-R011 — Integrity metadata

Evidence above T0 SHOULD include an integrity mechanism appropriate to its risk and format, such as a cryptographic digest, signature, signed manifest, trusted timestamp, append-only log, or equivalent control.

### TL-CORE-001-R012 — Integrity is not truth

An implementation MUST distinguish digital integrity from the truth of the underlying physical-world claim. A valid signature or hash MUST NOT by itself elevate self-generated evidence to independent verification.

### TL-CORE-001-R013 — Revision history

Material corrections or replacements of evidence MUST preserve a visible revision or supersession history. Evidence MUST NOT be silently rewritten in a way that changes a trust-sensitive conclusion.

### TL-CORE-001-R014 — Coverage disclosure

If a claim relies on recurring or continuous evidence, the implementation MUST expose material gaps, outages, exclusions, or coverage statistics relevant to interpreting that claim.

### TL-CORE-001-R015 — Retention status

Evidence whose raw content is no longer retained SHOULD preserve sufficient metadata to explain the historical trust decision, unless applicable law or safety requirements prohibit doing so.

## 6. Transparency and privacy requirements

### TL-CORE-001-R020 — Purpose limitation

Monitoring MUST be tied to a defined requirement or trust purpose.

### TL-CORE-001-R021 — Process over person

Implementations MUST prefer process observability over unnecessary identification or continuous observation of individual workers.

### TL-CORE-001-R022 — Prohibited private-area monitoring

A Trust & Life profile MUST NOT require cameras or equivalent monitoring in toilets, changing rooms, rest or sleeping areas, or other spaces where people reasonably expect privacy.

### TL-CORE-001-R023 — Data minimization

Only data reasonably necessary for the stated trust purpose SHOULD be collected, processed, or published.

### TL-CORE-001-R024 — Public disclosure boundary

Conformance MUST NOT require publication of unrelated personal data, security-sensitive facility information, trade secrets, confidential contractual terms, or other information not necessary to support the defined trust claim.

### TL-CORE-001-R025 — Monitoring notice

Where people are materially affected by monitoring, the implementing organization SHOULD provide clear notice describing purpose, data categories, access, public visibility, retention, and complaint channels, subject to applicable law.

## 7. Conformance levels

### T0 — Declared

The subject provides a structured self-declaration. The implementation MAY verify identity and submission provenance. The substantive claim is not necessarily evidence-backed.

### T1 — Evidence-backed

The applicable profile's required evidence set is linked to the claim. Provenance and evidence status are available.

### T2 — Continuously Observable

Defined processes have recurring or continuous observational evidence. Coverage and material gaps MUST be disclosed.

### T3 — Independently Verified

Defined claims or evidence have been reviewed or attested by a qualified independent party using a documented method. The verifier, scope, date, validity status, and material limitations MUST be visible.

### TL-CORE-001-R030 — Granular levels

Conformance levels SHOULD be assigned per claim, requirement group, product scope, facility, or profile rather than as a single permanent organization-wide trust score.

### TL-CORE-001-R031 — No automatic inheritance

A high conformance level for one process MUST NOT automatically transfer to unrelated processes.

## 8. Independent verification

### TL-CORE-001-R040 — Verifier identity

T3 evidence MUST identify the verifying organization or verifier identity class.

### TL-CORE-001-R041 — Method and scope

T3 evidence MUST state the scope of review and SHOULD identify the method, referenced requirement, or inspection basis.

### TL-CORE-001-R042 — Validity

Where findings expire, can be revoked, or depend on periodic reassessment, their current status MUST be representable.

### TL-CORE-001-R043 — Conflict disclosure

Material conflicts of interest that could reasonably affect interpretation SHOULD be disclosed.

## 9. Public review and incident handling

### TL-CORE-001-R050 — Structured reporting

A public-review mechanism SHOULD allow users to submit an evidence-backed report tied to a subject, event, claim, or requirement.

### TL-CORE-001-R051 — No accusation-as-verdict

An unverified report MUST NOT be displayed as a verified violation.

### TL-CORE-001-R052 — Response opportunity

Before a disputed report becomes a final adverse public trust decision, the affected organization SHOULD receive a reasonable opportunity to respond, except where immediate safety or legal constraints require a different procedure.

### TL-CORE-001-R053 — Appeal

Trust-sensitive adverse decisions SHOULD provide a documented appeal or secondary-review path.

### TL-CORE-001-R054 — Incident states

Implementations SHOULD distinguish at least: reported, under review, verified, disputed, corrective action in progress, resolved, withdrawn, and evidence insufficient.

### TL-CORE-001-R055 — Incentive design

Public contribution rewards MUST NOT be based solely on making accusations. If rewards exist, they SHOULD depend on verified useful contributions and SHOULD be designed to discourage harassment, duplication, and trivial reporting.

## 10. Interoperability

### TL-CORE-001-R060 — Reuse before reinvention

Profiles SHOULD reuse established identifiers, event models, credential formats, and measurement vocabularies where they fit the use case.

### TL-CORE-001-R061 — Supply-chain event compatibility

Implementations SHOULD support mapping to GS1 EPCIS/CBV for relevant supply-chain visibility events where feasible.

### TL-CORE-001-R062 — Verifiable attestations

Implementations MAY use W3C Verifiable Credentials or another interoperable signed-credential mechanism for inspection, laboratory, organizational, or other attestations.

### TL-CORE-001-R063 — Technology neutrality

No conformance level MUST require blockchain technology. Distributed ledgers MAY be used as one integrity or timestamping mechanism among alternatives.

## 11. Economic accessibility

### TL-CORE-001-R070 — Proportionate compliance

Profiles SHOULD distinguish essential requirements from high-cost optional evidence mechanisms so that small producers and small businesses are not excluded merely because they cannot deploy enterprise-scale technology.

### TL-CORE-001-R071 — Equivalent evidence

Where a requirement can be demonstrated reliably by multiple methods, profiles SHOULD allow functionally equivalent evidence rather than mandating a proprietary vendor or device.

## 12. Conformance statement

An implementation claiming conformance with TL-CORE-001 MUST publish:

- implemented version;
- supported requirement set;
- supported T-levels;
- known deviations;
- privacy model;
- evidence retention policy summary;
- incident and appeal mechanism or a statement that those functions are not yet implemented.

## 13. Non-normative implementation direction

Potential building blocks include:

- GS1 EPCIS / CBV for event semantics;
- GS1 Digital Link for resolvable product or object identifiers;
- W3C Verifiable Credentials for machine-verifiable attestations;
- standard cryptographic digests and signatures for integrity;
- privacy-preserving public evidence views;
- open APIs and JSON Schema for portable implementation.

Use of these technologies does not imply endorsement of Trust & Life by their respective standards organizations.
