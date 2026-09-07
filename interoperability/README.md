# Interoperability

Trust & Life defines trust semantics and evidence relationships; it should not replace mature supply-chain or credential standards.

The v0.2 interoperability profile uses two stable external foundations:

- **GS1 EPCIS 2.0.1 / CBV 2.0.0** for supply-chain visibility events and sensor observations.
- **W3C Verifiable Credentials Data Model 2.0** for portable issuer-subject attestations.

These mappings are deliberately one-way compatible profiles, not claims that every Trust & Life object is itself an EPCIS event or a Verifiable Credential.

See:

- [`epcis-mapping.md`](epcis-mapping.md)
- [`verifiable-credentials.md`](verifiable-credentials.md)

External standards retain their own licenses, trademarks, conformance requirements, and governance. Trust & Life does not reproduce restricted standards text.
