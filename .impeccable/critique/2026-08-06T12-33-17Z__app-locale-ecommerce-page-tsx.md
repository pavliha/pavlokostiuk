---
target: the ecommerce page
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-06T12-33-17Z
slug: app-locale-ecommerce-page-tsx
---
Method: dual-agent (A: a989eaef1d335cb07 · B: a066c3527cd1c7705), run sequentially and isolated — neither saw the other's output.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 15,422px desktop / 22,576px mobile with no active nav state or scroll progress; submit label stays "Send it over" while sending |
| 2 | Match System / Real World | 3 | Copy is excellent; all 9 screenshots show an English UI on /ka, /ru, /uk, contradicting the 3-languages claim |
| 3 | User Control and Freedom | 2 | Success state destroys the form and everything typed, with no echo of the address and no edit path |
| 4 | Consistency and Standards | 1 | 8 filled indigo elements on a page whose named rule is one per viewport; nav CTA says "Send me your product list", the button it scrolls to says "Send it over" |
| 5 | Error Prevention | 2 | No inline validation, no format hint, nothing near the email field says what happens to it. Honeypot present and correct |
| 6 | Recognition Rather Than Recall | 2 | 18 non-interactive feature chips styled exactly like filter controls; no active-section indicator across 47 h3s |
| 7 | Flexibility and Efficiency | 2 | At 640–767px both the nav CTA and the sticky bar are hidden, leaving zero persistent CTA |
| 8 | Aesthetic and Minimalist Design | 2 | Sections are individually clean; the volume defeats the restraint — 10 h2, 47 h3, 159 li, 9 screenshots, 2 forms |
| 9 | Error Recovery | 2 | Mailto fallback is good; no field-level errors, and a config outage renders as a user-facing failure |
| 10 | Help and Documentation | 3 | "Why not just use Shopify?" and the price terms are genuinely good, but sit 9,000px past the form |
| **Total** | | **21/40** | **Acceptable** |

Two scores were raised from Assessment A's originals after review: heuristic 6 (1→2) because the chips are a discoverability trap rather than a memory demand, and heuristic 8 (1→2) because content is well-structured within each section and the failure is volume, not clutter.

## Design Specificity Verdict

**Partial — authored in the middle third, category-template at both ends. The ends are what people see first and last.**

Product-specific and genuinely uncopyable: the six PainFigure SVGs (shared 400×80 viewBox, Ledger for the broken present, Indigo for the resolved future, no text so they survive four locales); the StatLedger hero figure where a single numeral carries the entire positioning claim; the audit card reproducing real defects found in the author's own shop; and the warm-paper-and-hairline ground, which is itself an argument about record-keeping and therefore fits the job.

Category-interchangeable: the entire hero (badge pill → two-line h1 with line 2 in accent → muted body → filled button + text link → full-bleed screenshot with a border and shadow) is the default 2023–25 SaaS hero verbatim. So are the features chip row, the screenshot gallery, the 01–04 process, and the closing block — which is centered, the only centered composition on a page whose metaphor is a ledger. Ledgers have no centered entries.

**Deterministic scan:** the CLI detector returned **0 findings, exit 0** across all ten component files. This was verified non-vacuous — the same detector against `app/[locale]/page.tsx` (the homepage, outside this target) returns 4 findings including `gradient-text`. The mechanical floor on this surface is genuinely clean.

**Browser overlay** (injection succeeded, live server started on 8400 and confirmed stopped): **58 findings across 49 elements in 4 rules** — `line-length` ×32 (96–155 chars/line), `nested-cards` ×16, `kicker-above-heading` ×9, `overused-font` ×1.

Where they agree: `line-length` corroborates a manual finding that the Shopify reason list runs to `max-w-5xl`, violating DESIGN.md's own "never set body prose wider than max-w-2xl".

