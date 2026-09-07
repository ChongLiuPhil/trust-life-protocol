# Trust & Life Machine-Readable Schemas

v0.3 extends the portable trust bundle with cryptographic and federation objects.

Core schemas include organizations, subjects, claims, evidence, verification, incidents, conformance, public keys, signed evidence manifests, registry descriptors, credential status, and the top-level bundle.

JSON Schema validates shape. The reference implementation separately checks cross-object relationships, actual evidence hashes, Ed25519 signatures, key validity, credential status, and federation descriptor signatures.

None of these checks establishes factual truth, legal compliance, or food safety.
