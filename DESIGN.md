---
name: Pavlo Kostiuk — Owned E-commerce
description: Monochrome product marketing on a cool neutral ground, structured as a ledger and proved by real screenshots.
colors:
  background: "#fbfbfc"
  background-dark: "#0c0d10"
  card: "#ffffff"
  card-dark: "#141619"
  ink: "#16181d"
  ink-dark: "#f4f5f7"
  ink-2: "#565d6b"
  ink-2-dark: "#aeb5c0"
  muted-foreground: "#6b7280"
  muted-foreground-dark: "#9aa1ad"
  rule: "#e6e8ec"
  rule-dark: "#24272d"
  ledger: "#b6bcc6"
  ledger-dark: "#4b525d"
  primary: "#2f5cff"
  primary-dark: "#4f74ff"
  primary-foreground: "#ffffff"
  brand-strong: "#1e40ff"
  brand-strong-dark: "#8aa4ff"
  brand-light: "#2f5cff"
  brand-light-dark: "#6b8cff"
  secondary: "#f2f3f5"
  secondary-dark: "#1b1e22"
  shot-ground: "#f2f3f5"
  shot-ground-dark: "#141619"
  shot-glow: "#e8ebf2"
  shot-glow-dark: "#1c2030"
typography:
  display:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.55
  subhead:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  figure-supporting:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.045em"
  printed:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, monospace"
    fontSize: "1.875rem"
    fontWeight: 500
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Geist, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  control: "10px"
  shot-frame: "14px"
spacing:
  hairline-gap: "4px"
  tight: "8px"
  field: "12px"
  block: "16px"
  gutter: "24px"
  card-pad: "40px"
  ledger-gutter: "48px"
  ledger-gutter-wide: "56px"
  section: "80px"
  section-wide: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    backgroundImage: "linear-gradient(to bottom, color-mix(in oklch, {colors.primary}, white 10%), {colors.primary})"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    fontWeight: 500
    fontSize: "1rem"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 28px"
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), inset 0 0 0 1px rgba(0,0,0,0.08), 0 1px 2px color-mix(in oklch, {colors.primary}, transparent 70%), 0 6px 16px -6px color-mix(in oklch, {colors.primary}, transparent 55%)"
  button-primary-dark:
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.26), inset 0 0 0 1px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.40), 0 6px 16px -8px rgba(0,0,0,0.60)"
  button-primary-hover:
    backgroundImage: "linear-gradient(to bottom, color-mix(in oklch, {colors.primary}, white 20%), color-mix(in oklch, {colors.primary}, white 6%))"
  button-primary-active:
    backgroundImage: "linear-gradient(to bottom, {colors.primary}, color-mix(in oklch, {colors.primary}, black 8%))"
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.18), 0 1px 1px color-mix(in oklch, {colors.primary}, transparent 80%)"
    transform: "translateY(1px)"
  link-inline:
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    textDecoration: "underline"
    textUnderlineOffset: "4px"
  link-inline-hover:
    textColor: "{colors.brand-strong}"
  nav-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label}"
    padding: "0 8px"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.ink}"
  artifact-card:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.rule}"
    borderWidth: "1px"
    rounded: "{rounded.none}"
    padding: "{spacing.card-pad}"
  shot-frame:
    backgroundColor: "{colors.shot-ground}"
    borderColor: "{colors.rule}"
    borderWidth: "1px"
    rounded: "{rounded.shot-frame}"
    padding: "12px"
    boxShadow: "0 12px 32px -16px rgba(16, 18, 29, 0.22)"
  rule:
    backgroundColor: "{colors.rule}"
    height: "1px"
  ledger-tick:
    backgroundColor: "{colors.ledger}"
    size: "4px"
---

# Design System: Pavlo Kostiuk — Owned E-commerce

## Overview

**Creative North Star: "Proof, not brochure."**

The page argues that a claimed system is real and checkable, so it borrows from records —
the ledger, the goods-in book, the audit log — rather than from SaaS marketing. It refuses
decoration entirely: no metaphor, no illustration, no invented world. Every claim is welded
to a screenshot detail that proves it.

The surface is a single cool neutral ground running the whole scroll, divided only by
hairline rules. Structure comes from weight, size and air — never from fills or heavy
borders. A box appears only when something is a real artifact you could go and verify.

Eleven hairline rules and one framed screenshot carry the entire page. That restraint is
the design.

## Colors