False positives: `kicker-above-heading` ×9 fires on the eyebrow pattern that DESIGN.md explicitly codifies as the system's only label mechanism — a documented decision, not slop. `overused-font` names the family "roboto", which is wrong; every node resolves to `ui-sans-serif` first and Roboto is the fifth fallback the headless browser landed on. The underlying observation (one family, 100% of text) is accurate and deliberate.

## Overall Impression

The craft is real and it is concentrated in the middle of the page. The pains section is the best work here by a distance, and the design system underneath it is coherent enough that a detector finds nothing to complain about. The problem is that the system's own central mechanism — one filled element per viewport, so that the filled thing means "act here" — is broken eight times over, and the page is long enough that the restraint stops reading as restraint and starts reading as sameness. The single biggest opportunity is subtraction, not addition.

## What's Working

**PainFigure's colour grammar is learnable.** By the third figure the reader knows indigo means "after", so six diagrams do argumentative work with no captions and no translation. Locale-proof by construction, which is load-bearing on a four-locale page.

**The hero figure obeys the system's own rule literally.** `1` at 72px, tabular, meaning one stock number across counter, warehouse and website. The loudest typographic object on the page and the strongest commercial fact are the same object.

**The audit card is the one proof a competitor cannot fabricate.** Its shape is unlike anything else on the page, so it reads as an artefact rather than as marketing — and it incriminates the author's own shop.

## Priority Issues

**[P0] `bg-card` does not respond to dark mode — four white islands on a near-black page.**
Why it matters: independently verified — `--card` correctly flips to `#1a1815`, but `bg-card` computes to `rgb(255,255,255)` in dark mode. Two `<summary>` disclosure buttons and both contact chips stay white. The `+` glyph on those summaries is `dark:text-brand-light` on white, measuring **1.99:1** — below any threshold. Seven `bg-card` usages exist repo-wide, so the blast radius is larger than this page.
Fix: resolve why `bg-card` compiles to a literal rather than tracking `--card`, then sweep all seven usages and re-verify in both themes.
Suggested command: `/impeccable audit`

**[P0] The sticky mobile bar outranks the real submit button at the moment of conversion.**
Why it matters: at 390px inside `#prototype`, the largest, most saturated, most thumb-reachable object on screen is a full-width indigo bar that scrolls to where the user already is — while the actual submit button sits smaller and mid-screen. The highest-value pixels on the site are spent on a no-op at the exact moment of the decision.
Fix: add an IntersectionObserver on `#prototype` in `StickyCallBar` and hide the bar while that section is visible. The component already owns a scroll listener.
Suggested command: `/impeccable adapt`

**[P1] The One Filled Thing Rule is broken eight times, dissolving the mechanism DESIGN.md calls the entire CTA affordance.**
Why it matters: eight elements render `rgb(88,80,236)` — the active locale pill, four "Send me your product list", "Send it over", "Send them", and the closing "Book a free call". Worst case is a language toggle permanently wearing the primary-action colour. The closing block compounds it: the page's last act is a filled button pointing at Calendly, a different action from the one the hero, nav, pains section and sticky bar all drive, with a newsletter form and its own filled button directly above.
Fix: locale pill to a wash-and-weight active state; newsletter submit to outline; closing CTA to the underlined text link the system already specifies; nav CTA hidden while `#prototype` is on screen. Replace the centered closing block with a left-aligned repeat of the prototype card so the page ends on the action it opened with.
Suggested command: `/impeccable quieter`

**[P1] The price section contains zero figures, in a system whose thesis is that figures are the argument.**
Why it matters: `$30`, `311 hours`, `two months` and `no commission` are all set inside 14px paragraphs. This is the one section where a shop owner does arithmetic, and the purpose-built `figure` utility — tabular numerals, `ss01`, tight tracking — is used nowhere in it. The page's most persuasive facts are rendered at disclaimer weight.
Fix: promote a figure row under the price heading — `0` monthly · `0` commission · `2` months of free fixes · `$30` an hour — reusing the existing StatLedger layout, and delete the equivalent prose so the figures replace text rather than duplicate it.
Suggested command: `/impeccable typeset`

