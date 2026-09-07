# Registry

The Trust & Life protocol does not require one central registry. A registry is a discoverability and presentation layer over portable evidence and attestations, not the ultimate source of truth.

## v0.2 reference API

The dependency-free reference server implements a minimal read-only API documented in [`openapi.yaml`](openapi.yaml):

- `GET /health`
- `GET /v1/subjects`
- `GET /v1/subjects/{subjectId}`
- `GET /verify?subject=...` for the consumer-facing verification view

Run it with:

```bash
cd reference-implementation
npm run serve
```

The example registry index is [`demo-registry.json`](demo-registry.json).

## Registry principles

A conforming registry SHOULD:

- expose the exact specification/profile version used for each conformance result;
- use stable identifiers for subjects and records;
- show whether information is self-declared, evidence-backed, continuously observable, or independently verified;
- expose material evidence gaps, validity periods, suspension, revocation, and expiration states;
- retain visible correction or supersession history for trust-sensitive records;
- distinguish allegations from verified incidents;
- publish an appeal/correction mechanism;
- avoid presenting participation as permanent endorsement by Trust & Life;
- provide machine-readable access to non-sensitive public records where practical.

## Decentralization

Registries SHOULD support exportable evidence metadata, standardized identifiers, portable credentials, and independently mirrored public records so verification does not depend exclusively on one operator.

A marketplace MAY operate a registry, but commercial ranking, advertising, commission arrangements, or partnership MUST NOT silently change the meaning of protocol conformance.