Monochrome by construction: a single near-neutral ramp from `#fbfbfc` to `#16181d`, with
exactly one chromatic accent. The accent is a true blue (`#2f5cff`) and it appears on
roughly a tenth of the screen — primary actions, inline links, and the one commercially
decisive figure. Nothing else is coloured.

### Primary

| Token | Light | Dark | Use |
|---|---|---|---|
| `primary` | `#2f5cff` | `#4f74ff` | primary action, the one decisive figure |
| `primary-foreground` | `#ffffff` | `#ffffff` | label on the primary action |
| `brand-strong` | `#1e40ff` | `#8aa4ff` | link hover |
| `brand-light` | `#2f5cff` | `#6b8cff` | accent text on that theme's ground |

The accent stays saturated in both themes. It never inverts into a near-white ghost.

### Neutral

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#fbfbfc` | `#0c0d10` | the page ground, edge to edge |
| `card` | `#ffffff` | `#141619` | artifacts only |
| `ink` | `#16181d` | `#f4f5f7` | headings, hero figures |
| `ink-2` | `#565d6b` | `#aeb5c0` | ledger body text |
| `muted-foreground` | `#6b7280` | `#9aa1ad` | supporting and meta |
| `rule` | `#e6e8ec` | `#24272d` | every hairline |
| `ledger` | `#b6bcc6` | `#4b525d` | the tick before a ledger line |

### Named Rules

- **One accent, ~10% coverage.** If a second colour is needed, the design is wrong.
- **Surfaces never invert between themes.** `card` sits above `background` in both
  (luminance 100.0 vs 98.5 light; 8.5 vs 5.1 dark). Do not introduce a mid-tone section
  band: `secondary` is darker than `card` in light and lighter in dark, so a band flips the
  elevation reading.
- **`secondary` is for component interiors only** — muted inputs, quoted blocks — never as
  a full-width section fill.
- Every token has a dark counterpart. There is no light-only value.

## Typography

One family, Geist, at four weights. Geist Mono appears only where a figure is set in the
`printed` style. Georgian falls through to Noto Sans Georgian on the same metrics.

Georgian has no uppercase, so no hierarchy anywhere depends on `text-transform`.

### Hierarchy

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| display (`h1`) | `clamp(2.5rem, 6vw, 3.5rem)` → 56px | 500 | 1.04 | `-0.028em` |
| headline (`h2`) | `clamp(1.875rem, 3.6vw, 2.5rem)` → 40px | 600 | 1.04 | `-0.028em` |
| title (`h3`) | 18px | 600 | 1.55 | normal |
| subhead | 18px | 400 | 1.6 | normal |
| body | 16px | 400 | 1.55 | normal |
| hero figure | 72px | 700 | 0.9 | `-0.045em` |
| supporting figure | 20px | 600 | 1.4 | `-0.045em` |
| label | 14px | 400 | 1.55 | normal |
| caption | 12px | 400 | 1.4 | normal |

### Named Rules

- **Three levers, never size alone.** Size + weight + colour together: `ink` for the
  figure, `ink-2` for body, `muted-foreground` for meta.
- **Large type is tracked in.** Anything above 32px carries `-0.028em`; figures carry
  `-0.045em`. Untracked large type reads as a document, not a design.
- **Tabular numerals on every real number**, via the `figure` utility. Signals measured,
  not marketing.
- **Headings balance.** `text-wrap: balance` on `h1` and `h2` so no heading orphans a word
  — this matters most in `uk` and `ka`, which run longest.

## Layout

- Container `max-w-6xl` (1152px), gutters `px-6` rising to `px-10`.
- Section rhythm `py-24` (96px), with `py-20` (80px) for the short stakes section.
- Ledger column gutters run 40–56px, most commonly `gap-x-12` (48px); wide gutters do the
  separating work that borders would.
- Hero is a two-column grid at `lg`, `1.05fr / 1fr`, aligned to the top — the claim and the
  screenshot are co-equal, neither dominating.

### Named Rules

- **Sections are divided by a rule, not by a fill.** One `1px` `rule` line inside the
  container, never a full-bleed band.
- **Content width is capped independently of container width.** Prose sits at `max-w-2xl`
  or `max-w-3xl` so the measure stays readable while the container stays wide.
- **Ledger columns use CSS grid, never `columns`.** Georgian and Ukrainian run noticeably
  longer than English and multi-column flow breaks unpredictably across scripts.

## Elevation & Depth

