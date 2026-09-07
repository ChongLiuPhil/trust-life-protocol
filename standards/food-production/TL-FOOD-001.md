# TL-FOOD-001 — Food Production Transparency Profile

**Status:** Draft v0.1  
**Depends on:** TL-CORE-001  
**Scope:** Primary food production and basic processing transparency

## 1. Purpose

TL-FOOD-001 defines an initial open transparency profile for food producers and processors participating in Trust & Life.

This document is not a replacement for food-safety law, HACCP plans, licensed inspection, ISO standards, veterinary controls, laboratory methods, or other applicable regulatory and professional requirements.

Conformance means that the organization has satisfied the defined **Trust & Life evidence and transparency requirements within the stated scope**. It does not mean that the food is guaranteed to be safe.

## 2. Legal and external-standard precedence

### TL-FOOD-001-R001 — Applicable law

A participating organization MUST comply with applicable food-safety, labeling, employment, privacy, environmental, and facility laws independently of this profile.

### TL-FOOD-001-R002 — No substituted certification

Trust & Life conformance MUST NOT be represented as a substitute for legally required licenses, inspections, certifications, laboratory testing, or government approvals.

### TL-FOOD-001-R003 — External standards

An implementation MAY map requirements to recognized frameworks such as HACCP-based systems, ISO 22000, national food-safety requirements, or sector-specific standards. Restricted or copyrighted standards text MUST NOT be reproduced without permission.

## 3. Producer and facility identity

### TL-FOOD-001-R010 — Organization identity

The producer or processor MUST provide a stable organization identifier and public-facing identity sufficient to distinguish it from similarly named entities.

### TL-FOOD-001-R011 — Facility identity

Each participating production or processing site MUST have a stable facility identifier.

### TL-FOOD-001-R012 — Scope

The public profile MUST identify which products, processes, production areas, facilities, or batches are included in the Trust & Life claim.

Participation at one facility MUST NOT imply conformance at other facilities.

## 4. Product and batch identity

### TL-FOOD-001-R020 — Product identification

Products covered by the profile MUST be identifiable through a stable product or product-class identifier.

### TL-FOOD-001-R021 — Batch or lot linkage

Where batch or lot tracking is customary or legally required, public trust records SHOULD allow relevant evidence to be associated with a batch or lot rather than only with the producer generally.

### TL-FOOD-001-R022 — Event linkage

Harvest, receipt, transformation, packaging, storage, dispatch, and other relevant events SHOULD use interoperable event identifiers and SHOULD support mapping to GS1 EPCIS/CBV where feasible.

## 5. Food-safety control evidence

### TL-FOOD-001-R030 — Hazard-control documentation

The organization MUST maintain documented procedures appropriate to its product and jurisdiction for identifying and controlling relevant food-safety hazards.

Public disclosure MAY summarize the control framework rather than publishing sensitive internal documents in full.

### TL-FOOD-001-R031 — Critical records

Where applicable, the organization MUST retain records relevant to critical safety controls, such as sanitation, process conditions, temperature, allergen controls, receiving checks, or other domain-specific controls.

The applicable implementation profile MUST specify which categories are required for each product type.

### TL-FOOD-001-R032 — Deviations

Material deviations from defined critical limits or required procedures MUST be recordable together with corrective action and disposition of affected product where applicable.

A public-facing implementation MAY redact sensitive operational details, but MUST NOT present a period with a verified unresolved critical deviation as fully conforming.

## 6. Inputs and production records

### TL-FOOD-001-R040 — Material inputs

The organization SHOULD maintain traceable records for significant ingredients, agricultural inputs, processing aids, or other relevant materials according to product type and legal requirements.

### TL-FOOD-001-R041 — Agricultural treatment records

For agricultural production, relevant treatment records SHOULD identify at least the type of treatment or input, date or period, affected production area or crop scope, and responsible record source where required by the applicable profile.

Public presentation SHOULD avoid disclosing personal information not necessary for verification.

### TL-FOOD-001-R042 — Water or environmental controls

Where water quality, environmental conditions, or similar factors are material to food safety, the applicable profile SHOULD define the required evidence categories and review frequency.

## 7. Process observability

### TL-FOOD-001-R050 — Observation plan

T2 claims MUST define an observation plan specifying:

