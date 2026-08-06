---
name: Pavlo Kostiuk — Owned E-commerce
description: A two-colour thermal till roll that prints the case for a shop the owner owns outright.
colors:
  thermal-red: "#d81f26"
  thermal-red-deep: "#a8161c"
  price-gun-orange: "#ff5c1a"
  printhead-black: "#14161a"
  carbon-grey: "#3f4a50"
  printhead-grey: "#8b979d"
  hairline-grey: "#c9d2d6"
  muted-ink: "#5b666c"
  roll-white: "#fbfcfc"
  thermal-white: "#eef1f2"
  passed-grey: "#e2e7e9"
typography:
  display:
    fontFamily: "Fira Sans Condensed, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 11vw, 5.4rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Fira Sans Condensed, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 9vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  title:
    fontFamily: "Fira Sans Condensed, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  subhead:
    fontFamily: "Archivo, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  figure:
    fontFamily: "Roboto Mono, ui-monospace, SF Mono, monospace"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  label:
    fontFamily: "Roboto Mono, ui-monospace, SF Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  caption:
    fontFamily: "Archivo, Noto Sans Georgian, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.375
rounded:
  none: "0"
  diagram-node: "4px"
  diagram-capsule: "10px"
spacing:
  hairline-gap: "4px"
  tight: "8px"
  field: "12px"
  block: "16px"
  gutter: "24px"
  tear: "32px"
  column-gap: "48px"
  section: "80px"
components:
  price-label:
    backgroundColor: "{colors.price-gun-orange}"
    textColor: "{colors.printhead-black}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  price-label-compact:
    backgroundColor: "{colors.price-gun-orange}"
    textColor: "{colors.printhead-black}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  link-inline:
    textColor: "{colors.thermal-red}"
    typography: "{typography.body}"
  link-inline-hover:
    textColor: "{colors.thermal-red-deep}"
  roll-panel:
    backgroundColor: "{colors.roll-white}"
    rounded: "{rounded.none}"
    padding: "24px"
  roll-panel-wide:
    backgroundColor: "{colors.roll-white}"
    rounded: "{rounded.none}"
    padding: "40px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.printhead-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "48px"
  locale-select:
    backgroundColor: "transparent"
    textColor: "{colors.printhead-black}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "44px"
  nav-link:
    textColor: "{colors.carbon-grey}"
    typography: "{typography.label}"
    padding: "0 8px"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.thermal-red}"
---

# Design System: Pavlo Kostiuk — Owned E-commerce

## Overview

**Creative North Star: "The Till Roll You Keep"**

The page is the artifact the counter prints. Every surface behaves like a continuous
thermal receipt unspooling down the viewport: an unbroken roll of near-white stock,
divided not by cards or containers but by perforated dot rules where the paper would
tear. Content is stamped onto the roll rather than placed on top of it. There is no
floating panel, no lifted card, no drop-shadowed hero — only what a two-colour
printhead could physically put down: black at full density, thermal red for totals and
voids, and a single unprinted object, the fluorescent price-gun label, stuck on at an
angle.

The density is a printout's: full-bleed to the roll's edges with generous vertical
silence between tear lines, columns separated by wide gutters and hairline rules
instead of boxes. Type does the structural work. Heavy condensed caps are stamped at
roll width for headlines; a quiet grotesque carries every sentence a human reads;
monospace is reserved strictly for figures, codes and chrome — never for prose. The
palette is cold, not warm: the paper is grey-blue thermal stock, never cream.

Two rejections are load-bearing and confirmed by the build. It refuses the centred
hero-plus-screenshot arrangement the category ships — the first viewport is a
left-weighted stamped headline with the product shot as a co-equal column, not a
centred pitch above a device mock. And it refuses the warm-paper editorial ledger
that preceded it here: no cream, no indigo, no system sans, no serif.

