# Trust & Life Machine-Readable Schemas

This directory contains the **v0.2** JSON Schema vocabulary for portable Trust & Life verification bundles.

## Core objects

- `organization.schema.json` — accountable organizations and issuers
- `subject.schema.json` — products, batches, facilities, shipments, processes, or services
- `claim.schema.json` — scoped statements mapped to normative requirements
- `evidence.schema.json` — evidence metadata and integrity references
- `verification.schema.json` — verification actions, states, and optional credential references
- `incident.schema.json` — public review / incident lifecycle
- `conformance.schema.json` — profile-level conformance statements
- `bundle.schema.json` — transport container tying these objects together

JSON Schema validates **shape**. The reference verifier additionally checks cross-object relationships, T0–T3 semantics, conformance aggregation, and SHA-256 digests for local evidence files.

Neither schema validation nor digest validation establishes factual truth, legal compliance, or food safety.

Interoperability mappings are documented under [`../interoperability/`](../interoperability/).
