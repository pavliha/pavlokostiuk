# Interface system — pavlokostiuk.cloud

## Direction

**Proof, not brochure.** The site's whole argument is that a claimed system is real and
checkable. The visual language borrows from records — the ledger, the goods-in book,
the audit log — rather than from SaaS marketing.

Feel: a cool neutral ground, quiet structure, one accent used sparingly. Hierarchy comes
from weight, size and air, not from boxes and borders.

## Signature — a box means "this is a real artifact"

Cards are reserved for things that actually exist and can be verified:

- product screenshots (`ScreenshotCard`)
- the live catalog-audit transcript
- the real AI prompts ("things you can just ask for")

Everything else — features, pricing terms, process steps, skills, bio — is a **ledger
entry**: a ruled heading, a hairline, and tick-marked lines. When everything is a card,
a card means nothing.

## Tokens

Domain-named, mapped onto shadcn's contract so its primitives inherit the palette.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#fbfbfc` | `#0c0d10` | the page ground |
| `--card` | `#ffffff` | `#141619` | artifacts only |
| `--ink` | `#16181d` | `#f4f5f7` | headings, hero figures |
| `--ink-2` | `#565d6b` | `#aeb5c0` | ledger body text |
| `--muted-foreground` | `#6b7280` | `#9aa1ad` | supporting/meta |
| `--rule` | `#e6e8ec` | `#24272d` | ledger hairlines |
| `--ledger` | `#b6bcc6` | `#4b525d` | the tick mark before a line |
| `--primary` | `#2f5cff` | `#4f74ff` | ~10% of the screen, buttons + the one decisive figure |
| `--brand-light` | `#2f5cff` | `#6b8cff` | accent text on that theme's ground |
| `--shot-ground` | `#f2f3f5` | `#141619` | the soft ground a screenshot is framed on |

Every value above is contrast-verified: all pass AA on both `--background` and `--card`.
Re-run the probes if any changes.

**Surfaces must not invert between themes.** `--card` sits above `--background` in both
(luminance 100.0 vs 98.5 light; 8.5 vs 5.1 dark). Do not introduce a mid-tone band between
them — `--secondary` is lighter than `--card` in dark and darker in light, so a section
band flips the elevation reading and breaks the one depth strategy.

## Hierarchy

- **One focal point per section.** Stats lead with a single hero figure (`text-6xl/7xl`,
  `font-bold`, tabular); supporting facts drop to `text-xl` on ledger rules.
- **Three levers, never size alone** — size + weight + colour. `--ink` for the figure,
  `--ink-2` for body, `--muted-foreground` for meta.
- **Tabular numerals on every real number** via the `figure` utility
  (`font-variant-numeric: tabular-nums`, `-0.045em` tracking). Signals measured, not marketing.
- The one commercially decisive number (`0%` commission) carries the only accent in the row.

## Spacing & density

- Base unit 4px. Section rhythm `py-20`.
- Ledger gutters `gap-x-14`, row gap `gap-y-9` — wide gutters do the separating work
  that borders used to.
- Cards keep `p-6`; ledger groups have no padding at all.

## Depth

**Borders and hairlines only** — no shadows except the one lift on the hero portrait.
Rules are `--rule`; nothing else divides.

## Component patterns

- `StatLedger` — hero figure + `<dl>` of supporting facts on a top rule, last item accented.
- `LedgerGroup` — 16px/600 heading in `--ink` over a bottom rule, then list items in
  `--ink-2` each with a 4px round `--ledger` tick at `mt-[0.6em]`. No uppercase: Georgian
  has none, so it would be invisible in `ka`.
- `LedgerNote` — top rule, bold title, muted body. For prose claims.
- `SkillEntry` — same as LedgerNote plus a leading icon.

## i18n constraint

Four locales: `en`, `ka`, `uk`, `ru`.

Ledger columns use **CSS grid, not `columns`**. Georgian and Ukrainian both run
noticeably longer than English, and multi-column flow breaks unpredictably across
scripts; grid is stable in all four. Verify any layout change in `ka` — the longest
script — before shipping it.

Message catalogues must stay key-identical to `en`. Check parity before committing, not
after: a missing key renders the raw key path in production.

## Verification bar

Before shipping UI here: 8 pages × 2 themes × 2 widths (32 combinations) must come back
with zero contrast failures, zero horizontal overflow, zero console errors, and all
Playwright tests green.
The gradient-clipped `h1` reports a false positive (`rgba(0,0,0,0)`) — ignore that one.

## Measurement and capture

`NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST` — both required, or PostHog does
not initialise at all. Pageviews are captured manually (the app router does not fire them
on client navigation) with `locale` and a locale-stripped `page` property, so the four
language versions can be compared.

`SUBSCRIBE_ENDPOINT` in `content/site.ts` — the newsletter form POSTs `{email, source}` as
JSON; the prototype form POSTs `{email, sell, link, source}` as JSON, or the same fields
plus one or more `catalog` file parts as `multipart/form-data` when a catalog is attached.
Both expect 2xx. **On any non-2xx the form shows a visible failure with a fallback mailto,
prefilled with what the visitor typed.** That is deliberate: a form that silently swallows
addresses is worse than one that admits it is not wired up.

PostHog is a build-time value in a static export — set it in Dokploy and redeploy, not at
runtime. The capture endpoint is a source constant, so it ships with the commit.