**Key Characteristics:**
- Continuous roll, not stacked cards — sections are divided by perforation, not elevation
- Zero corner radius on every authored surface; borders are hairlines, never heavy strokes
- Exactly one unprinted element per screen: the fluorescent price-gun label CTA
- Monospace is a figures-and-chrome material, never a body material
- Full light and dark roll, with red brightening rather than the paper going warm
- Diagrams carry meaning without labels: grey stroke is the broken present, red is the resolved future

## Colors

A two-colour thermal print on cold grey-white stock, with one fluorescent adhesive
accent that reads as physically stuck on rather than printed.

### Primary
- **Thermal Red** (`#d81f26`, brightening to `#ff3b41` on the dark roll): The printhead's
  second colour. It carries totals, figures, void markers, the resolved line in every
  diagram, list bullets, step numbers, inline links, the caret and the selection
  highlight. It is the only hue in the system with authority.
- **Thermal Red Deep** (`#a8161c`, lifting to `#ff6a6f` on the dark roll): The hover state
  of any red link or red text. Never used at rest.

### Secondary
- **Price-Gun Orange** (`#ff5c1a`, softening to `#ff7a3d` on the dark roll): The adhesive
  label. Reserved exclusively for primary calls to action — the hero label, the sticky
  mobile bar, the submit button, the nav CTA, the disclosure toggles. It is never a
  background, never a text colour, never a border.

### Neutral
- **Printhead Black** (`#14161a`): Full-density ink. All headings, stamped type, and any
  text sitting on the orange label. Inverts to the paper colour on the dark roll.
- **Carbon Grey** (`#3f4a50`): Body prose. Slightly lifted off full black so stamped
  headings stay the darkest thing on the roll.
- **Muted Ink** (`#5b666c`): Captions, footnotes, figure labels, disclaimers.
- **Printhead Grey** (`#8b979d`): The greyed pass — where the head touched but did not
  burn. Dotted tear rules, diagram strokes for the unresolved state, field underlines,
  scrollbar thumb, the nav's bottom edge.
- **Hairline Grey** (`#c9d2d6`): Every structural rule and panel border in the system.
  One pixel, always.
- **Passed Grey** (`#e2e7e9`): The only tonal fill — quoted promise blocks and audit
  findings, always at 60% opacity behind a red left edge.
- **Roll White** (`#fbfcfc`): The paper itself. Every section surface and every inset panel.
- **Thermal White** (`#eef1f2`): The page beneath the roll, one step cooler and darker so
  the roll's edge reads as a physical object.

### Named Rules
**The One Unprinted Object Rule.** Price-gun orange is the only colour a thermal head
cannot produce. It appears on primary actions only, at most once per viewport, and
always with black type on it. If two orange objects are visible at once, one of them is
not a primary action.

**The Cold Stock Rule.** The paper is grey-blue, never cream, ivory or warm white. Any
neutral introduced must sit on the same cold axis as `#eef1f2` / `#fbfcfc`.

**The Red Means Resolved Rule.** In every diagram, chart and step list, grey stroke is
the broken present and red is the resolved future. Red is never decorative and never
signals danger here — the destructive role is a separate token that the page does not use.

## Typography

**Display Font:** Fira Sans Condensed (600/700/800, self-hosted, `--font-stamp`)
**Body Font:** Archivo (400/500/600, self-hosted, `--font-body`)
**Label/Mono Font:** Roboto Mono (400/500/700, self-hosted, `--font-printout`)

**Character:** Condensed caps stamped hard enough to bruise the paper, set against a
plain-spoken grotesque that never raises its voice, with a monospace that shows up only
where a machine would have printed digits. Georgian and Cyrillic are covered by the
loaded subsets plus a Noto Sans Georgian fallback in every stack — the page ships in
four locales and the type ramp must survive all of them.

### Hierarchy
- **Display** (800, `11vw` fluid capping at `5.4rem`, line-height 0.92, uppercase): The page
  headline only. Constrained to `18ch` so it wraps at roll width instead of running thin.