- relevant process zones or stages;
- evidence type for each stage;
- expected observation schedule or continuity;
- known blind spots or excluded areas;
- outage handling;
- retention or availability period.

### TL-FOOD-001-R051 — Camera proportionality

Video MAY be used as evidence but MUST NOT be treated as universally required when equivalent evidence can demonstrate the requirement more proportionately.

### TL-FOOD-001-R052 — Privacy by design

Public or partner-facing video SHOULD minimize identification of workers who are not material to the verification purpose. Audio SHOULD be disabled unless independently justified.

### TL-FOOD-001-R053 — No false continuity

If a feed, sensor, or evidence pipeline is unavailable, the interface MUST NOT represent that interval as continuously observed.

### TL-FOOD-001-R054 — Historical review

Where raw monitoring media are retained, authorized reviewers SHOULD be able to inspect relevant historical intervals tied to incidents, batches, or events, subject to privacy and retention rules.

## 8. Sensor and measurement evidence

### TL-FOOD-001-R060 — Sensor identity

Sensor-derived evidence SHOULD identify the device or device class, measured quantity, timestamp, and relevant subject, location, or process context.

### TL-FOOD-001-R061 — Units and interpretation

Measurements MUST use unambiguous units and SHOULD use established machine-readable unit vocabularies where practical.

### TL-FOOD-001-R062 — Calibration or validation

Where measurement accuracy is material to a trust claim, the implementation SHOULD record calibration, verification, replacement, or other relevant device-quality information.

### TL-FOOD-001-R063 — Data gaps

Material missing sensor intervals MUST be visible in T2 coverage calculations or explanatory status.

## 9. Inspection and laboratory evidence

### TL-FOOD-001-R070 — Test identity

A published test or inspection result MUST identify its scope, date, subject or batch linkage where relevant, and issuing party.

### TL-FOOD-001-R071 — Third-party distinction

Self-testing and independent third-party testing MUST be distinguishable in public presentation.

### TL-FOOD-001-R072 — Report integrity

Published reports SHOULD include an integrity reference such as a digest, signed document, credential, or equivalent method sufficient to detect undisclosed replacement.

### TL-FOOD-001-R073 — Qualification context

T3 claims SHOULD identify the basis on which an external laboratory, inspector, or verifier is treated as qualified for the stated scope.

### TL-FOOD-001-R074 — Verifiable attestations

Independent findings MAY be represented using W3C Verifiable Credentials or another interoperable digitally signed attestation format.

## 10. Storage and dispatch handoff

### TL-FOOD-001-R080 — Storage conditions

Where storage conditions are material to product safety or quality, required conditions and evidence categories MUST be defined for the applicable product profile.

### TL-FOOD-001-R081 — Dispatch event

A dispatch or custody-transfer event SHOULD identify product or batch, time, source facility, recipient or next custody context where disclosure is appropriate, and relevant condition evidence.

### TL-FOOD-001-R082 — Downstream boundary

A producer's TL-FOOD-001 status MUST NOT imply that downstream transport, warehousing, or retail stages complied with their requirements unless those stages are separately evidenced.

## 11. Public presentation

A consumer-facing Trust & Life view for a covered food product SHOULD present, at minimum:

1. producer and facility identity;
2. product or batch identity where available;
3. applicable Trust & Life profile and version;
4. T-level by major claim group;
5. evidence coverage and material gaps;
6. recent relevant inspection or testing status where available;
7. unresolved verified incidents relevant to the product scope;
8. last evidence update time;
9. links or views for evidence that can lawfully and safely be made public;
10. explanation that conformance is not an absolute-safety guarantee.

## 12. Example claim groups

An implementation MAY separate food-production trust into claim groups such as:

- identity and traceability;
- production-process observability;
- sanitation and hygiene evidence;
- agricultural input or ingredient records;
- environmental or temperature evidence;
- inspection and laboratory evidence;
- incident and corrective-action transparency.

These claim groups SHOULD NOT be collapsed into one opaque percentage without allowing users to inspect the underlying dimensions.

## 13. Future profiles

Future specifications may define more detailed requirements for:

- fresh produce;
- meat and poultry;
- dairy;
- seafood;
- ready-to-eat foods;
- cold-chain logistics;
- food warehousing;
- retail handling;
- allergen-sensitive production;
- small-farm proportional compliance.

The v0.1 profile intentionally avoids pretending that a single checklist can adequately cover every food category.
