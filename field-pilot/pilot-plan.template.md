# Field Pilot Plan Template

Use this template in a deployment-local workspace. Do not commit real private participant information to the public protocol repository.

## 1. Pilot question

State the narrow question the pilot is intended to answer. Example categories:

- Can a participant map one real product/batch flow to the profile without excessive manual work?
- Can consumers understand scope, evidence strength, limitations, and current lifecycle state?
- Can the operator detect and publish evidence gaps without resorting to blanket surveillance?
- Can an independent verifier review the required evidence at a sustainable cost?

Do not define success as “prove the participant is trustworthy” or “prove the food is safe.”

## 2. Scope

- Applicant organization:
- Facility/facilities:
- Product class:
- Batch/lot scope:
- Logistics scope:
- Time period:
- Profile/version:
- Explicit exclusions:

## 3. Roles

- Pilot operator:
- Applicant representative:
- Qualified verifier/laboratory:
- Appeals reviewer:
- Security operator:
- Privacy/legal reviewer where applicable:

Record conflicts of interest and compensating controls.

## 4. Evidence plan

For each blocking requirement, record:

- expected source;
- collection cadence;
- integrity/signature method;
- expected gaps/outages;
- public vs restricted representation;
- reviewer role;
- retention period;
- fallback/equivalent evidence method.

## 5. Success metrics

Measure operational usefulness rather than a universal trust score. Suggested metrics:

- percentage of blocking requirements with a complete evidence mapping;
- number of unexplained scope mismatches;
- evidence ingestion failure rate;
- observation/sensor gap rate and time-to-disclosure;
- verifier hours per assessment;
- participant hours per evidence cycle;
- median time from evidence change to updated assessment;
- median time from reported material issue to suspension/visible status change;
- correction/appeal resolution time;
- proportion of public fields justified by a defined verification purpose;
- consumer comprehension in a small usability test, especially whether users distinguish `ready` from “safe.”

## 6. Stop / suspend conditions

Predefine conditions that pause the pilot, such as:

- unresolved high/critical incident in covered scope;
- evidence or key compromise;
- scope materially misrepresented;
- worker/privacy harm not mitigated;
- independent verification cannot be maintained;
- public wording repeatedly causes material misunderstanding;
- evidence collection burden is disproportionate to the benefit;
- operator cannot reliably maintain correction, suspension, or appeal procedures.

## 7. Exit criteria

At the end of the pilot, choose one outcome and document evidence:

- **iterate** — keep the concept but revise profile/workflow;
- **expand cautiously** — add one bounded scope dimension;
- **hold** — insufficient evidence of operational value;
- **stop** — harms/costs/limitations outweigh demonstrated value.

A pilot ending without expansion is not automatically a failure; it can reveal that a requirement, technology, or governance model should not be scaled.

## 8. Final report

The report should separate:

1. what the protocol/software technically verified;
2. what qualified humans reviewed;
3. what remained unknown;
4. operational burden and cost;
5. privacy/worker effects;
6. disputes/corrections;
7. user comprehension;
8. recommended specification changes.
