## Summary

Describe the problem this change solves and the smallest useful scope of the change.

## Change type

- [ ] Normative protocol / governance
- [ ] Machine-readable profile or schema
- [ ] Reference implementation
- [ ] Registry / OpenAPI contract
- [ ] Field-pilot operations
- [ ] Interoperability mapping
- [ ] Documentation only

## Trust and safety boundaries

- [ ] This change does not imply that hashes, signatures, credentials, `ready`, or `live` prove factual truth, product safety, legality, or regulatory approval.
- [ ] Public/restricted data boundaries remain explicit; no real sensitive participant data or private signing material is included.
- [ ] Worker/privacy impact was considered for any new evidence or observability requirement.
- [ ] Synthetic Trust & Life identifiers are not presented as GS1-assigned identifiers.

If any item is intentionally not applicable, explain why below.

## Compatibility and failure modes

Describe affected protocol versions, profiles, schemas, API routes, lifecycle states, or fixtures. Call out migration needs and foreseeable failure modes.

For Registry/API changes, update the implementation, `registry/openapi.yaml`, success/failure contract tests, and relevant documentation together.

## Verification

For executable changes:

```bash
cd reference-implementation
npm test
```

- [ ] Complete verification gate passes.
- [ ] Intentional negative paths still fail closed as designed.
- [ ] New or changed public behavior has regression coverage.

## Evidence / rationale

For normative or operational changes, summarize the evidence, field observation, interoperability need, privacy finding, or governance reason that justifies the change. Avoid adding requirements merely to increase protocol breadth.
