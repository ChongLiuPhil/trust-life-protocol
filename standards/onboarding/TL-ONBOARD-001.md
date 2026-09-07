# TL-ONBOARD-001 — Transparent Participant Onboarding

**Status:** Draft v0.4  
**Depends on:** TL-CORE-001  
**Purpose:** Define how an organization enters a Trust & Life implementation without turning admission into opaque platform discretion.

## 1. Principle

Onboarding is a scoped evidence-registration process, not a permanent endorsement of an organization.

An implementation MUST distinguish:

- organization identity;
- facility and operational scope;
- product/batch/service scope;
- profile/version requested;
- applicant declarations;
- evidence and claim mappings;
- evaluator findings;
- independent verification, where required;
- publication decision;
- corrections, suspension, withdrawal, and appeal.

## 2. Application identity

### TL-ONBOARD-001-R001 — Stable application identifier

Each application MUST have a stable identifier and submission timestamp.

### TL-ONBOARD-001-R002 — Applicant identity

The applicant MUST map to a stable organization identifier. An implementation SHOULD verify that the submitter is authorized to act for the organization before publishing an approved result.

### TL-ONBOARD-001-R003 — No identity overclaim

Identity verification establishes who submitted the application. It MUST NOT be presented as evidence that substantive operational claims are true.

## 3. Scope declaration

### TL-ONBOARD-001-R010 — Explicit facilities

The application MUST identify the facilities, production areas, service locations, or equivalent operational scope included in the request.

### TL-ONBOARD-001-R011 — Explicit covered subjects

Products, batches, shipments, processes, or services included in the request MUST be explicitly identified where the applicable profile supports such granularity.

### TL-ONBOARD-001-R012 — No silent scope expansion

Approval for one facility, product, batch, process, or period MUST NOT silently expand to other facilities, products, batches, processes, or periods.

## 4. Requirement responses

### TL-ONBOARD-001-R020 — Profile selection

The application MUST identify the requested Trust & Life profile and exact version.

### TL-ONBOARD-001-R021 — Requirement-by-requirement response

For every blocking profile requirement, the applicant MUST provide a response that identifies the relevant claim, evidence, declaration, or justified not-applicable state required by the profile.

### TL-ONBOARD-001-R022 — No unsupported not-applicable state

A blocking requirement MUST NOT be marked not applicable unless the profile permits that state and the applicant provides a scope-specific justification.

### TL-ONBOARD-001-R023 — Evidence portability

Where evidence is hosted by the applicant or a third party, the onboarding record SHOULD retain portable evidence metadata, integrity information, and source identity so that the Registry is not the sole copy of trust-sensitive evidence.

## 5. Public and restricted information

### TL-ONBOARD-001-R030 — Public/restricted separation

An implementation MUST distinguish public onboarding data from verifier-only or legally restricted material.

### TL-ONBOARD-001-R031 — No secret-document dumping

Public participation MUST NOT require publication of trade secrets, raw employee records, security-sensitive facility data, confidential contracts, or unrelated personal information.

### TL-ONBOARD-001-R032 — Restricted reference metadata

When restricted documents are necessary for review, a public record MAY expose only safe metadata such as document category, issuer/source class, date, digest, validity, and review status.

## 6. Privacy and monitoring declarations

### TL-ONBOARD-001-R040 — Privacy declaration

Before publication, an applicant seeking observability-based claims SHOULD document whether monitoring notice, data minimization, retention, access, worker privacy, and prohibited-private-area exclusions have been reviewed.

### TL-ONBOARD-001-R041 — Equivalent evidence

An applicant MUST NOT be rejected solely for declining a particular proprietary camera, sensor, blockchain, cloud, or software vendor when functionally equivalent evidence satisfies the applicable profile.

## 7. Decision states

An onboarding implementation SHOULD distinguish at least:

- `draft` — incomplete applicant preparation;
- `submitted` — ready for evaluation;
- `needs-evidence` — one or more blocking evidence gaps;
- `under-review` — manual or independent review pending;
- `ready` — blocking pilot requirements satisfied;
- `ready-with-advisories` — blocking requirements satisfied, non-blocking gaps remain;
- `not-ready` — one or more blocking requirements not satisfied;
- `suspended` — previously publishable state temporarily disabled;
- `withdrawn` — applicant withdrew the scope.

### TL-ONBOARD-001-R050 — Explainable decision

A decision MUST be traceable to requirement-level findings rather than only an opaque aggregate score.

### TL-ONBOARD-001-R051 — No pay-to-pass

Commercial payment, marketplace commission, sponsorship, advertising spend, or purchase of unrelated services MUST NOT silently change a conformance finding.

## 8. Correction and appeal

### TL-ONBOARD-001-R060 — Correction channel

A published participant SHOULD have a documented route for correcting factual errors in its public record.

### TL-ONBOARD-001-R061 — Appeal channel

A material adverse onboarding or conformance decision SHOULD provide a documented appeal path and preserve the original decision history.

### TL-ONBOARD-001-R062 — No silent deletion

Trust-sensitive corrections SHOULD preserve supersession or revision metadata rather than erasing prior states without explanation.

## 9. Public result

A public onboarding result SHOULD state:

1. applicant organization;
2. included scope;
3. profile/version;
4. assessment state;
5. blocking gaps, if any;
6. non-blocking advisories;
7. last evaluation time;
8. evidence/claim links that can safely be public;
9. correction and appeal availability;
10. a notice that onboarding is not regulatory certification or a guarantee of safety.
