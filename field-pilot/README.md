# Trust & Life Field Pilot Kit

This directory turns the v0.4 onboarding/conformance model into a v0.5 operational field-pilot workflow without placing real participant data in the public repository.

## Principle

A field pilot is not a certification shortcut. The workflow is:

`intake → data classification → scope review → evidence mapping → preflight evaluation → human review → publication decision → monitoring → correction / suspension / appeal → superseding assessment / completion`

Synthetic templates in this repository MUST NOT be used to publish real personal, worker, credential, laboratory, contractual, or security-sensitive data.

## Contents

- `pilot-manifest.template.json` — deployment-local pilot metadata, roles, scope, and storage responsibilities.
- `data-inventory.template.csv` — field-by-field purpose, visibility, access, and retention inventory.
- `evidence-register.template.csv` — mapping from requirement to evidence source, integrity method, reviewer, and gaps.
- `pilot-plan.template.md` — narrow pilot question, metrics, stop conditions, and exit criteria.
- `go-live-checklist.md` — human approval gate before public launch.
- `operator-runbook.md` — recurring operating and change-management procedures.
- `incident-runbook.md` — detect, suspend, preserve history, correct, republish, appeal, withdraw, or complete.
- `participant-handbook.md` — participant-facing scope, privacy, monitoring, correction, appeal, withdrawal, and commercial-neutrality expectations.
- `deployment-architecture.md` — four-zone separation between private intake, verifier workspace, public Registry projection, and operational/audit history.
- `field-pilot-state.schema.json` — machine-readable lifecycle-state schema.
- `demo-state.json` — synthetic `live` lifecycle fixture.
- `demo-suspended-state.json` — synthetic suspension fixture proving public projection must be blocked.

The reference implementation adds:

- `pilot-check.js` — lifecycle invariants;
- `publication.js` — centralized publication guard;
- `public-export.js` — CLI public-projection test/export surface.

## Recommended deployment split

A real deployment SHOULD separate:

1. **private intake store** — legal identity, authorizations, contacts, restricted documents, raw sensitive evidence;
2. **verification workspace** — reviewer access to evidence needed for decisions;
3. **public Registry projection** — only scoped claims, safe evidence metadata, findings, limitations, lifecycle/status, and resolvers;
4. **operational/audit history** — assessment, correction, suspension, supersession, appeal, key, and approval events.

The public GitHub repository is the protocol/reference implementation, not a production data room.

## Pilot lifecycle

Nominal progression:

`draft → intake → evidence-mapping → preflight → human-review → approved → live`

A live pilot may move to `suspended`, `corrective-action`, `withdrawn`, or `completed`.

The v0.5 reference publication invariant is:

```text
current public projection allowed
  only if
state == live
AND publicProjectionAllowed == true
AND current assessment is ready or ready-with-advisories
AND pilot/application/profile identifiers match
```

A resolver may remain reachable after suspension so an old physical QR label can show current status and history. A suspended pilot MUST NOT continue exposing a current `ready` public projection.

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
- key-management, backup, and restore responsibilities;
- public label/resolver wording approval;
- success metrics, stop conditions, and exit criteria.

## Public GitHub boundary

The `.github/ISSUE_TEMPLATE/pilot-interest.yml` form is only for non-sensitive public expressions of interest. It is not an onboarding application. Do not post real IDs, licenses, contracts, worker details, restricted facility information, lab originals, credentials, API keys, or signing keys to a public issue.

See `docs/pilot-readiness.md`, `docs/conformance-governance.md`, `docs/threat-model.md`, `SECURITY.md`, and this directory's go-live checklist before collecting real data.
