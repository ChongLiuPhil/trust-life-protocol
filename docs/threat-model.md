# Threat model — Trust & Life pilot systems

This document describes failure and abuse modes that a transparency system must consider. Cryptography is only one layer.

## 1. Asset and trust boundaries

Trust-sensitive assets include:

- organization/facility identity and scope;
- evidence bytes and manifests;
- sensor/process-observation continuity metadata;
- inspection/laboratory attestations;
- credential status and key lifecycle;
- conformance profiles and evaluator versions;
- incident, correction, and appeal history;
- Registry descriptors and federation source identity;
- public/private disclosure boundaries.

## 2. Physical-world truth attacks

### Omitted-event attack

A producer can submit genuine evidence about selected events while omitting adverse events. Hashes and signatures do not detect omission by themselves.

Mitigations: profile-defined coverage, event expectations, independent sampling/review, gap disclosure, reconciliation with external records where lawful, incident reporting.

### Staged-evidence attack

Video/photo evidence can depict a compliant scene that is not representative of normal operations.

Mitigations: recurring evidence, unpredictable independent review, event-linked timestamps, multiple evidence types, clear coverage limits. Do not describe cameras as proof of total reality.

### Sensor replay or substitution

A valid-looking sensor sequence may be replayed, copied from another device, or associated with the wrong shipment.

Mitigations: device/source identity, event/subject linkage, continuity checks, calibration context, signed device records where proportionate, independent spot checks.

### Collusive verification

A nominally separate verifier may be commercially or organizationally conflicted with the applicant.

Mitigations: verifier identity and qualification context, conflict disclosure, governance separation, multiple verifier options, public method/scope, appeal and re-review.

## 3. Digital integrity attacks

### Evidence replacement

Evidence is changed after a trust result is issued.

Mitigations: SHA-256 or equivalent digest, signed manifests, revision/supersession history, immutable audit metadata where appropriate.

### Key compromise

A private signing key is stolen or misused.

Mitigations: key purpose limitation, rotation, active/retired/revoked state, short validity where appropriate, credential/status re-evaluation, no private keys in public repositories.

### Registry equivocation

A Registry serves different trust states to different audiences.

Mitigations: signed descriptors/records, federation and mirroring, append-only transparency mechanisms where useful, source-preserving comparison, visible conflict rather than silent winner selection.

### Profile substitution

An operator evaluates against an easier or modified profile while displaying a familiar profile name.

Mitigations: exact profile ID/version pinning, signed or content-addressed profile releases in later versions, public evaluator version, CI fixtures.

## 4. Governance and economic attacks

### Pay-to-pass

Commercial relationships influence technical findings.

Mitigations: separate commercial ranking from conformance, requirement-level findings, conflict disclosure, auditable decision provenance, plural evaluators/registries.

### Badge laundering

A narrow high-level result is marketed as organization-wide safety or ethical perfection.

Mitigations: explicit scope, granular T-levels, no automatic inheritance, expiration, public limitations, prohibition on absolute claims.

### Standards capture

Large firms shape requirements so that only expensive proprietary systems can comply.

Mitigations: open governance, equivalent-evidence principle, cost/proportionality review, small-producer representation, public change history.

## 5. Public-review attacks

### False-report harassment

Crowdsourced reporting is used to target workers or businesses.

Mitigations: allegation/verdict separation, evidence requirements, rate/duplication controls in production systems, response opportunity, appeal, no reward for accusation alone.

### Sybil amplification

Many fake accounts create the appearance of independent corroboration.

Mitigations: do not equate report count with truth; evaluate evidence quality, provenance, independence, and review state.

## 6. Privacy and safety attacks

### Worker surveillance expansion

A transparency program gradually becomes continuous employee surveillance unrelated to product/process claims.

Mitigations: purpose limitation, process-over-person design, prohibited private areas, data minimization, audio-off default, retention limits, access controls, worker notice where appropriate.

### Public disclosure leakage

Sensitive personal, security, or trade-secret information is accidentally published as evidence.

Mitigations: public/restricted classification before upload, metadata-only restricted references, redaction review, least-publication principle, correction/takedown process that preserves trust-history metadata without preserving harmful content.

## 7. Availability and denial attacks

A Registry, evidence host, or issuer can disappear.

Mitigations: portable bundles, self-hostable evidence, multiple registries, stable identifiers, signed records, export/mirroring, visible unavailable state rather than fabricated continuity.

## 8. Non-goal

No threat-control set can prove perfect safety or eliminate fraud. Trust & Life aims to make important claims more inspectable, conflicts more visible, and reasons for trust more portable.