- **Headline** (800, `9vw` fluid, `3rem` from small, `3.75rem` from large, uppercase): Section
  titles. Capped at `max-w-3xl`, and the only heading level allowed to hit viewport-scale type.
- **Title** (800, `1.125rem`–`1.5rem`, uppercase): Panel and group headings, plan steps,
  screenshot captions, form labels. Same stamped treatment at small scale.
- **Subhead** (400, `1.125rem`–`1.25rem`, line-height 1.5–1.6): The sentence under a headline.
  Held to `max-w-2xl`.
- **Body** (400, `1rem`, line-height 1.55): Every paragraph and list item. Long-form
  explanatory prose loosens to 1.7. Column width is governed by grid gutters, not by a
  character cap, except in prose blocks held to `max-w-3xl`.
- **Figure** (mono 700, `1.5rem`–`2.25rem`, tabular): Stat values and price figures. Red at
  page scale, black in the authority row.
- **Label** (mono 400, `0.8125rem`): Navigation, locale switcher, form input text, step
  numbers, list markers. Occasionally uppercase at `0.6875rem` for speaker tags.
- **Caption** (400, `0.75rem`, muted): Figure labels, footnotes, scarcity notes, copyright.

### Named Rules
**The Figures-Only Mono Rule.** Roboto Mono carries numbers, codes, step markers, list
glyphs and interface chrome. It never sets a sentence a human reads. If a mono run
exceeds a short phrase, it is the wrong font.

**The Stamped-or-Set Rule.** A heading is either stamped (condensed 800, uppercase,
line-height 0.92) or it is plain body semibold. There is no third heading style, and
Archivo is never set in caps.

**The Sixteen Rule.** Root size is exactly 16px and body line-height exactly 1.55. This
is canonical, not inherited default — no surface may shrink base prose below `1rem`.

## Layout

The page is a single continuous roll: sections are full-bleed `width: 100%` surfaces
painted with the roll background, padded `24px` at mobile, `40px` from small, `64px` from
large, with `80px` of vertical breathing above and below. No max-width container wraps
the page; only the fixed navigation is centred and capped (`max-w-5xl`). Content blocks
inside a section take their own caps — `max-w-2xl` for subheads, `max-w-3xl` for prose and
grouped lists, `max-w-5xl` for two-column lists.

Between sections sits a `32px` roll strip carrying a dotted tear rule at its vertical
centre: the perforation. It is the only section divider in the system. Some adjacent
sections deliberately share a roll with no perforation between them, which reads as one
continuous printed block.

Grids are content-count-driven, not a fixed 12-column: two columns from `sm` for paired
lists, three or four from `xl` for value props and price figures, `1.05fr 1fr` for the
hero's headline-and-shot split. Column gutters are wide (`48px` horizontal, `40–48px`
vertical) because there are no card borders to do the separating. Every grid cell that
needs definition takes a `border-t` hairline and `16px` of top padding — a printed rule,
not a box.

Anchored sections carry `scroll-mt-24` to clear the fixed nav. The mobile sticky call bar
occupies the bottom edge below `sm` and the footer reserves `96px` for it.

### Named Rules
**The Full-Bleed Roll Rule.** Sections span the full viewport width and paint their own
background. Never wrap a section in a centred max-width container — the roll runs edge to
edge or it is not a roll.

**The Rule-Not-Box Rule.** Separation is achieved with a single hairline on one edge plus
padding. Reach for a four-sided border only when the content is a genuinely inset panel
(the prototype form, the audit transcript, a screenshot card).

## Elevation & Depth

The system is flat by intent. There are no elevation tiers, no hover lifts on surfaces,
and no shadow vocabulary for containers. Depth comes from three physical facts instead:
the roll sits one step lighter than the page behind it, hairline rules describe planes,
and the perforated tear edge cuts through the stock.

Two shadows exist and both are material effects, not elevation. The roll carries a
near-invisible top edge and a long low curl shadow that reads as paper lifting off the
page. The price-gun label carries a tight offset shadow because it is a physical sticker
sitting proud of the paper — the only object in the system entitled to one.

