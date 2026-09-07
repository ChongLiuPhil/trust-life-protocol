# Registry and Federation

Trust & Life does not require one central registry.

v0.3 adds a signed registry descriptor, public key discovery, signed credential status, and a two-registry synthetic federation fixture.

## Discovery

A registry SHOULD expose:

`/.well-known/trust-life-registry`

The descriptor identifies the registry operator, supported bundle/profile versions, public signing keys, peer discovery URLs, update time, and a JWS signature.

## Federation

Peers are independent sources. A registry MUST NOT silently relabel a peer record as local data. When peers disagree, implementations should expose the source, signatures, validity/status information, and the conflict itself.

The reference API exposes `/v1/federation` to demonstrate this source-preserving model.

## Credential status

The v0.3 demo uses a small signed status record so revocation behavior can be tested without additional dependencies. This custom fixture is not presented as W3C Bitstring Status List conformance. Production interoperability should prefer the W3C Bitstring Status List 1.0 model where appropriate.

## Commercial neutrality

Marketplace ranking, advertising, commissions, or partnerships MUST NOT alter the meaning of protocol conformance.
