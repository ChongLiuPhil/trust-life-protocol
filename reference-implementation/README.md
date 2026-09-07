# Reference Implementation v0.2

The reference implementation remains dependency-free and intentionally small.

## 1. Evidence and semantic verifier

```bash
cd reference-implementation
npm run verify:demo
```

The verifier checks cross-object references, T0–T3 relationships, independent verification for T3, conformance-level aggregation, evidence-path containment, and the **actual SHA-256 bytes** of local evidence files.

A matching digest establishes byte-level integrity relative to the recorded digest; it does not establish factual truth or food safety.

## 2. VC structure check

```bash
npm run verify:vc
```

The demo credential is deliberately unsecured. The checker validates basic VC 2.0 structure and warns that no cryptographic proof is present.

Run both checks with:

```bash
npm run verify
```

## 3. Read-only registry and verification page

```bash
npm run serve
```

Then open:

`http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001`

The browser retrieves public evidence files and independently recomputes their SHA-256 digests using the Web Crypto API. The same page can also operate as a static site using its bundled-data fallback.

The displayed verification URL is the intended QR-code target. The protocol does not require a particular QR rendering library or central domain.

## Boundaries

This reference implementation does not provide payments, seller onboarding, identity proofing, real laboratory integrations, real credential signatures, authorization for private evidence, or formal certification services.