### Shadow Vocabulary
- **Roll curl** (`box-shadow: 0 1px 0 0 color-mix(in oklab, var(--ink) 6%, transparent), 0 18px 40px -28px color-mix(in oklab, var(--ink) 55%, transparent)`): Applied by the roll surface itself. Never applied to anything else.
- **Label lift** (`box-shadow: 0 10px 24px -16px rgba(20,22,26,0.9)`): The price-gun label only.

### Named Rules
**The Two Shadows Rule.** The system has exactly two shadows and both are already
assigned. Panels, cards, buttons, inputs, dropdowns and nav all carry `box-shadow: none`.

**The Motion-Is-Peel Rule.** The only motion in the system is a sticker responding to the
cursor: a `200ms` rotate-to-zero and a `2px` rise on the label and its siblings, plus colour
transitions on links and field underlines. Nothing fades in, nothing slides on scroll.

## Shapes

Zero radius is the law. Every authored surface — panels, screenshot frames, the label, the
submit button, the locale select and its dropdown, the scrollbar thumb — has square
corners, and shadcn primitives that ship with a radius are explicitly reset with
`rounded-none`. The only curves in the system are inside the SVG diagrams, where nodes
take a `4px` corner and the capsule marker takes `10px`, because they depict objects rather
than being surfaces.

Borders are hairlines and only hairlines: one pixel in hairline grey for structure, one
pixel in printhead grey for the tear rules, field underlines and the nav's bottom edge,
one pixel in thermal red for the left edge of any quoted or resolved block. Heavy strokes
were removed from this build deliberately and must not return.

The recurring silhouettes are the perforation (a repeating radial mask punching 12px holes
along a 14px pitch at the roll's bottom edge), the dotted rule (3px on, 4px off, one pixel
tall, in printhead grey), and the tilted label (`-1.4deg` at rest, straightening on hover).

### Named Rules
**The Square Corners Rule.** `border-radius: 0` on every surface a user can touch. If a
component library supplies a radius, override it.

**The Hairline Rule.** Every border in the system is `1px`. `2px` and heavier borders were
deliberately removed from this build; reintroducing one is a regression, not a variant.

## Components

The component set is deliberately thin — the page is mostly type, rules and figures. What
exists is printed hardware.

### Buttons
- **Shape:** Square (`0` radius), no border.
- **Primary — the Price Label:** Fluorescent orange ground, printhead-black stamped caps at
  `1.125rem`–`1.25rem`, `16px 24px` padding, tilted `-1.4deg`, with a dashed black adhesive strip
  down the left edge at 60% opacity and a trailing mono `↵` glyph at 70%. A tight label-lift
  shadow. Compact variants use `8px 16px` (nav) or `12px 20px` (disclosure toggles).
- **Hover / Focus:** Rotates to `0deg` and rises `2px` over `200ms` ease-out; `focus-visible`
  straightens without the rise. Disabled drops to 60% opacity and cancels the rise.
- **Secondary:** A red underlined text link (`decoration-2`, `underline-offset-4`) rising to
  thermal red deep on hover. There is no filled secondary button in this world.

### Cards / Containers
- **Corner Style:** Square (`0`).
- **Background:** Roll white on the section's own roll, so the panel reads as a printed
  frame rather than a raised card.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** One-pixel hairline on all four sides for inset panels; a single `border-t`
  hairline for grid cells; a `border-l` in thermal red for resolved/quoted blocks, which
  also take a passed-grey fill at 60%.
- **Internal Padding:** `24px` at mobile, `40px` from small for major panels; `20–24px` for
  minor ones.

### Inputs / Fields
- **Style:** Paper-form fields — transparent ground, no border except a one-pixel
  printhead-grey underline, `48px` tall, `12px` horizontal padding, input text set in mono at
  `1rem`. Labels above are stamped caps at `1rem`; the "optional" marker is mono `0.6875rem`.
