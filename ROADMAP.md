# Trust & Life Protocol Roadmap

The roadmap is evidence-gated rather than version-number driven. A new feature or profile should exist because a real interoperability, governance, privacy, accessibility, or verification problem requires it—not because the project needs a higher version number.

## Completed foundation

### v0.1 — Evidence model

- Claim → Evidence → Verification → Conformance structure.
- Core and food-production transparency specifications.
- T0–T3 evidence-strength model.
- Privacy/process-transparency boundary.

### v0.2 — Verifiable evidence

- Actual SHA-256 evidence-byte verification.
- Consumer verification page.
- Registry API.
- EPCIS and Verifiable Credentials mapping direction.

### v0.3 — Cryptographic trust and federation

- Ed25519/JWS fixtures.
- Signed evidence manifest.
- Signed credential/status examples.
- Key lifecycle representation.
- Signed Registry descriptors and source-preserving peer federation.

### v0.4 — Pilot onboarding and explainable conformance

- `TL-ONBOARD-001` and `TL-CONF-001`.
- Machine-readable fresh-produce pilot profile.
- Deterministic requirement-level evaluator.
- Blocking-gap policy, correction, appeal, privacy, and independent-verifier rules.
- Positive and deliberately failing conformance fixtures.

### v0.5 — Field pilot operations and guarded publication

- Deployment-local Field Pilot Kit.
- Lifecycle states including live/suspended/withdrawn/completed.
- Publication guard shared by CLI and Registry.
- Positive live publication and negative suspended-publication tests.
- Pilot lifecycle/public-projection APIs and lifecycle-aware consumer view.
- Data inventory, evidence register, go-live gate, operator/incident runbooks, participant handbook, deployment topology, and pilot-plan template.

## Next gate — first real bounded field pilot

Before defining a broad v0.6 feature set, the project should learn from one deliberately narrow real deployment.

A suitable first field pilot should minimize variables:

- one willing participant organization;
- one facility or clearly bounded production site;
- one product class;
- one batch/lot or short bounded production scope;
- one relevant logistics handoff if feasible;
- one independently reviewed claim where appropriate;
- one deployment operator using a private intake/verification workspace;
- one public Registry projection and QR/resolver experience.

Real private data must not be committed to this public repository.

## Questions the first field pilot should answer

### Evidence burden

- Which requirements are expensive or difficult for a small producer to evidence?
- Where can equivalent lower-cost evidence work just as reliably?
- Which requested data are unnecessary and should be removed?

### Verification quality

- Can reviewers trace each public finding to sufficient evidence without excessive manual reconstruction?
- Which T3 qualification/independence rules need more explicit structure?
- How often do digital integrity and physical-world interpretation diverge?

### Process observability

- Can useful process transparency be achieved without continuous worker surveillance?
- How often do observation/sensor gaps occur, and can they be disclosed clearly?
- Which processes need recurring evidence versus event-based evidence?

### Consumer comprehension

- Do users understand scope boundaries?
- Can they distinguish `ready`, `live`, evidence integrity, independent verification, and product safety?
- Does the interface encourage informed inspection rather than false certainty?

### Operations and due process

- How quickly can the operator correct a factual error or suspend a misleading current result?
- Can old assessments remain auditable while a new assessment supersedes them?
- Is the appeal path usable and sufficiently independent?

### Economics and accessibility

- What are participant, verifier, and operator labor costs per evidence cycle/assessment?
- Do any requirements disproportionately exclude small organizations without a corresponding verification benefit?
- Can commercial services remain separate from conformance decisions?

## Post-pilot candidate work

Only after field evidence exists should the project decide which of these deserves implementation:

- revisions to `TL-FRESH-PRODUCE-001` based on observed burden/gaps;
- stronger verifier qualification and conflict-of-interest schemas;
- standardized conformance test vectors for third-party implementations;
- production-oriented credential status / Data Integrity profiles;
- improved Registry federation conflict and stale-data semantics;
- standardized evidence freshness/coverage metrics;
- deployment packages for a selected production environment;
- additional sector profiles such as logistics, warehousing, retail handling, or small-farm proportional compliance;
- multilingual consumer verification UX research;
- formal governance transition from owner-led v0.x maintenance toward multiple independent maintainers.

## Conditions for expansion

The project SHOULD NOT expand a pilot merely because it technically ran. Expansion should require evidence that:

1. the scope/result is understandable and not materially misleading;
2. privacy and worker impacts are acceptable and controllable;
3. blocking findings and suspension work in practice;
4. independent review is operationally credible;
5. evidence burden is proportionate, especially for small participants;
6. correction and appeal procedures actually function;
7. the public Registry can survive outages/changes without erasing provenance;
8. demonstrated value justifies additional operational complexity.

A decision to hold, simplify, or stop after a field pilot is a valid research outcome.
