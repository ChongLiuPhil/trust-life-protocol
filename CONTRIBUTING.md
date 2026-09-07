# Contributing

Contributions are welcome from producers, consumers, developers, food-safety professionals, logistics practitioners, privacy researchers, labor representatives, standards specialists, and other interested participants.

## Ways to contribute

You can contribute by:

- proposing or refining normative requirements;
- identifying ambiguity, unintended incentives, privacy risks, or implementation burdens;
- adding examples and test data;
- improving machine-readable schemas;
- building reference implementations;
- mapping Trust & Life requirements to established standards without copying restricted standards text;
- documenting real-world implementation experience.

## Before proposing a normative requirement

A normative requirement should answer five questions:

1. **What claim does this requirement support?**
2. **What evidence could reasonably demonstrate the claim?**
3. **Who produces or verifies that evidence?**
4. **What privacy, labor, security, and commercial risks does collecting the evidence create?**
5. **Can a small organization comply without disproportionate cost?**

Prefer measurable requirements over vague moral language.

## Requirement language

Normative documents use the following terms:

- **MUST / MUST NOT** — mandatory for the stated conformance profile.
- **SHOULD / SHOULD NOT** — strongly recommended; deviations require a documented reason.
- **MAY** — optional.

## Evidence quality

Do not treat the existence of a file, video stream, sensor, digital signature, blockchain entry, or certificate as proof that the underlying real-world claim is true. Contributions should distinguish:

- source identity;
- integrity of the record;
- completeness or coverage;
- interpretation of the record;
- independent verification of the underlying process.

## Privacy and dignity

Do not propose transparency mechanisms that unnecessarily expose workers, customers, private conversations, rest areas, homes, personal identifiers, or unrelated commercial information.

The project favors process observability and data minimization.

## Standards and copyright

It is appropriate to cite and map to standards such as GS1 EPCIS, HACCP frameworks, applicable laws, and other technical or safety standards. Do not paste copyrighted standards text into this repository unless its license explicitly permits redistribution.

## Pull requests

A pull request changing a normative standard should include:

- a concise rationale;
- affected requirements and profiles;
- expected benefits;
- foreseeable failure modes;
- privacy and cost implications;
- migration notes if compatibility changes.

During v0.x, maintainers may request experimental evidence before accepting requirements that impose substantial hardware, monitoring, or verification costs.
