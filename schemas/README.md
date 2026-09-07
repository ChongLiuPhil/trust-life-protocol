# Trust & Life Machine-Readable Schemas

This directory contains the v0.1 JSON Schema vocabulary for portable Trust & Life verification bundles.

## Core objects

- `organization.schema.json` — accountable organizations and issuers
- `subject.schema.json` — products, batches, facilities, shipments, processes, or services
- `claim.schema.json` — scoped statements mapped to normative requirements
- `evidence.schema.json` — evidence metadata and integrity references
- `verification.schema.json` — verification actions and states
- `incident.schema.json` — public review / incident lifecycle
- `conformance.schema.json` — profile-level conformance statements
- `bundle.schema.json` — transport container tying these objects together

JSON Schema validates **shape**. The reference verifier additionally checks cross-object relationships and basic Trust & Life level semantics.

Neither validation step establishes factual truth, legal compliance, or food safety.

Future versions may add explicit mappings to GS1 EPCIS/CBV events and W3C Verifiable Credentials while preserving a technology-neutral Trust & Life trust model.