**Hairlines for structure; depth only where something is physical.** Sections, ledgers and
cards are separated by 1px rules and air — never by a shadow. Exactly two things in the
design are lifted, and both are objects you are meant to read as physical: the hero
screenshot frame, and the primary control.

### Shadow Vocabulary

| Name | Value | Applied to |
|---|---|---|
| `shot-lift` | `0 12px 32px -16px rgba(16, 18, 29, 0.22)` | the hero screenshot frame |
| `shot-lift-dark` | `0 12px 40px -16px rgba(0, 0, 0, 0.75)` | same, dark theme |
| `control-face` | `inset 0 1px 0 white/20%`, `inset 0 0 0 1px black/8%` | the lit top edge of the primary control |
| `control-lift` | `0 1px 2px primary/30%`, `0 6px 16px -6px primary/45%` | primary control, light theme |
| `control-lift-dark` | `0 1px 2px black/40%`, `0 6px 16px -8px black/60%` | primary control, dark theme |

### Named Rules

- **A tinted shadow in light, a neutral shadow in dark.** The accent-tinted lift reads as a
  shadow on a white ground but as a *glow* on a dark one, so the dark theme drops to black.
  This is why `control-lift` has a separate dark value rather than a shared one.
- **The lit edge is what makes a control feel physical** — a 1px inset white highlight along
  the top plus a ~4% vertical gradient in the fill. Both are below the threshold of reading
  as "a gradient"; they read as a surface with a light source above it.
- **Never fade a solid control on hover.** Opacity lets the page show through and muddies
  the fill. The primary control brightens instead (L 0.598 → 0.643) and presses in on
  `:active` — inset shadow, lift removed, `translate-y-px`.
- **A screenshot is always framed on `shot-ground`,** never placed directly on the page —
  white product chrome on a near-white page has no edge otherwise.

## Shapes

- Controls are `10px` (`--radius`).
- The screenshot frame is `14px`, its inner image `10px` — concentric, outer = inner + padding.
- Artifact cards and ledger blocks are square (`0`). The ledger has no rounded corners.

### Named Rules

- **Nested radii are concentric.** Never the same radius on a parent and its padded child.

## Components

### Buttons

Primary is the only filled control: `primary` ground, white label, 52px tall, `0 28px`
padding, `10px` radius. Long localized labels wrap rather than overflow — the CTAs carry
`whitespace-normal` with `h-auto min-h-13`, because every label runs long in at least one
of the four locales.

### Cards / Containers

`card` ground, `1px` `rule` border, square, `40px` padding. **Reserved for real artifacts**
— product screenshots, the live catalog-audit transcript, the real AI prompts. Features,
pricing terms, process steps and bio are ledger entries, not cards. When everything is a
card, a card means nothing.

### Stat Ledger (signature)

The page's focal-point mechanism. One hero figure at 72px/700 with its label set beside it
on the baseline, a muted note beneath, then the supporting figures on a top rule at
20px/600 — the last of which carries the accent. This is how a section gets a focal point;
a flat row of equal-sized numbers is the failure mode it exists to prevent.

### Ledger Group (signature)

A 16px/600 `ink` heading over a bottom rule, then list items at 16px/1.55 in `ink-2`, each
preceded by a 4px round `ledger` tick set at `0.6em` so it aligns to the first line's
x-height. No padding, no fill, no box.

### Navigation

Fixed, `background/80` with `backdrop-blur-md` and a bottom border. Links at 14px in
`muted-foreground`, 44px minimum hit height, resolving to `ink` on hover.

## Do's and Don'ts

### Do:

- Divide sections with a hairline rule inside the container
- Build hierarchy from weight, size and air
- Lead a stat section with one large figure and accent only the decisive number
- Frame every screenshot on `shot-ground`
- Keep the accent under roughly 10% of the screen
- Cap prose measure independently of the container
- Verify any layout change in `ka` — the longest script — before shipping it

### Don't:

- Fill a section with `secondary` to create rhythm — it breaks the depth model and inverts
  between themes
- Add a decorative gradient, a glow, a backdrop pattern, or a tilted screenshot
- Put a shadow on anything but the hero screenshot frame and the primary control
- Carry the accent-tinted shadow into dark mode — on a dark ground it becomes a glow
- Fade a solid control with opacity on hover; brighten the fill instead
- Make everything a card
- Rely on `text-transform: uppercase` for hierarchy — it is invisible in `ka`
- Let a heading or figure sit at default tracking above 32px
