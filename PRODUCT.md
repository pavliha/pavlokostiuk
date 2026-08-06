# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small business owners in Georgia who sell physical goods and already run a shop —
typically a physical counter plus some online presence (a website, an Instagram
account, or a marketplace listing on Glovo or Wolt). They have roughly 50–800
products, no in-house developer, and are usually the person who serves customers,
counts stock and prices goods.

Their job: sell online without their shop floor and their website disagreeing about
what is in stock, and without handing a percentage of every sale to a platform.

The buying moment is rarely idle curiosity. Shops go looking when they open a second
location, hire their first non-family employee, survive a New Year stock count that
did not reconcile, or notice that the website they paid for two years ago no longer
matches the shop.

## Product Purpose

A complete e-commerce system — storefront, admin, inventory, point of sale, payments
and financial reporting — built and personalised per customer, installed on that
customer's own hosting and database, and owned outright rather than rented.

Success is a shop owner running their business from one system instead of
reconciling several, with no monthly platform fee and no per-sale commission.

## Positioning

Sold as a complete online store the customer owns, not as a template or a rented
tenancy. The mechanism a neighbouring product cannot truthfully copy:

- The counter and the website draw down the same stock number; counter sales reduce
  web stock immediately and stock is re-checked at the moment of purchase.
- It runs on the customer's own hosting and their own database. The platform code
  remains the author's, licensed to the customer to run.
- No per-sale commission and no monthly platform fee, at any volume.
- Bank of Georgia payments, Georgian/Russian/English content, and Glovo/Wolt as
  distinct sales channels are already built and tested with real money.
- The store exposes itself as tools over the Model Context Protocol, so an AI
  assistant can read and change real data under the same permissions, validation and
  audit log as a human user.

## Operating Context

- Shops run a physical counter and a catalogue simultaneously; stock accuracy across
  both is the recurring operational failure.
- Orders arrive through several channels at once: the website, the counter, phone and
  messenger conversations, and marketplace apps.
- Staff are mixed-trust — an owner plus cashiers who need the till but not margins.
- Multilingual by necessity: Georgian, Russian and English customers in the same shop.
- Evaluation happens by conversation and by seeing the thing run, not by trials or
  self-serve signup.

## Capabilities and Constraints

- Delivered as one isolated instance per customer: separate database, separate
  deployment. No multi-tenancy.
- Per-customer variation must be expressible as configuration or data. Anything that
  requires new code goes into the core product for everyone, or does not happen.
- Bank and courier integrations are country-specific and quoted separately.
- Hosting is billed by the customer's own provider, in the customer's own account.
- Commercial terms: one setup fee, quoted after seeing the customer's catalogue; two
  months of free fixes after launch; change work billed hourly afterwards. No
  recurring revenue. A bug is defined as the platform not doing what it is documented
  to do; changing what it is documented to do is a feature.
- Capacity: 3–5 shops at a time (as of 2026-08-06 — a phase, not a permanent limit).
- The published setup fee is deliberately undecided; the page quotes no figure.

## Brand Commitments

- Operator and author: Pavlo Kostiuk, sole developer and the person customers deal
  with directly.
- Voice is plain, concrete and specific. It names real moments, times and numbers
  rather than adjectives, and states limitations openly — including telling a
  prospect when a rented platform would serve them better.
- Content ships in four locales (English, Georgian, Russian, Ukrainian) and message
  catalogues must stay key-aligned across all four.

## Evidence on Hand

- **into.ge** — the reference installation, live in production for a 3D-printing shop
  in Tbilisi. Storefront, admin, inventory, POS, Bank of Georgia checkout, three
  languages, 97 end-to-end tests.
- **Screenshots** of the running system at `public/screenshots/` — storefront, shop,
  product, services, admin dashboard, admin products, POS, inventory movements, MCP
  settings.
- **The build record** — the first installation took 311.7 hours (invoice
  INV-2026-001, 2026-08-06). Used on the page as an anchor, not as a price.
- **A real catalogue audit** run against into.ge's live data, which found defects in
  the author's own shop; reproduced verbatim on the page.
- **Unverified:** the "500+ creators across Georgia" figure originates from into.ge's
  own marketing copy and has not been confirmed as a measured count. It must be
  checked before any external use.
- **Absent, and must not be fabricated:** customer testimonials, named references,
  review scores, competitor pricing figures, and any customer count beyond into.ge
  itself. There is exactly one customer.

## Product Principles

1. **Everything that differs between customers is configuration, not code.** The
   moment a customer gets a fork, there are two products instead of one.
2. **Make installs cheaper each time.** The value of the work already done shows up
   as effective hourly rate on the next install, not as recurring revenue.
3. **The customer owns their business.** Their server, their database, their customer
   list, exportable in full at any time.
4. **State limitations before they are discovered.** Naming what the product does not
   do, and who should not buy it, is load-bearing rather than modest.
5. **Show the running system rather than describing it.** A prospect's own catalogue
   imported into a working store outperforms any argument about the store.

## Accessibility & Inclusion

No customer-specific standard has been established. Practical requirements observed
so far: the interface must work for non-technical staff on a phone or tablet at a
counter, and every surface ships in Georgian, Russian and English.
