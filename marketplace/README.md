# Marketplace — Optional Commerce Layer

Marketplace functionality is **optional** in Trust & Life.

The protocol is intended to make trust evidence portable across commerce channels. A producer or retailer may implement Trust & Life while selling through its own store, a physical shop, an independent marketplace, a procurement system, or no transaction platform at all.

## Role of a Trust & Life marketplace

A marketplace implementation MAY provide:

- product discovery;
- trust/evidence-aware product pages;
- QR or identifier resolution;
- ordering and fulfillment integrations;
- producer profiles;
- consumer education;
- optional low-cost platform services.

It MUST NOT redefine protocol conformance merely to favor products that transact through that marketplace.

## Separation of trust and ranking

Marketplace ranking is a commercial/user-experience function. Conformance is an evidential function.

If ranking uses trust-related information, the ranking logic SHOULD distinguish factors such as:

- conformance level;
- evidence freshness;
- evidence coverage;
- unresolved incidents;
- independently verified claims.

Paid placement, sponsorship, platform margin, or other commercial relationships MUST NOT be presented as stronger conformance.

## Pricing philosophy

Trust & Life does not require participating goods to be cheaper or more expensive than comparable goods.

The commerce layer SHOULD avoid designing conformance incentives around destructive low-price competition. The economic objective is sustainable participation across producers, workers, logistics providers, retailers, and consumers.

Implementations MAY support commitments related to fair purchasing practices or worker conditions, but such claims require their own measurable requirements and evidence. They MUST NOT be inferred merely from a product's participation in the transparency protocol.

## Commission and fees

The open protocol does not prescribe a commission model.

An operator may choose zero commission, cost-recovery fees, subscriptions, verification services, or other lawful models. Fees SHOULD be disclosed clearly and MUST remain institutionally separate from the definition of technical conformance.

## Responsible consumption

A Trust & Life marketplace SHOULD favor informative interfaces over manipulative ones. It should avoid misleading scarcity, deceptive countdowns, hidden fees, confusing defaults, or other dark-pattern techniques.

The intended role is closer to a trustworthy life-supply interface than an engine for maximizing unnecessary consumption.

## v0.1 status

No full marketplace is planned for protocol v0.1. The first consumer-facing experience should be a **verification page**, not a checkout page.
