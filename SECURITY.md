# Security policy

Trust & Life handles trust-sensitive metadata, evidence references, signatures, and potentially privacy-sensitive operational information. Security reports should minimize further exposure.

## Please report

- signature or digest verification bypasses;
- path traversal or unintended file disclosure;
- incorrect credential-status handling;
- Registry federation source-confusion or signature-confusion bugs;
- evaluator logic that can turn a blocking gap into a ready decision;
- public/private data-boundary failures;
- injection or unsafe rendering in the public verification page.

## Do not publish secrets

Never include private signing keys, passwords, API tokens, raw personal records, confidential business documents, or other secrets in a public issue or pull request.

If the repository has GitHub private vulnerability reporting enabled, prefer that channel for security-sensitive reports. Otherwise, use a private maintainer contact channel when available and use public issues only for reports that contain no exploit secret or sensitive data.

## Demonstration keys

The repository may contain synthetic **public** keys and signatures for test fixtures. Private signing keys MUST NOT be committed. A demo public key MUST NOT be interpreted as an identity credential for a real organization.

## Supported status

The repository is a draft reference implementation. Security controls are suitable for protocol experimentation and CI fixtures, not yet a production security certification or deployment hardening claim.