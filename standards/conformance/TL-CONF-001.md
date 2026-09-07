# TL-CONF-001 — Explainable Conformance Assessment

**Status:** Draft v0.4  
**Depends on:** TL-CORE-001, TL-ONBOARD-001

## 1. Purpose

TL-CONF-001 defines how a Trust & Life implementation evaluates a scoped application against a machine-readable profile without collapsing the result into an unexplained trust score.

Conformance is a statement about satisfaction of specified Trust & Life requirements within a declared scope. It is not a legal certification, safety guarantee, moral ranking, or permanent endorsement.

## 2. Requirement classes

A machine-readable profile SHOULD distinguish:

- **blocking** requirements — failure prevents a publishable ready state;
- **advisory** requirements — gaps remain visible but do not by themselves prevent a pilot-ready state;
- **conditional** requirements — apply only when a declared product/process condition is present.

### TL-CONF-001-R001 — Requirement identifiers

Every evaluated requirement MUST have a stable identifier, title, requirement class, assessment method, and source-standard mapping where applicable.

### TL-CONF-001-R002 — Version pinning

An assessment MUST identify the exact profile version used.

## 3. Finding states

A requirement-level finding SHOULD use one of:

- `pass` — stated machine-checkable conditions are satisfied;
- `gap` — required information/evidence is missing or insufficient;
- `blocked` — a policy condition prevents a passing decision regardless of otherwise available evidence;
- `not-applicable` — permitted by the profile and justified for the declared scope;
- `manual-review` — automated evidence is insufficient for a final finding.

### TL-CONF-001-R010 — Evidence explanation

Each non-trivial finding MUST expose the basis for the result, including relevant claim IDs, evidence IDs, declarations, incident IDs, or missing conditions.

### TL-CONF-001-R011 — Determinism

For machine-checkable requirements, the same profile version, application, evidence bundle, and evaluator version SHOULD produce the same result.

### TL-CONF-001-R012 — Manual review boundary

An evaluator MUST NOT fabricate a passing result for a requirement that the profile designates as requiring qualified manual or independent review.

## 4. Level checks

### TL-CONF-001-R020 — Minimum evidence level

If a requirement specifies a minimum T-level, the evaluator MUST reject a lower-level claim as satisfying that requirement.

### TL-CONF-001-R021 — Independent verification

If a requirement requires independent verification, the evaluator MUST confirm that the qualifying verification is associated with a verifier distinct from the responsible organization for the evaluated subject and has an acceptable current status.

### TL-CONF-001-R022 — Evidence category

Where the profile specifies acceptable evidence categories, a claim MUST link to at least one permitted category unless the profile explicitly defines another aggregation rule.

## 5. Incident policy

### TL-CONF-001-R030 — Incident blocking

A profile MAY define unresolved incident severities or states that block publication. The exact rule MUST be machine-readable or explicitly marked for manual review.

### TL-CONF-001-R031 — Allegation distinction

Unverified reports MUST NOT automatically become verified blocking incidents merely because they exist.

## 6. Overall decision

A reference implementation MAY use:

- `ready` — every blocking requirement passes or is validly not applicable, with no blocking policy condition;
- `ready-with-advisories` — all blocking requirements pass but advisory gaps remain;
- `not-ready` — one or more blocking requirements is gap/blocked/manual-review when a final ready state requires completion.

### TL-CONF-001-R040 — No averaging away blockers

A blocking failure MUST NOT be hidden by a high numeric average from unrelated passing requirements.

### TL-CONF-001-R041 — Lowest-claim rule

An overall T-level MUST NOT exceed the weakest included claim unless the applicable domain profile defines and justifies a different aggregation method.

### TL-CONF-001-R042 — No universal trust score

A Trust & Life implementation SHOULD NOT convert heterogeneous dimensions such as privacy, process evidence, laboratory findings, incidents, wages, or environmental claims into a single universal moral or trust score.

## 7. Decision provenance

An assessment MUST include:

- assessment ID;
- application ID;
- profile ID/version;
- evaluator implementation/version;
- evaluation timestamp or declared evaluation time;
- requirement-level findings;
- overall decision;
- blocking gaps;
- advisories;
- limitations and non-certification notice.

## 8. Corrective action

### TL-CONF-001-R050 — Gap linkage

Corrective actions SHOULD link to the requirement finding they address.

### TL-CONF-001-R051 — Re-evaluation

Closing a corrective action MUST NOT silently change the historical assessment. A new assessment or revision SHOULD record the changed evidence and outcome.

## 9. Appeals

### TL-CONF-001-R060 — Appeal target

An appeal MUST identify the decision or finding being challenged.

### TL-CONF-001-R061 — Reasoned disposition

An appeal disposition SHOULD state whether the prior finding is upheld, modified, remanded for new review, or superseded, and SHOULD preserve links to both old and new states.

## 10. Reference evaluator boundary

A reference evaluator MAY automate structural, relationship, integrity, level, evidence-category, declaration, and incident-policy checks. It MUST state which questions remain outside automation, including factual truth, legal compliance, professional qualification, laboratory method validity, and product safety.
