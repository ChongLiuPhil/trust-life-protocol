# Credential fixtures

`lab-attestation.vc.json` is an **unsecured demonstration payload** using the W3C Verifiable Credentials Data Model 2.0 structure.

It has no `proof` and therefore must not be called a cryptographically verified credential.

The reference command:

```bash
cd reference-implementation
npm run verify:vc
```

checks basic v2 data-model structure and reports the absence of a securing proof as a warning.

A later implementation can add a real issuer key, controlled identifier, status method, and W3C-approved securing mechanism. Production key management is intentionally outside this demo fixture.
