# Reference Implementation v0.3

The reference implementation remains dependency-free and uses Node.js built-in cryptography.

## Verify everything

```bash
cd reference-implementation
npm run verify
```

This checks:

1. cross-object trust semantics;
2. actual SHA-256 evidence bytes;
3. Ed25519 JWS signatures on evidence manifests;
4. the detached JWS securing the VC 2.0 demonstration payload;
5. signed credential status;
6. signed primary and peer registry descriptors.

No private signing keys are committed to the repository.

## Run the Registry

```bash
npm run serve
```

Open:

`http://127.0.0.1:8080/verify?subject=tl%3Asubject%3Aapple-2026-0001`

Useful endpoints include `/.well-known/trust-life-registry`, `/v1/federation`, `/v1/keys`, and `/v1/credentials/{credentialId}/status`.

## Interpretation

A valid signature means the signed bytes were produced by a holder of the corresponding private key. It does not prove that the signer was competent, legally authorized, honest, or factually correct. Authority and truth remain separate verification layers.
