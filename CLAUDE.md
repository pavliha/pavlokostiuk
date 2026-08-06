# Project Guidelines

Static Next.js marketing site for pavlokostiuk.cloud. Four locales (`en`, `ka`, `uk`,
`ru`) via next-intl, exported to static HTML and served by nginx in Docker. No database,
no API routes, no server runtime — everything is prerendered at build time.

## Dev Server

- Local dev server runs on port **3020** (`http://localhost:3020`)
- Prefer leaving it running — the user watches it. Don't restart it to "check" something
- If it returns 500s, read `/tmp/dev.log` and find the cause in code before restarting
- `next dev` and `next build` share `.next` and write incompatible artifacts. Running a
  build while dev is up corrupts it; starting dev on a directory a build just wrote gives
  `ENOENT .next/dev/routes-manifest.json` and a 500 on every route

When a build is genuinely needed (running the e2e suite), the order that works:

```bash
lsof -ti:3020 | xargs kill -9   # stop dev
rm -rf .next && npm run build   # build, then npm test
rm -rf .next && npm run dev     # clear the build's artifacts, then dev
```

The second `rm -rf .next` is the one that is easy to forget and the one that causes the 500.

## Git

- NEVER use `git stash` — it triggers linter hooks that corrupt working state
- Never `git push` without being asked
- Never `--no-verify`

## Components

**Never hand-roll a component that shadcn already provides.** Check `components/ui/`
first, and install rather than writing your own:

```bash
npx shadcn@latest add <component>
```

This covers buttons, inputs, labels, selects, dropdowns, cards, separators, accordions,
dialogs, tabs, tooltips, badges. Style them with `className` and the design tokens; never
reimplement their behaviour, accessibility or keyboard handling.

Hand-rolled markup is only correct when no shadcn primitive fits — the product-specific
SVG diagrams in `PainFigure.tsx`, the Claude-interface simulation in `McpChat.tsx`, and
the honeypot inputs, which must stay unstyled.

Project uses the `radix-nova` style with the `neutral` base colour; see `components.json`.

## React Patterns

- Prefer component composition over new hooks
- Component names carry a suffix describing what they are (`ScreenshotCard`,
  `PrototypeRequest`, `LocaleSwitcher`). Well-known landmarks (`SiteNav`, `SiteFooter`)
  are fine as-is
- One component per file. Never define a second component inside another component's
  file. Exception: shadcn compound primitives in `components/ui/**`
- Server components by default; `"use client"` only where interactivity demands it

## Error Handling

- No fallback code — fail hard and fast
- Do not add try/catch, default values, or optional chaining as safety nets
- Never work around missing or bad data — find and fix the root cause
- If a message key is missing, fix the catalogue, not the component that reads it

## Types

- If a field is mandatory, its type is non-nullable (`string`, `number`) — no `| null`
- No fallback expressions (`?? ""`, `|| "default"`) for mandatory data

## Migrations

- When migrating to new code, migrate all the way — no legacy left behind
- Delete old files, remove old imports, update all call sites
- No backward-compatibility shims or dual support for old and new approaches

## Content and i18n

- All user-facing copy lives in `messages/{en,ka,uk,ru}.json`. Never hardcode strings
- Keys must stay aligned across all four files. `npm run check:messages` enforces this
  and runs as part of `npm run build`
- Ukrainian, Russian and Georgian are written by a native speaker's standard — do not
  translate English idioms literally. "Nobody does X on a quiet Tuesday" has no Slavic
  equivalent; write the underlying thought instead
- Georgian has no uppercase. Any design that relies on `text-transform: uppercase` for
  hierarchy is invisible in `ka`
- Routes use ISO 639-1 (`/uk` for Ukrainian). Display labels may differ (`UA`); the route
  must not, or hreflang and the sitemap break

## Design System

- `DESIGN.md` at the repo root is the visual authority; `.impeccable/design.json` carries
  what its frontmatter schema can't hold
- Regenerate both **from the built result** after a visual change — never hand-edit them
  to match intentions
- Colour, type and spacing come from tokens in `app/globals.css`. Every token needs a
  dark-mode counterpart in `.dark`; the site ships full light/dark parity
- `--primary` is the accent, in both modes, so the primary action can never invert into a
  near-white ghost button in dark mode

## Page Structure

`/ecommerce` follows Donald Miller's Marketing Made Simple order: header (one-liner split)
→ stakes → value proposition → guide → plan → lead generator → proof → explanatory →
price → junk drawer. Keep that order when adding sections.

The home page is a **separate funnel** selling custom software to a different audience —
it does not inherit `/ecommerce`'s BrandScript.

## E2E Tests (Playwright)

- Tests run against the **static export**, not the dev server: `npm run build` first,
  then `npm test` serves `out/` on port 4400
- Target roles and accessible names, never markup or utility classes. The locale switcher
  has changed component three times; tests that named its classes broke each time
- When a component changes shape (`Select` → `DropdownMenu`), update the test to the new
  semantics rather than loosening the assertion
- **No 500s are acceptable.** A 500 is always a real bug — never mask it in a test

## Deployment

Environment variables are `NEXT_PUBLIC_*` and therefore inlined at **build** time. A local
`.env` never reaches the deployed site — pass them as Docker build args (see `Dockerfile`
and `.env.example`). `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` being unset means every form on the
site shows its failure state.

## Verifying

```bash
npm run typecheck        # tsc --noEmit
npm run check:messages   # locale key parity
npm run build            # static export to out/
npm test                 # playwright against out/
```
