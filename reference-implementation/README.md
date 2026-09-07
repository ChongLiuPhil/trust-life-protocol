# Reference Implementation v0.1

The first reference implementation deliberately stays small and dependency-free.

## Semantic verifier

Requires a current Node.js runtime.

```bash
cd reference-implementation
npm run verify:demo
```

The verifier checks:

1. cross-object references;
2. SHA-256 digest syntax;
3. T1 evidence presence;
4. T2 continuous/sensor evidence expectations;
5. T3 independent-verifier requirement;
6. conformance aggregation warnings;
7. unresolved incident count.

It does **not** verify the bytes behind demonstration evidence URIs, digital signatures, factual truth, legal compliance, or food safety. Those are separate verification layers.

## Public verification page

Serve the repository root over HTTP, for example with any static development server, and open:

`reference-implementation/web/index.html`

The page renders the synthetic apple-batch verification bundle in a consumer-readable form and exposes the current URL so it can be encoded into a QR code by a merchant, label system, or deployment pipeline.

A future version should add cryptographic digest checking, signed credentials, EPCIS adapters, incident submission, and deployable QR generation.
