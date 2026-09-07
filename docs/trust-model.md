# Trust Model

## 1. Objects of trust

Trust & Life does not assign one undifferentiated trust score to an organization. Trust claims are scoped to specific subjects, processes, time periods, requirements, and evidence.

A typical trust record relates:

- a **subject** — organization, facility, product, batch, shipment, or process;
- a **claim** — a statement about that subject;
- a **requirement** — the rule against which the claim is evaluated;
- **evidence** — records relevant to the claim;
- an **issuer/source** — who or what produced the evidence;
- a **verification state** — how the evidence or claim was checked;
- a **validity interval** — when the finding applies;
- **limitations** — gaps, exceptions, uncertainty, or unresolved incidents.

## 2. Trust pipeline

The canonical model is:

```text
Claim
  ↓
Requirement
  ↓
Evidence
  ↓
Integrity & provenance checks
  ↓
Verification / review
  ↓
Conformance state
  ↓
Public presentation
```

Each step should be inspectable independently where disclosure is lawful and proportionate.

## 3. Evidence dimensions

Evidence quality should be assessed across multiple dimensions rather than reduced to “present / absent”:

### Provenance
Who or what created the record? Is that source authenticated?

### Integrity
Has the record changed since it was created or signed? Are revisions visible?

### Coverage
What proportion of the relevant process or time interval is represented? What gaps exist?

### Reliability
Was the device, person, laboratory, or system capable of making the relevant observation?

### Independence
Was the evidence produced or reviewed by a party independent of the subject being evaluated?

### Relevance
Does the evidence actually support the specific claim being made?

## 4. Conformance levels

### T0 — Declared
A subject has provided a structured self-declaration. Identity and submission provenance may be verified, but the substantive claim has not necessarily been independently checked.

### T1 — Evidence-backed
The required evidence set is present and linked to the relevant requirements. Evidence integrity and provenance are recorded. This level does not imply continuous observation.

### T2 — Continuously Observable
Defined high-value processes are supported by continuous or recurring evidence. Implementations MUST disclose monitoring coverage, outages, excluded areas, retention limits, and material evidence gaps.

### T3 — Independently Verified
One or more defined claims have been reviewed or attested by a qualified independent party under a documented method. The verifier, scope, date, validity, and limitations MUST be visible.

T-levels MAY be assigned per claim or profile. Implementations SHOULD NOT use a single organization-wide level when evidence strength differs materially across operations.

## 5. Cryptographic integrity

Cryptography can establish important facts about digital records, including source authentication and resistance to undetected modification. It cannot by itself prove that a physical-world event happened exactly as represented.

A blockchain entry, timestamp, hash, or signature therefore MUST NOT be described as independent proof of the truth of the underlying physical claim.

Implementations MAY use signed manifests, transparency logs, append-only storage, trusted timestamping, or distributed ledgers as integrity mechanisms.

## 6. Third-party attestations

Independent laboratories, auditors, inspectors, regulators, or other qualified parties may issue attestations. Where interoperable digital credentials are useful, implementations may model these attestations using W3C Verifiable Credentials or another open mechanism.

An attestation SHOULD identify:

- issuer;
- subject;
- claim or result;
- method or referenced requirement;
- evidence or report identifier where disclosure is permitted;
- issue date;
- validity or expiry where relevant;
- status or revocation mechanism where supported.

## 7. Supply-chain events

Supply-chain visibility events SHOULD reuse established interoperable event models where practical. GS1 EPCIS/CBV is a preferred compatibility direction for event semantics such as observation, transformation, aggregation, shipping, receiving, sensor context, and related certification information.

Trust & Life profiles should define additional evidence and transparency requirements as a profile or extension rather than needlessly replacing established event semantics.

## 8. Incidents and uncertainty

A trustworthy system must be capable of representing negative and incomplete information.

Implementations SHOULD distinguish at least:

- no known incident;
- incident reported, under review;
- incident verified;
- corrective action in progress;
- resolved;
- disputed;
- evidence unavailable or insufficient.

“No known incident” MUST NOT be presented as “proven safe.”
