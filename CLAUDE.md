# Project Guidelines

Static Next.js marketing site for pavlokostiuk.cloud. Four locales (`en`, `ka`, `uk`,
`ru`) via next-intl, served by `next start` in Docker. No database and no API routes; every
page is prerendered at build time and the server exists to serve them, handle redirects,
and return real 404s.

## Dev Server

**The dev server is the user's. Never touch it.** These are absolute — no exception,
no "just to verify", no "it looked broken so I recovered it":

- **NEVER run `rm -rf .next`.** Deleting it under a running dev server pulls the
  manifests out from beneath it and 500s every route. Only the user runs this
- **NEVER kill the dev server** — no `lsof -ti:3020 | xargs kill`, no `pkill next`,
  no `pkill next-server`. The user may have several servers running; killing "a stray"
  kills theirs
- **NEVER start a dev server** — no `npm run dev`. If nothing answers on 3020, say so
  and let the user start it
- **NEVER run `npm run build`** while dev is up (it corrupts `.next` the same way)

- Local dev server runs on port **3020** (`http://localhost:3020`)
- The user watches it. Don't restart it to "check" something
- `next dev` and `next build` share `.next` and write incompatible artifacts. Running a
  build while dev is up corrupts it; starting dev on a directory a build just wrote gives
  `ENOENT .next/dev/routes-manifest.json` and a 500 on every route

### When it 500s

Read the log, find the cause **in code**, report it, and stop. Fixing source is your job;
restarting, clearing caches and killing processes is not.

- `/tmp/dev.log` is only correct if you started the server — and you must not. The user's
  server logs to their own terminal, so treat `/tmp/dev.log` as stale unless proven otherwise
- Get the real error from the response body (`curl -s localhost:3020/<route>`) or from
  `npx tsc --noEmit`, not from a log you don't own
- A 500 on *every* route with `ENOENT .next/...` means `.next` was destroyed, not that
  the code is broken. Say so and let the user restart

When a build is genuinely needed (running the e2e suite), **the user runs this, not you** —
ask them to, and wait:

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

- Tests run against a **production server**, not the dev server: `npm run build` first,
  then `npm test` starts `next start` on port 4400
- Build and test without disturbing the dev server by pointing the build at its own
  directory: `NEXT_DIST_DIR=.next-e2e npm run build && NEXT_DIST_DIR=.next-e2e npm test`.
  `.next` stays untouched, so `npm run dev` keeps working throughout
- Target roles and accessible names, never markup or utility classes. The locale switcher
  has changed component three times; tests that named its classes broke each time
- When a component changes shape (`Select` → `DropdownMenu`), update the test to the new
  semantics rather than loosening the assertion
- **No 500s are acceptable.** A 500 is always a real bug — never mask it in a test

## Deployment

Docker builds with `NEXT_OUTPUT=standalone` and runs `node server.js` on port 80. Standalone
is a packaging choice only — it is the same compiled app that `next start` serves locally, and
the full suite passes against both. Verify that parity after touching build config:

```bash
NEXT_OUTPUT=standalone NEXT_DIST_DIR=.next-e2e npm run build
cp -r public .next-e2e/standalone/ && cp -r .next-e2e/static .next-e2e/standalone/.next-e2e/static
PORT=4400 node .next-e2e/standalone/server.js &   # playwright reuses an existing 4400
npm test
```

A request matching no route at all (`/nonsense`, an unknown locale) logs one internal
`NoFallbackError` line. The response is still the styled 404 with a 404 status. Removing
`dynamicParams = false` from `app/[locale]/layout.tsx` silences it and brings back a 500
on unknown locales, so leave it.

Environment variables are `NEXT_PUBLIC_*` and therefore inlined at **build** time. A local
`.env` never reaches the deployed site — pass them as Docker build args (see `Dockerfile`
and `.env.example`). Only PostHog is env-driven, and it stays off when unset.

Public constants that never differ between environments — the lead-capture endpoint, the
WhatsApp link, the contact addresses — live in `content/site.ts`, not in the environment.
They end up in the static HTML either way, so an env var buys nothing and adds a value
that can go missing at build time.

## Verifying

```bash
npm run typecheck        # tsc --noEmit
npm run check:messages   # locale key parity
npm run build            # production build to .next/
npm test                 # playwright against next start on 4400
```
