# Interface system — pavlokostiuk.cloud

## Direction

**Proof, not brochure.** The site's whole argument is that a claimed system is real and
checkable. The visual language borrows from records — the ledger, the goods-in book,
the audit log — rather than from SaaS marketing.

Feel: warm paper, quiet structure, one accent used sparingly. Hierarchy comes from
weight, size and air, not from boxes and borders.

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
| `--background` | `#faf9f7` | `#12110f` | warm paper, never cool zinc |
| `--card` | `#ffffff` | `#1a1815` | artifacts only |
| `--ink` | `#1a1917` | `#f5f3ef` | headings, hero figures |
| `--ink-2` | `#57534a` | `#b5afa4` | ledger body text |
| `--muted-foreground` | `#66625a` | `#a09a8f` | supporting/meta |
| `--rule` | `#e5e1da` | `#2a2723` | ledger hairlines |
| `--ledger` | `#c9c3b8` | `#4a453d` | the tick mark before a line |
| `--primary` | `#5850ec` | `#5850ec` | ~10% of the screen, buttons + eyebrows |
| `--brand-light` | `#4338ca` | `#a5b4fc` | accent text on that theme's ground |

Every value above is contrast-verified: all pass AA on both `--background` and `--card`.
Re-run the probes if any changes — warm grounds are less forgiving than zinc.

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
- `LedgerGroup` — 11px/600 uppercase heading in accent, `0.1em` tracking, bottom rule,
  then `pl-4` list items each with a 6×1px `--ledger` tick at `top-[0.62em]`.
- `LedgerNote` — top rule, bold title, muted body. For prose claims.
- `SkillEntry` — same as LedgerNote plus a leading icon.

## i18n constraint

Ledger columns use **CSS grid, not `columns`**. Georgian and Ukrainian both run longer
than English and
multi-column flow breaks unpredictably across scripts; grid is stable in all three.
Verify any layout change in `ka` before shipping it.

## Verification bar

Before shipping UI here: 6 pages × 2 themes × 2 widths must come back with zero contrast
failures, zero horizontal overflow, zero console errors, and 9/9 Playwright tests green.
The gradient-clipped `h1` reports a false positive (`rgba(0,0,0,0)`) — ignore that one.
