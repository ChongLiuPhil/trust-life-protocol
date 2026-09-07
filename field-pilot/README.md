# Trust & Life Field Pilot Kit

This directory turns the v0.4 onboarding and conformance model into an operational pilot workflow without placing real participant data in the public repository.

## Principle

A field pilot is not a certification shortcut. The workflow is:

`intake → data classification → scope review → evidence mapping → preflight evaluation → human review → publication decision → monitoring → correction / suspension / appeal → export`

Synthetic templates in this repository MUST NOT be used to publish real personal, worker, credential, laboratory, contractual, or security-sensitive data.

## Contents

- `pilot-manifest.template.json` — deployment-local pilot metadata and operating roles.
- `data-inventory.template.csv` — field-by-field privacy and retention inventory.
- `evidence-register.template.csv` — mapping from requirement to evidence source and visibility class.
- `go-live-checklist.md` — human approval gate before public launch.
- `incident-runbook.md` — suspend, correct, investigate, republish, or appeal.
- `operator-runbook.md` — recurring operating procedures.
- `field-pilot-state.schema.json` — machine-readable lifecycle state.
- `demo-state.json` — synthetic lifecycle fixture used by CI.

## Recommended deployment split

A real deployment SHOULD separate:

1. **private intake store** — legal identity, contacts, restricted documents, raw sensitive evidence;
2. **verification workspace** — reviewer access to evidence needed for decisions;
3. **public Registry projection** — only scoped claims, public evidence metadata, findings, limitations, status, and resolvers;
4. **append-only operational history** — assessment, correction, suspension, supersession, and appeal events.

The public GitHub repository is the protocol/reference implementation, not a production data room.

## Pilot lifecycle

`draft → intake → evidence-mapping → preflight → human-review → approved → live`

A live pilot may move to `suspended`, `corrective-action`, `withdrawn`, or `completed`. A suspension MUST NOT be silently rendered as live conformance.

## Minimum handoff packet for a real deployment

Before onboarding any real participant, the operator should create a deployment-local copy of the templates and record:

- jurisdiction and legal owner of the deployment;
- responsible pilot operator;
- applicant representative authorization;
- exact organization/facility/product/batch/process/time scope;
- data-controller / processor roles where applicable;
- evidence source owners and retention periods;
- qualified verifier independence review;
- correction, incident, suspension, and appeal contacts;
- key-management and backup responsibilities;
- public label/resolver wording approval.

See `docs/pilot-readiness.md`, `docs/conformance-governance.md`, `docs/threat-model.md`, and `SECURITY.md` before collecting real data.
