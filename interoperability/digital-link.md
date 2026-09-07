# GS1 Digital Link interoperability direction

Trust & Life needs portable physical-to-digital resolution, but it must not invent or misrepresent identifiers assigned by other standards systems.

## 1. Trust & Life resolver

The reference implementation exposes:

`/r/{subjectId}`

This is a **Trust & Life demonstration resolver path**. A Trust & Life subject identifier such as `tl:subject:apple-2026-0001` is not a GS1 key and MUST NOT be presented as a GS1 Digital Link URI.

## 2. When GS1 identifiers are available

An organization that legitimately uses properly assigned GS1 identification keys may expose a GS1 Digital Link URI through a conformant resolver and include Trust & Life verification as one linked digital resource.

The conceptual relationship is:

physical object / label → assigned industry identifier → resolver → multiple digital resources, one of which MAY be a Trust & Life verification view.

Trust & Life SHOULD preserve the distinction between:

- the external identifier and its issuing/assignment rules;
- the resolver used to discover linked resources;
- the Trust & Life subject identifier;
- the Trust & Life evidence/conformance record.

## 3. No invented GTINs

Examples in this repository deliberately avoid presenting synthetic numbers as real GS1 assignments. A pilot MUST NOT manufacture a plausible-looking GTIN, GLN, SSCC, or other identifier and imply that it was allocated according to GS1 rules.

## 4. Version direction

As of the v0.4 design, Trust & Life treats the current GS1 Digital Link URI Syntax standard as the interoperability target for GS1-based physical identifiers. Implementers should pin the exact external standard version used by their deployment rather than copying normative GS1 text into this repository.

## 5. QR behavior

A QR code is only an encoding surface. Trust & Life does not require one QR vendor or one central host.

A deployment MAY encode:

- a Trust & Life resolver URL for a Trust & Life-native pilot subject;
- a GS1 Digital Link URI when the physical item legitimately uses appropriate GS1 identifiers;
- another stable standards-based identifier/resolver where appropriate.

The consumer-facing destination SHOULD make the identifier source, Trust & Life scope, profile/version, current assessment, evidence limitations, and Registry source visible.

## 6. Portability principle

A merchant SHOULD be able to change storefront, marketplace, or Registry provider without losing the underlying subject/evidence identity. Resolver design should therefore avoid making a marketplace product-page URL the only durable identifier for a Trust & Life record.
