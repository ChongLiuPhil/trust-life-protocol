# GS1 EPCIS Mapping Profile — Draft v0.2

## Purpose

Trust & Life uses its own minimal trust bundle to express claims, evidence, verification states, incidents, and conformance. Supply-chain events SHOULD be represented or exportable using GS1 EPCIS when an implementation already uses GS1 identifiers or needs cross-company event interoperability.

The current GS1 artefact set is EPCIS 2.0.1 with CBV 2.0.0. EPCIS provides JSON/JSON-LD, REST/OpenAPI, a normative JSON Schema, SensorElement support, and certification information fields.

Official reference: https://ref.gs1.org/standards/epcis/artefacts

## Concept mapping

| Trust & Life | EPCIS direction |
| --- | --- |
| `subject` product/batch/shipment | EPC / EPC class / quantity element, depending on identification granularity |
| production or logistics occurrence | EPCIS event such as ObjectEvent, AggregationEvent, TransformationEvent, AssociationEvent, or TransactionEvent |
| `capturedAt` | `eventTime` when it represents the real-world event time; do not substitute capture/upload time silently |
| facility / observation point | `readPoint` and/or `bizLocation` |
| process step | CBV `bizStep` where a suitable vocabulary value exists |
| product state | CBV `disposition` where suitable |
| sensor evidence | `sensorElementList` / sensor reports |
| Trust & Life claim ID | namespaced extension linking the EPCIS event back to the Trust & Life claim |
| external certification reference | EPCIS `certificationInfo` where applicable, or a linked Trust & Life verification/credential |

## Rules

1. Implementations MUST NOT invent GS1 identifiers and represent them as assigned production identifiers.
2. A Trust & Life ID MAY be linked through a namespaced extension when no direct GS1 identifier mapping exists.
3. EPCIS event validity does not by itself establish Trust & Life T1–T3 status. Evidence and verifier requirements remain separate.
4. Sensor data SHOULD preserve original units and timestamps; transformations SHOULD be documented.
5. Trust & Life extensions MUST use a namespace controlled by the implementation or the project and MUST NOT redefine GS1 vocabulary terms.

## Example

See [`../examples/apple-supply-chain/epcis/events.jsonld`](../examples/apple-supply-chain/epcis/events.jsonld).

The identifiers in that file are synthetic and exist only to demonstrate mapping shape. Production deployments must use identifiers they are entitled to use and should validate exported events against the official EPCIS artefacts.
