# Examples

This directory contains non-production examples used to test whether Trust & Life specifications are understandable and implementable.

## First target example

The first complete example should model one ordinary food product moving through a short supply chain:

```text
Producer / Farm
      ↓
Inspection or testing
      ↓
Storage
      ↓
Transport
      ↓
Retail receipt
      ↓
Consumer verification view
```

A useful demo could use a fictional batch of apples or another simple fresh-food product. It should contain simulated data only unless real participants have explicitly agreed to publication.

## What the example must demonstrate

The v0.1 example should show:

- stable organization and facility identities;
- one product and one batch/lot;
- a small set of supply-chain events;
- evidence linked to specific claims rather than merely uploaded to a generic document folder;
- at least one sensor-style record, such as storage or transport temperature;
- one inspection or laboratory-style attestation;
- evidence provenance and integrity metadata;
- one intentionally missing evidence interval so the UI can demonstrate honest gap reporting;
- T0–T3 states at different points rather than giving everything the highest level;
- one resolved or disputed incident example;
- a consumer-facing summary that avoids absolute-safety language.

## Example design principle

Examples are specification tests in narrative form. If a normal producer, developer, reviewer, and consumer cannot understand what an example means, the underlying specification is probably too complicated or ambiguous.

## Planned structure

```text
examples/
└── apple-supply-chain/
    ├── README.md
    ├── organizations.json
    ├── events.json
    ├── evidence.json
    ├── attestations.json
    ├── incidents.json
    └── expected-conformance.json
```
