# W3C Verifiable Credentials Mapping — Draft v0.2

## Version policy

Trust & Life v0.2 targets **W3C Verifiable Credentials Data Model 2.0**, a W3C Recommendation published 15 May 2025.

A 2.1 Working Draft exists, but draft-only features are not required by this profile. Implementations may experiment with later drafts separately without silently changing v0.2 semantics.

Official reference: https://www.w3.org/TR/vc-data-model/

## Intended uses

Credentials are useful when a laboratory, inspector, certifier, producer, or other accountable issuer needs to make a portable statement that can be presented outside one registry.

A Trust & Life verification may therefore carry a `credentialUri` referencing a VC payload.

Suggested mapping:

| Trust & Life | VC 2.0 |
| --- | --- |
| verifier / attester | `issuer` |
| product, batch, organization, facility, or claim | `credentialSubject` |
| scoped attestation | properties within `credentialSubject` |
| beginning of validity | `validFrom` |
| end of validity | `validUntil` |
| revocation/suspension mechanism | `credentialStatus` when a suitable status method is deployed |
| cryptographic securing | an applicable W3C Data Integrity or JOSE/COSE mechanism |

## Important separation

A VC can provide strong evidence that a particular issuer made a particular statement and that the secured payload was not altered. It does **not** prove that the issuer's underlying observation was correct.

Accordingly:

**credential authenticity ≠ factual truth ≠ product safety**

Trust & Life T3 additionally requires an independent verifier relationship within the applicable claim scope.

## Demo fixture

[`../examples/apple-supply-chain/credentials/lab-attestation.vc.json`](../examples/apple-supply-chain/credentials/lab-attestation.vc.json) demonstrates the VC 2.0 data model but intentionally contains no cryptographic proof. It MUST NOT be described as a signed or cryptographically verified credential.
