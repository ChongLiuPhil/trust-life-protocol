# Interoperability

Trust & Life prefers established standards and portable identifiers/formats over proprietary lock-in.

Current integration directions:

- `epcis-mapping.md` — GS1 EPCIS 2.0.1 / CBV 2.0.0 supply-chain event mapping.
- `verifiable-credentials.md` — W3C Verifiable Credentials Data Model 2.0 attestation mapping.
- `crypto-federation.md` — signing, key lifecycle, credential status, and source-preserving Registry federation.
- `digital-link.md` — physical-to-digital resolver boundary and GS1 Digital Link integration direction.

## Design rule

An external identifier/credential/event standard retains its own semantics and assignment/conformance rules. Trust & Life MUST NOT manufacture identifiers, copy restricted normative text, or imply external certification merely because it maps data to that standard.

Interoperability documents define integration directions and synthetic fixtures only. They do not imply endorsement, certification, or identifier allocation by GS1, W3C, ISO, regulators, laboratories, or other standards bodies.