- **Focus:** Outline suppressed; the underline transitions to thermal red. Caret is thermal
  red globally.
- **Error:** A mono `0.8125rem` alert line in thermal red beneath the form, carrying an
  underlined mailto fallback. Success replaces the form with a red left-edge note.

### Navigation
- Fixed to the top edge, full width, `92%`-opaque page background with a `12px` backdrop blur
  and a printhead-grey bottom hairline. Brand wordmark in stamped caps at `1.25rem`, hidden
  below `sm`. Links are mono `0.8125rem` in carbon grey with a `44px` minimum touch target,
  turning thermal red on hover. The nav closes with the locale select, theme toggle and a
  compact price label CTA that appears from `md`.
- **Locale switcher:** shadcn Select forced square — hairline border, transparent ground, no
  shadow, mono `0.8125rem`, showing the locale code only. Border turns thermal red on focus and
  while open; the checked item is thermal red on a passed-grey highlight.
- **Mobile sticky bar:** Below `sm`, a full-width price label pinned to the bottom edge on a
  blurred background, appearing past the first viewport and retracting via `translate-y-full`
  when the prototype form is in view.

### Pain Figure (signature)
Six label-free line diagrams on a shared `400×80` viewBox, `1.5` default stroke with round
caps and joins, sitting directly above the pain they illustrate with `20px` of clearance.
Each figure says the same sentence in a different shape: printhead-grey strokes at
`2–2.5` weight describe the broken present (a stepping stock line, scattered bars,
diverging trend, dashed dead days, tangled channels), thermal red describes the resolved
future (a flat committed line, joined bars, a bounded capsule, a filled node). Dashed
strokes (`3 5`, `3 4`) mark the absent or unmeasured. Nothing is annotated — no axis labels,
no legend, no numerals. On the dark roll, red switches to the lifted brand-light tone.

### Ledger Group (signature)
A stamped caps heading over a hairline bottom rule, followed by a list where each item is
prefixed with a mono thermal-red `>` — the printout's line marker. Body items are `1rem` carbon
grey at line-height 1.55. This is the system's standard way to print any grouped list, used
for features, price groups and secondary pains.

## Do's and Don'ts

### Do:
- **Do** paint every section as a full-bleed roll surface (roll white on the cooler page
  ground) and divide sections with the `32px` dotted tear strip.
- **Do** keep every corner square (`0` radius) and every border one pixel, overriding any
  library default with `rounded-none`.
- **Do** stamp headings in condensed 800 uppercase at line-height 0.92, and set all prose in
  Archivo at `1rem` / 1.55.
- **Do** reserve monospace for figures, step numbers, list markers, form input text and nav
  chrome.
- **Do** limit fluorescent price-gun orange to one primary action per viewport, always with
  printhead-black type on it.
- **Do** state the broken present in printhead grey and the resolved future in thermal red in
  every diagram.
- **Do** define grid cells with a top hairline and `16px` of padding rather than a box.
- **Do** carry both the light and dark roll for any new surface; the paper darkens and the red
  brightens, but the palette never warms.

### Don't:
- **Don't** add a section eyebrow, kicker or overline above a heading. Sections open on the
  stamped headline and nothing else.
- **Don't** reintroduce `2px` or heavier borders; they were deliberately removed from this build.
- **Don't** add a shadow to a panel, card, button, input or dropdown — the system's two shadows
  are already assigned to the roll and the label.
- **Don't** set body prose, subheads or long copy in monospace.
- **Don't** use warm neutrals (cream, ivory, warm white) or the predecessor's indigo; the stock
  is cold grey-blue.
- **Don't** centre the hero or place a screenshot beneath a centred pitch; the first viewport is
  a left-weighted stamped headline with the shot as a co-equal column.
- **Don't** use thermal red as a danger or error-only colour — it is the resolved/total colour and
  loses that meaning if it also means "wrong".
- **Don't** wrap a section in a centred max-width container; cap the content inside it instead.
