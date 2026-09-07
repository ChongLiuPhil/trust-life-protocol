# Governance

Trust & Life Protocol is intended to be an open public-interest specification. Its governance should make it difficult for any single marketplace, sponsor, vendor, or verifier to silently redefine what conformance means.

## 1. Separation of roles

The project distinguishes at least four roles:

- **Specification maintainers** develop and version open requirements.
- **Implementers** build software, hardware integrations, registries, or marketplaces that use the specification.
- **Evidence issuers / verifiers** produce or independently review evidence and attestations.
- **Commercial operators** may provide paid services using the protocol.

No commercial operator receives automatic authority to define protocol conformance merely because it operates a marketplace or contributes funding.

## 2. Normative changes

Changes to normative specifications should:

1. be proposed publicly through an issue or pull request;
2. state the problem being addressed;
3. identify compatibility, privacy, economic, and implementation effects;
4. receive a documented review period;
5. record the decision and major objections;
6. result in a versioned specification when accepted.

Breaking normative changes require a new major version or an explicitly marked incompatible profile.

## 3. Evidence over authority

The protocol should not ask users to trust the project merely because the project publishes a badge or registry entry.

Where practical, conformance status should link to the evidence, method, issuer, review state, validity period, and known limitations that justify it.

## 4. Conflicts of interest

A participant reviewing a proposal or verification decision should disclose material conflicts of interest when those conflicts could reasonably affect the decision.

When the same organization acts as marketplace operator, verifier, and commercial service provider, the implementation should make those roles visible and should provide an independent appeal path for disputed trust-sensitive decisions.

## 5. Appeals and corrections

Trust-sensitive decisions should be correctable. A conforming implementation should support:

- notice of the reason for an adverse decision;
- access to the relevant non-confidential evidence;
- an opportunity to respond;
- review by a person or body not responsible for the original decision where feasible;
- a public status indicating whether the matter is open, resolved, withdrawn, or superseded.

Corrections should preserve an audit history rather than silently rewriting the past.

## 6. Public-interest constraints

Normative requirements should be evaluated not only for technical feasibility but also for their effects on:

- worker dignity and privacy;
- small producers and small businesses;
- accessibility and cost of compliance;
- competition and market diversity;
- data minimization and security;
- consumers' ability to understand the actual strength of evidence.

A transparency requirement that creates unnecessary surveillance or makes participation feasible only for large firms should be treated as a design problem.

## 7. Initial project phase

During the early v0.x phase, the repository owner may merge changes directly while the governance model is being tested. Significant normative changes should still be documented publicly. The project should move toward multiple maintainers before representing the specification as mature or institutionally independent.
