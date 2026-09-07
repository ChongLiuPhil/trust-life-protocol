# Reference Implementation

The reference implementation exists to prove that the protocol can be implemented with ordinary web technology. It is not intended to become a mandatory central platform.

## v0.1 objective

Build the smallest end-to-end implementation that can:

1. ingest a fictional or consenting participant's structured organization/product data;
2. receive or reference supply-chain evidence;
3. associate evidence with requirements and claims;
4. calculate/display evidence coverage and T-level state without hiding gaps;
5. verify integrity metadata or signed attestations where provided;
6. display incidents, responses, and resolution status;
7. render a public product/batch verification page suitable for a QR-code entry point.

## Explicit non-goals for v0.1

The first reference implementation does **not** need:

- payment processing;
- a full marketplace;
- proprietary camera hardware;
- mandatory blockchain infrastructure;
- automated claims that a food is “safe”;
- a global identity system;
- a complex social network or gamified surveillance system.

## Suggested logical components

```text
Evidence/API adapters
        ↓
Normalization & validation
        ↓
Claim/evidence store
        ↓
Verification & conformance engine
        ↓
Public registry API
        ↓
Consumer verification UI
```

## Interoperability

Where supply-chain event data are involved, the implementation should evaluate direct use of or mapping to GS1 EPCIS/CBV rather than inventing an incompatible event vocabulary.

Where independently signed attestations are useful, the implementation should evaluate W3C Verifiable Credentials or another open signed-credential format.

## Security baseline

A public transparency service must not expose camera credentials, private object-storage URLs, signing keys, administrative tokens, private worker data, or internal network details. Evidence access controls and public metadata must be modeled separately.
