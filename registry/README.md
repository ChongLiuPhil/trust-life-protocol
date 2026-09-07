# Registry

The Trust & Life protocol does not require one central registry. This directory documents the minimum behavior expected from registry implementations.

A registry may publish information about participating organizations, facilities, products, profiles, evidence status, verifier attestations, and incidents. Different organizations may operate interoperable registries.

## Registry principles

A conforming registry SHOULD:

- expose the exact specification/profile version used for each conformance result;
- use stable identifiers for subjects and records;
- show whether data are self-declared, evidence-backed, continuously observable, or independently verified;
- expose material evidence gaps and expiration states;
- retain visible supersession/correction history for trust-sensitive records;
- distinguish allegations from verified incidents;
- publish an appeal/correction mechanism;
- avoid presenting participation as a permanent endorsement by Trust & Life;
- provide machine-readable access to non-sensitive public records where practical.

## Decentralization of trust

A registry entry is an index into evidence and attestations, not the ultimate source of truth.

Implementations SHOULD make it possible to verify important records without depending exclusively on the continued availability or goodwill of one registry operator.

This may include signed attestations, portable evidence manifests, standardized identifiers, export APIs, or independently mirrored public metadata.

## Commercial neutrality

A marketplace MAY operate a registry, but marketplace ranking, advertising, commission arrangements, or commercial partnership MUST NOT silently alter the meaning of protocol conformance.
