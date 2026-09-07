# Trust & Life v0.3 — Cryptographic Trust & Federation

## Status

Draft implementation profile for v0.3.

## Purpose

v0.3 moves Trust & Life from integrity-only evidence checking toward portable cryptographic trust and registry federation.

The design keeps four layers distinct:

1. **Integrity** — the bytes have not changed relative to a recorded digest.
2. **Authenticity** — a holder of a declared signing key signed a defined message.
3. **Authority** — the signer is recognized for the role under which the statement is being evaluated.
4. **Truth / compliance** — the underlying claim is factually true and satisfies applicable requirements.

A valid signature proves only the second layer unless additional evidence establishes the others.

## Stable standards profile

The v0.3 reference implementation uses:

- Ed25519 signatures represented with JSON Web Keys (JWK), consistent with JOSE support for EdDSA/Ed25519;
- W3C Verifiable Credentials Data Model 2.0 as the credential data model;
- W3C Controlled Identifiers 1.0 as a conceptual direction for publishing controller/key material;
- W3C Bitstring Status List 1.0 as the preferred interoperable direction for credential suspension and revocation;
- W3C Verifiable Credential Data Integrity 1.0 and Data Integrity EdDSA Cryptosuites 1.0 as future-compatible signing profiles.

The repository does not reproduce restricted standards text and does not claim conformance to every external specification.

## Trust & Life key descriptor

A registry MAY publish a key descriptor for an organization:

```json
{
  "id": "tl:key:clearcheck-2026-01",
  "controller": "tl:org:clearcheck-lab",
  "type": "Ed25519",
  "publicKeyJwk": {
    "kty": "OKP",
    "crv": "Ed25519",
    "x": "..."
  },
  "purposes": ["assertion"],
  "validFrom": "2026-09-07T00:00:00Z",
  "status": "active"
}
```

Private keys MUST NOT be published in a Trust & Life registry.

## Key rotation

Implementations SHOULD treat keys as time-bounded credentials rather than permanent identity.

A key record can move through:

`active → retired`

or

`active → revoked`.

Historic signatures MAY remain valid when their signing time falls inside the key's validity interval and the key was not revoked retroactively. Implementations MUST preserve enough history to distinguish rotation from compromise.

## Signed evidence manifest

Evidence files SHOULD be grouped into a canonical manifest containing:

- manifest identifier;
- subject identifier;
- issuer/controller identifier;
- signing key identifier;
- creation time;
- evidence identifiers, URIs, media types, and SHA-256 digests;
- signature algorithm;
- signature value.

The signature covers a deterministic canonical JSON representation of the unsigned manifest payload used by this reference implementation. This local canonicalization profile is deliberately narrow and MUST NOT be described as full JSON Canonicalization Scheme conformance unless a future version adopts and tests that specification explicitly.

## Credential status

Credentials SHOULD carry explicit status information rather than being assumed valid forever.

The preferred interoperable target is W3C Bitstring Status List 1.0. The v0.3 demonstration also provides a small registry status endpoint for transparent testing. The demonstration endpoint is not a replacement for the W3C status-list format.

## Registry federation

Trust & Life does not define one root registry.

Each registry publishes a descriptor containing:

- stable registry identifier;
- operator organization identifier;
- public base URL;
- supported Trust & Life bundle/profile versions;
- public signing keys;
- peer registry descriptors or discovery endpoints;
- last-updated time.

A consumer MAY query more than one registry and compare records. A registry MUST NOT silently rewrite records fetched from a peer as if the peer's records originated locally.

## Federation conflict rule

When registries disagree, the protocol MUST expose the disagreement rather than selecting a hidden winner.

A verifier should surface:

- record source;
- source registry;
- signature state;
- applicable validity interval;
- current status/revocation information;
- conflicting records or unresolved incidents.

## Non-goals

v0.3 does not create a global public-key infrastructure, a legal certification authority, a blockchain identity system, or a universal ranking of trusted organizations.
