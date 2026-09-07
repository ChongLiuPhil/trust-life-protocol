# Field Pilot Go-live Checklist

A real participant MUST NOT be made public merely because the synthetic test suite passes.

## A. Authority and scope

- [ ] Deployment operator legal entity and jurisdiction recorded privately.
- [ ] Applicant representative authority verified.
- [ ] Organization identity verified using appropriate real-world sources.
- [ ] Every covered facility is verified and belongs to, or is legitimately operated for, the declared responsible organization.
- [ ] Covered products/batches/shipments/processes and validity period are explicit.
- [ ] No unrelated facility or product can inherit the result.

## B. Data and privacy

- [ ] Data inventory completed before production ingestion.
- [ ] Public, restricted, verifier-only, and secret data classes defined.
- [ ] Worker/person-identifying data minimized.
- [ ] Prohibited private-area monitoring excluded.
- [ ] Audio/biometric collection absent unless separately justified and legally reviewed.
- [ ] Retention and deletion/supersession rules approved.
- [ ] Public projection contains no secret, private contact, raw credential, or unnecessary personal data.

## C. Evidence and verification

- [ ] Every blocking profile requirement has a mapped evidence path or documented reason for non-applicability.
- [ ] Evidence source ownership and provenance checked.
- [ ] Integrity/signature mechanism tested on production-like data.
- [ ] Observation/sensor gaps are represented rather than hidden.
- [ ] T3 verifier independence and qualification reviewed by a human.
- [ ] Credential validity/status lookup tested where used.
- [ ] External standard identifiers are legitimate; no invented GTIN/GLN/SSCC or false accreditation claims.

## D. Safety and due process

- [ ] Trust & Life wording does not substitute for legally required food-safety controls or approvals.
- [ ] Incident reporting channel is operational.
- [ ] Emergency suspension can disable `live` public status promptly.
- [ ] Correction process is operational.
- [ ] Appeal path and reviewer are identified.
- [ ] Historical assessments are retained and superseded rather than overwritten.

## E. Security and resilience

- [ ] Production private keys are outside the public repository.
- [ ] Secrets are stored using the deployment platform's secret-management controls.
- [ ] Least-privilege access configured for intake, verifier workspace, Registry, and operations.
- [ ] Evidence/Registry backups and restore procedure tested.
- [ ] Log retention and time synchronization configured.
- [ ] Rate limiting, input validation, and abuse controls considered for any public write endpoint.
- [ ] Security contact and vulnerability-response process are active.

## F. Public presentation

- [ ] QR/resolver target is stable and tested.
- [ ] Public page shows scope, requirement-level findings, limitations, last update, and current lifecycle state.
- [ ] `suspended`, `withdrawn`, expired, or superseded states cannot appear as current `ready`.
- [ ] Hash/signature/credential wording does not imply factual truth or absolute safety.
- [ ] Paid placement/ranking cannot modify the conformance result.

## Approval record

The deployment operator SHOULD store an approval record outside this public repository containing approver roles, date/time, exact profile/evaluator versions, assessment identifier, accepted residual risks, and rollback/suspension contact.
