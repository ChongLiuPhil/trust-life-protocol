# Conformance governance and role separation

Trust & Life aims to make reasons for trust inspectable. Governance therefore must prevent one commercial actor from silently controlling every stage of the trust decision.

## Roles

### Standards steward

Maintains normative requirements, profile-development process, version history, and change governance.

The standards steward does not gain a special right to declare real-world facts true merely because it maintains the specification.

### Applicant / responsible organization

Defines the requested scope, makes declarations, provides or references evidence, corrects factual errors, and responds to findings/incidents.

### Registry operator

Publishes/indexes public records, profiles, status, assessments, source identities, and federation metadata. A Registry is not the ultimate source of truth.

### Evaluator implementation

Applies machine-readable profile rules to a stated application/evidence bundle. Its version and result basis should be public and reproducible.

### Qualified verifier

Performs domain-specific independent review, laboratory work, inspection, or other T3 verification within a stated scope. Qualification and conflict context should be explicit.

### Marketplace / commerce operator

May sell or link to products whose records use Trust & Life, but commercial ranking, commission, advertising, or inventory relationships must not alter conformance semantics.

### Appeals / secondary reviewer

Reviews material challenges to assessments, incidents, suspension, or other adverse trust decisions. It should be sufficiently independent from the original disputed decision where practical.

## Role overlap

Small pilots may not have a separate legal entity for every role. Role overlap is not automatically prohibited, but it must not be hidden.

At minimum:

- a T3 verifier for a claim must be distinct from the responsible organization for that evaluated subject;
- commercial payment must not change machine-readable findings;
- a Registry operated by a marketplace must expose the same conformance semantics through its public API as non-commercial implementations;
- conflicts relevant to interpretation should be disclosed;
- an appeal should not simply repeat the original automated decision without a meaningful review path.

## Standards capture controls

Changes that materially raise cost, mandate proprietary vendors, or narrow equivalent-evidence options should receive explicit proportionality review. The change process should consider small producers, workers/privacy, independent verifiers, consumers, and implementers rather than only large platform operators.

## Version governance

A published assessment must pin:

- normative standard/profile ID and version;
- machine-readable profile version;
- evaluator implementation/version;
- evaluation time;
- relevant evidence/credential validity state.

A profile update does not silently rewrite old assessments. Migration or re-evaluation should produce a new state linked to the prior one.

## Commercial neutrality test

Two applicants presenting the same scoped application, evidence bundle, profile/version, and machine-checkable facts should receive the same automated findings regardless of whether either applicant:

- pays marketplace commission;
- buys advertising;
- sponsors the project;
- purchases optional consulting or hardware;
- uses a preferred storefront.

If commercial metadata changes technical conformance, the implementation is not following this governance model.

## Public accountability

Trust-sensitive governance should preserve enough public information to answer:

1. Which rule produced this finding?
2. Which evidence/claim supported it?
3. Which parts were automated versus manually reviewed?
4. Who issued an independent attestation?
5. What version was used?
6. What limitations/gaps were known?
7. Can the affected party correct or appeal?
8. Can another Registry/evaluator reproduce or challenge the result?

The objective is not to eliminate institutions. It is to make institutional trust more reason-giving, inspectable, and contestable.
