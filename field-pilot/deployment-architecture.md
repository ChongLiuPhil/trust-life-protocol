# Field Pilot Deployment Architecture

The public reference repository should not become the production data plane.

## Four-zone model

### 1. Private intake zone

Contains real legal identity, authorization documents, private contacts, contracts, restricted facility details, and other onboarding material not intended for public disclosure.

Access: applicant-authorized staff and narrowly scoped pilot operators/reviewers.

### 2. Verification workspace

Contains evidence required for assessment, including restricted reports, media, logs, reviewer notes, and qualification/conflict records. The workspace may reference source systems rather than copying all raw data.

Access: qualified reviewers and explicitly authorized operators.

### 3. Public Registry projection

Contains only the minimum public representation needed to explain current scope and findings:

- participant/facility/product identifiers appropriate for public use;
- profile/version;
- current lifecycle state;
- requirement-level findings and limitations;
- public evidence metadata and safe links;
- integrity/signature/status information;
- current assessment and supersession references;
- incident/status information suitable for public disclosure;
- correction/appeal channels.

The v0.5 `publication.js` module demonstrates a projection guard; it is not a complete production privacy filter.

### 4. Operational/audit history

Stores lifecycle transitions, assessment versions, corrective actions, suspensions, approvals, appeals, key rotations, and other trust-sensitive decisions. History should be tamper-evident and access-controlled according to risk.

## Trust boundaries

Do not assume that because two components are operated by the same organization they deserve the same access. Separate credentials and permissions for intake, evidence review, Registry publication, and security/suspension functions where feasible.

## Production writes

The reference Registry is intentionally read-only. A real deployment should place authenticated write/ingestion APIs behind authorization, validation, rate limits, audit logging, malware/content controls where relevant, and data-classification enforcement. Public anonymous writes should not directly alter conformance state.

## Failure behavior

A production deployment should prefer visible degraded states over false confidence:

- source unavailable → disclose unavailable/stale status;
- credential status unknown → do not treat as active;
- assessment outdated → show stale/expired status;
- lifecycle suspended → block current public conformance projection;
- Registry peer conflict → expose source disagreement;
- evidence gap → record gap rather than reconstructing continuity.

## Backups and portability

Operators should be able to export profile, application, assessment, public projection, relevant evidence metadata, lifecycle history, and cryptographic references in portable formats. A participant should not lose the ability to demonstrate historical evidence merely because one marketplace or Registry operator disappears, subject to lawful retention limits.
