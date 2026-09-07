# Trust & Life Protocol

**信·生开放互信协议**  
**An Open Protocol for Verifiable Commerce**

> **See reality. Verify trust.**  
> **看见真实，验证信任。**

Trust & Life Protocol is an open-source framework for building **verifiable trust** between producers, processors, logistics providers, retailers, inspectors, consumers, and other participants in everyday supply chains.

信·生开放互信协议是一套面向民生产业链的开源互信框架。目标不是要求公众“相信某个平台”，而是让重要商业声明尽可能具有可检查、可追溯、可验证的证据基础。

## Core idea / 核心思想

**Claim → Evidence → Verification → Trust**  
**声明 → 证据 → 验证 → 信任**

Trust & Life is not primarily a marketplace, certification company, or blockchain project. It asks a more fundamental question:

> When an organization makes a claim about how a product was produced, stored, transported, inspected, or sold, how can another person independently examine the evidence behind that claim?

## Four layers

1. **Standards** — open, versioned requirements.
2. **Evidence** — structured records, media references, sensor data, reports, and attestations.
3. **Verification** — source attribution, integrity checking, review status, validity, and visible limitations.
4. **Commerce** — an optional transaction layer that does not define the meaning of trust.

## Design principles

- **Verifiable transparency, not blind trust.**
- **Process transparency, not human surveillance.**
- **Open protocol, plural implementations.**
- **Interoperability first.**
- **Blockchain optional.**
- **No absolute-safety claims.**
- **Due process for public reports and disputes.**
- **Responsible economics rather than destructive price competition.**

## Evidence-strength levels

| Level | Name | Meaning |
| --- | --- | --- |
| **T0** | Declared | Information is self-declared. |
| **T1** | Evidence-backed | Required evidence is linked to the claim. |
| **T2** | Continuously Observable | Defined processes have recurring/continuous observational evidence with documented scope and gaps. |
| **T3** | Independently Verified | A defined claim has been reviewed or attested by an independent qualified party. |

Overall conformance MUST NOT be displayed at a level higher than the weakest included claim unless a domain profile defines and justifies another aggregation rule.

## v0.2 runnable prototype / 可运行原型

v0.2 completes the first machine-verifiable loop:

**Organization → Subject → Claim → Evidence bytes → Verification → Conformance → Public Registry View**

It includes:

- eight JSON Schemas and a portable v0.2 trust bundle;
- a synthetic apple supply-chain example;
- real SHA-256 digests for all local demonstration evidence;
- a dependency-free Node.js verifier that recomputes evidence hashes;
- a read-only Registry API and consumer verification page;
- browser-side SHA-256 rechecking with Web Crypto;
- a QR-target verification URL based on the stable subject ID;
- an illustrative GS1 EPCIS mapping and JSON-LD event export;
- a W3C Verifiable Credentials Data Model 2.0 laboratory-attestation fixture;
- CI that verifies the bundle, checks the VC structure, and smoke-tests the Registry API.

### Run

```bash
cd reference-implementation
npm run verify
npm run serve
```

Then open:

```text
http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001
```

## What integrity does — and does not — prove

A matching SHA-256 digest demonstrates that the bytes retrieved by the verifier match the bytes whose digest was recorded.

It does **not** prove that:

- the underlying event actually happened as described;
- no relevant event was omitted;
- the evidence source was competent or honest;
- a product is legally compliant or absolutely safe.

Trust & Life therefore keeps integrity, provenance, independent verification, incidents, and domain requirements as separate layers.

## Interoperability

See [`interoperability/`](interoperability/).

- **GS1 EPCIS 2.0.1 / CBV 2.0.0** are the preferred direction for interoperable supply-chain visibility events and sensor information.
- **W3C Verifiable Credentials Data Model 2.0** is the stable target for portable issuer attestations.

The repository references external standards but does not claim endorsement by GS1, W3C, ISO, regulators, laboratories, or certification bodies.

## Repository map

```text
trust-life-protocol/
├── standards/
├── schemas/
├── interoperability/
├── examples/apple-supply-chain/
│   ├── evidence/
│   ├── credentials/
│   └── epcis/
├── registry/
├── reference-implementation/
│   ├── verifier.js
│   ├── vc-check.js
│   ├── server.js
│   └── web/
└── marketplace/
```

## Project boundary

Not part of v0.2: payment processing, a full e-commerce marketplace, proprietary hardware, mandatory blockchain infrastructure, real-world credential signing/key management, private-evidence authorization, or formal regulatory certification.

Normative requirements live under [`standards/`](standards/). See [`GOVERNANCE.md`](GOVERNANCE.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md) for project governance.

## Status

**v0.2 draft reference implementation.** Suitable for protocol discussion, prototyping, interoperability work, and test integrations. Nothing in this repository constitutes legal certification, regulatory approval, a food-safety guarantee, professional audit opinion, or endorsement of a real product.

## License

Original project code and documentation are openly reusable under the repository license. Third-party standards, trademarks, reports, identifiers, and evidence remain subject to their own rights and terms.
