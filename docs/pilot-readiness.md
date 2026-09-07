# Real-world pilot readiness gate

A synthetic fixture passing CI is not enough to put a real organization or food product into public use. Before a real Trust & Life pilot is published, the operator should complete the following release gate and retain evidence of the decision.

## 1. Legal and regulatory boundary

- Identify the jurisdictions covering the organization, facility, product, labeling, monitoring, employment, privacy, food safety, laboratory/inspection activity, and consumer communications.
- Confirm which licenses, registrations, inspections, laboratory methods, HACCP-based controls, or other legal obligations apply independently of Trust & Life.
- Review all public wording so `ready`, `conformant`, T-levels, QR labels, and verification pages cannot reasonably be confused with government approval or an absolute-safety guarantee.
- Do not copy restricted or copyrighted standards text into the public profile without permission.

## 2. Applicant authority and scope

- Verify that the submitter is authorized to act for the applicant organization.
- Verify facility identity and the relationship between the organization and facility.
- Define included products, batches, shipments, processes, areas, and validity period.
- Confirm that excluded facilities/products/processes cannot inherit the published result through branding or UI ambiguity.

## 3. Data classification

Before ingestion, classify every proposed data source as one of:

- public;
- redacted public;
- verifier-only/restricted;
- prohibited from Trust & Life collection.

Do not upload raw employee files, identity documents, confidential contracts, trade secrets, security-sensitive layouts, credentials, private keys, or unrelated personal information into a public Registry.

## 4. Evidence plan

For each blocking requirement:

- identify the claim;
- identify evidence categories and sources;
- state collection frequency/coverage;
- define gaps and outage handling;
- define integrity/signature method where proportionate;
- define retention and deletion behavior;
- define which evidence remains self-hosted by the participant;
- define what the public Registry stores versus indexes.

Evidence availability must not be described as evidence completeness.

## 5. Monitoring and worker privacy

For camera, sensor, or other recurring monitoring:

- document the legitimate process purpose;
- prefer process zones over person tracking;
- exclude toilets, changing rooms, sleeping/rest spaces, and other inappropriate private areas;
- minimize audio and biometric/identity collection;
- establish retention and access controls;
- provide notice/consultation where appropriate under applicable rules;
- test that public views cannot reveal faces, names, schedules, access credentials, or sensitive facility details unintentionally.

## 6. Independent verifier readiness

For T3 claims:

- document verifier identity and scope;
- establish why the verifier is treated as qualified for the stated claim;
- disclose material conflicts of interest;
- define method, report/credential validity, expiration, revocation/status behavior, and re-evaluation frequency;
- ensure the verifier is genuinely distinct from the responsible organization for the evaluated subject.

A digital signature proves key control, not professional competence.

## 7. Incident, correction, and appeal operations

Before launch, assign owners and service procedures for:

- incoming public reports;
- triage and evidence preservation;
- emergency escalation where applicable;
- organization response;
- independent/secondary review;
- corrective action;
- suspension;
- resolution publication;
- factual correction;
- appeal;
- superseding assessments.

Do not design a public-reporting system in which accusation count becomes a trust score.

## 8. Cryptographic operations

- Generate production signing keys outside the public source repository.
- Protect private keys using an appropriate managed or hardware-backed mechanism for the risk level.
- Document key controller, purpose, activation, rotation, retirement, revocation, and compromise response.
- Test credential/status failure behavior before launch.
- Never reuse the synthetic fixture keys as production identity credentials.

## 9. Registry and federation

- Decide which evidence is participant-hosted and which public metadata is Registry-hosted.
- Test data export and migration to another Registry implementation.
- Preserve source identity when federating records.
- Define how conflicting Registry states are displayed.
- Test unavailable peer/evidence-host behavior; unavailable data must not be displayed as verified continuity.

## 10. QR and physical label review

- Use a stable resolver target rather than making a marketplace product page the only durable identifier.
- If GS1 identifiers are used, confirm they are legitimately assigned and use a standards-conformant resolver approach.
- Test scan behavior on ordinary phones and degraded-network conditions.
- Put the scope and non-certification wording close enough to the verification state that a reasonable consumer can interpret it.
- Avoid labels such as `100% safe`, `officially certified by Trust & Life`, or equivalent absolute claims.

## 11. Security testing

At minimum test:

- path traversal/file disclosure;
- unsafe HTML rendering/injection;
- digest/signature bypass;
- key/status confusion;
- profile/version substitution;
- evaluator blocker bypass;
- public/restricted-data leakage;
- Registry source-confusion;
- denial/unavailability behavior.

See `docs/threat-model.md` and `SECURITY.md`.

## 12. Operational monitoring

A real pilot needs observable operational health for:

- evidence ingestion delay;
- observation/sensor gaps;
- credential expiration/status failures;
- resolver/API availability;
- assessment/profile version drift;
- incident response backlog;
- appeal/correction backlog.

Operational uptime is not itself conformance, but unexplained outages can invalidate claims that depend on continuous observation.

## 13. Go-live decision

A real pilot SHOULD NOT be made public until:

1. blocking Trust & Life pilot requirements are satisfied;
2. required manual/independent reviews are complete;
3. legal/privacy/security review is complete for the intended jurisdiction and data flows;
4. production key and incident operations are ready;
5. public wording has been reviewed for non-certification/non-guarantee clarity;
6. rollback, suspension, correction, and appeal paths have been exercised in a test environment.

A failed readiness item should remain visible as a launch blocker rather than being offset by unrelated strengths.