**[P1] Dark mode has ten contrast failures and twelve touch targets are under 44px.**
Why it matters: nav links, the three inactive locale codes and the footer back-link all measure **3.11:1** in dark mode against a required 4.5. Light mode sweeps clean at 0 failures, so this is a dark-theme-only regression. Separately, 12 of 30 interactive elements fail 44×44 at 390px, including all four locale codes at roughly 28×20 — on a page whose audience is explicitly mobile-first shop owners.
Fix: darken `--muted-foreground` in `.dark` until nav links clear 4.5:1; pad the locale switcher and theme toggle to a 44px hit area without changing their visual size.
Suggested command: `/impeccable audit`

## Persona Red Flags

**Jordan (confused first-timer):** The 18 feature chips are `<span>`s styled `rounded-md bg-muted border` in a wrapped row — every visual signal says "filter tabs". He taps "Point of sale", nothing happens, and he now distrusts every other control. He clicks the nav CTA "Send me your product list" and lands on a button labelled "Send it over" — two names for the same act at the moment he needs certainty. The nav offers no "How it works" even though `#process` exists and answers his actual question. The hero image and the first gallery card are the same storefront, so he concludes the gallery repeats and skips the admin and POS proof.

**Riley (stress tester):** Submitting with the endpoint unset sets `state = "error"` before any network call — a deployment misconfiguration presented as his failure. Double-tapping submit changes nothing but `disabled`: no spinner, no label change, no aria-live. On success the entire form is replaced by one unstyled sentence with no echo of the address he typed, and on mobile the card collapses ~400px so the viewport lands on unrelated content. Opening both disclosure expanders grows the page past 19,000px with no collapse-all and no return anchor.

**Casey (distracted mobile user):** 22,576px of scroll — 26.7 screens — with no progress indicator and the price twelve screens past the form. Both form placeholders truncate mid-word at 390px ("Filament and 3D printers, kids' clothes," and "Your site, your Instagram, a spreadshee"), so the examples that make the field answerable are exactly what gets cut. The mobile header hides the brand and the CTA, leaving "Problems | Price" plus a four-item locale switcher and a theme toggle — two-thirds of the header width is language and theme, with no identity and no action.

## Minor Observations

- `page.tsx:176` gives `text-lg` to the first two pain headings and base size to the other four — an unjustified two-tier split among six peers that reads as a rendering bug.
- Six distinct uppercase micro-label treatments coexist where DESIGN.md specifies one.
- `rounded-xl bg-muted/40 border p-4` carries three unrelated semantics: pain promise, AI example prompt, and audit dialogue panel.
- In Georgian, uppercase does not exist — every eyebrow and LedgerGroup title degrades to tracked-out lowercase mkhedruli, so the system's only label mechanism is invisible in the primary market's language.
- The Georgian h1 wraps to three lines with a bad break; `-0.02em` tracking is tuned for Latin.
- The hero text column is `max-w-3xl` above a `max-w-5xl` image, so the optical column width changes mid-section.
- `#prototype` and `#price` share the identical `border-primary/30` treatment, so the conversion object has no visual privilege over the pricing object.
- Zero horizontal overflow at 390px, and light-mode contrast sweeps clean. Both confirmed by measurement.

## Questions to Consider

1. If `#features` — 18 chips, 9 groups, ~90 bullets, ~2,200px — were deleted and replaced with one sentence ("the full list comes with the audit I send you"), would you lose a single sale, or recover 2,200px of attention spent before anyone reaches the price?
2. The system's thesis is that figures are the argument. What does `#price` look like if `0`, `0`, `2` and `$30` are set at figure scale and everything else in that section is deleted rather than added to?
3. If you could keep exactly one filled indigo element on the whole page, which would it be? Whatever you answer implies the other seven become rules, washes or text links.
