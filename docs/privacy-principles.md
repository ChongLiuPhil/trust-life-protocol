# Privacy and Dignity Principles

Transparency is not permission to collect or publish everything.

## 1. Process transparency

Monitoring MUST be tied to a defined trust claim or operational requirement. Implementations SHOULD prefer observing the relevant process, equipment, goods, environmental conditions, or custody event rather than continuously identifying individual workers.

## 2. Data minimization

Collect only the information reasonably necessary to support the stated purpose. A requirement to prove cold-chain compliance, for example, generally needs temperature, time, shipment, device, and location context; it does not automatically require worker audio or biometric identity.

## 3. Private areas

Cameras or comparable monitoring MUST NOT be required in toilets, changing areas, rest spaces, sleeping areas, or other spaces where people reasonably expect privacy.

## 4. Audio and biometrics

Continuous audio capture and biometric identification create additional risks and SHOULD be disabled by default unless a narrowly defined use is lawful, necessary, proportionate, and separately governed.

Public-facing video SHOULD support masking or blurring where identifiable people are not necessary evidence.

## 5. Notice and participation

People materially affected by workplace monitoring SHOULD receive clear notice explaining:

- what is collected;
- why it is collected;
- who can access it;
- whether it is publicly visible;
- retention periods;
- complaint and correction channels.

Implementations must comply with applicable employment, privacy, consumer, data-protection, and surveillance laws.

## 6. Public access is not unlimited access

Evidence can be verifiable without all raw data being universally downloadable forever.

A conforming implementation MAY use layered disclosure:

- public summaries and evidence status;
- redacted or privacy-preserving media;
- authenticated access for supply-chain partners;
- controlled access for qualified reviewers;
- cryptographic commitments that allow integrity checks without public disclosure of the underlying confidential record.

## 7. Retention

Evidence retention periods SHOULD be defined by purpose, legal requirements, product lifecycle, dispute windows, and privacy risk. “Keep everything forever” is not a default principle.

If evidence expires or is lawfully deleted, the public record SHOULD preserve enough metadata to explain the resulting verification limitation without preserving unnecessary personal data.

## 8. Security

Transparency systems can themselves create security risks. Implementations SHOULD protect camera endpoints, sensor networks, credentials, administrative interfaces, access tokens, and evidence stores against unauthorized access.

Public verification interfaces SHOULD expose only the information intended for public use, not internal device credentials or security-sensitive facility details.

## 9. Dignity

Workers and producers are participants in the trust ecosystem, not objects placed on display for entertainment.

Public-review features SHOULD avoid humiliating presentation, voyeuristic design, persistent individual ranking, or incentives that encourage users to search for minor personal mistakes.

The purpose of observation is accountable process verification.
