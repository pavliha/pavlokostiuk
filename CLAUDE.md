# Project Guidelines

Next.js site for pavlokostiuk.cloud. The public marketing pages use four locales (`en`, `ka`,
`uk`, `ru`) via next-intl, are prerendered at build time and need no database. The only
dynamic part is the private `/internal` area (see below), served by the same `next start`
process in Docker.

## Internal area

`/internal` holds Pavlo's private dashboards, kept apart by project: **Job search** (daily application and network goals, next up, follow-ups), **Pipeline**
(the career-ops jobs) and **Aircast** (operator-contact goal, its own week chart and the leads from Twenty CRM).

- It is English-only and outside `[locale]`, so its copy lives in its components, not in
  `messages/`. It has its own root layout, `noindex`, and `robots.ts` disallows it
- Its root layout takes Geist from the `geist` package (`next/font/local`), not
  `next/font/google`. A second root layout fetching Google Fonts made the Turbopack build
  fail intermittently in CI and in the Docker build
- Sign-in is Better Auth (`lib/internal/auth.ts`) with the passkey plugin; its endpoints
  live under `/internal/api/auth`. Passkeys are the normal way in; email and password stay
  as the fallback. Sign-up is disabled: on first use the server runs Better Auth's
  migrations and creates the single owner account from `INTERNAL_OWNER_EMAIL` and
  `INTERNAL_PASSWORD`. Passkeys are added and removed on `/internal/security`. The passkey
  relying party is the host of `BETTER_AUTH_URL`, so a passkey made on one host does not
  work on another
- `INTERNAL_PASSWORD` is authoritative: on each start the owner's password hash is synced
  to it, so rotating the variable and redeploying rotates the password
- Password sign-in is rate limited by Better Auth (10 per minute per client IP). `proxy.ts`
  resolves that IP for every `/internal` request into `x-internal-client-ip`: it trusts
  `cf-connecting-ip` only when the nearest `X-Forwarded-For` hop (Traefik's view of the
  peer) is a Cloudflare address (`lib/internal/cloudflare-ranges.ts`), so a request sent
  straight to the origin cannot forge its way past the limit. Refresh the ranges from
  cloudflare.com/ips when Cloudflare changes them
- Every page and every server action calls `requireSignedIn()` itself. The dashboard layout
  has no guard on purpose: layouts do not re-render on navigation, so they cannot be the
  check
- State is SQLite through Node's built-in `node:sqlite` at `INTERNAL_DB_PATH`, which must
  sit on a Docker volume (`/data`) or every deploy wipes it. `jobs` holds the pipeline;
  `events` (one row per kind and ref) is what the goal counters count
- Leads are read live from Twenty CRM on each request. The Contacted/Replied/Interested
  buttons re-read the lead's `leadStatus` first and refuse the change if it moved since the
  page loaded (Explee sync moves leads too); `lib/internal/lead-transition.ts` decides which
  event to record or remove
- Each action and the ingest route emit one pino JSON line (`event`, ids, `outcome`,
  `durationMs`, `err`) through `traced()` in `lib/internal/log.ts`
- **Job pipeline.** A job moves todo → applied → replied → interview → offer, with rejected
  reachable from any active stage and skipped from todo; `lib/internal/job-transition.ts`
  holds the rules and a single-level undo. Jobs are grouped Ready (todo, score ≥ 4.0), Needs
  evaluation, Below 4.0, Active and Closed; only Ready rows can be marked applied. Job search
  shows the ready roles under "Next up" and applications with no answer after
  `FOLLOW_UP_AFTER_DAYS` under "Follow up"
- **Daily run.** `scripts/job-search-daily.sh` runs at 09:00 from the launchd agent
  `cloud.pavlokostiuk.job-search-daily` (log: `~/Library/Logs/job-search-daily.log`):
  career-ops zero-token scans (plus the web-search scan on Mondays) →
  `scripts/sync-career-ops-statuses.mjs` (site statuses into career-ops via its
  `set-status.mjs`) → `claude -p` with `scripts/job-search-evaluate-prompt.md` scores up to 15 pending jobs per run in pipeline mode, unattended (the bare `pipeline` command stops to ask questions nobody answers) →
  `claude -p` with `scripts/job-search-replies-prompt.md` reads Gmail (read-only) for
  replies, moves statuses and uploads interview prep → `scripts/push-career-ops.mjs` sends
  the pipeline snapshot and each tailored CV PDF. It needs the Mac awake; launchd runs a
  missed 09:00 on wake
- **Ingest API** (Bearer `INTERNAL_INGEST_TOKEN`): `POST /internal/api/jobs` is a snapshot
  (upserts, deletes untouched jobs and their CVs that left career-ops); `POST
  /internal/api/events` adds events without touching jobs; `GET /internal/api/jobs/state`;
  `POST /internal/api/jobs/<id>/status` (409 on an illegal jump); `PUT
  /internal/api/jobs/<id>/cv` (PDF ≤ 5 MB, stored under `/data/cvs`); `PUT
  /internal/api/jobs/<id>/prep` (markdown). CVs download from `/internal/jobs/<id>/cv` with
  a session only. Schema changes go in `MIGRATIONS` in `lib/internal/db.ts`, tracked by
  `PRAGMA user_version`
- These variables are read at **runtime**, not build time, so they are set as Dokploy
  environment variables, never as build args: `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`,
  `INTERNAL_OWNER_EMAIL`, `INTERNAL_PASSWORD`, `INTERNAL_INGEST_TOKEN`, `INTERNAL_DB_PATH`,
  `TWENTY_API_URL`, `TWENTY_API_KEY`. `lib/internal/env.ts` validates them on first use
- The e2e suite runs the internal tests against a throwaway database with test values from
  `e2e/internal-env.ts`, and exercises passkeys with Chromium's virtual WebAuthn
  authenticator over CDP. Each sign-in uses its own `X-Forwarded-For` so tests do not share
  a rate-limit bucket. Pure logic (lead transitions, client IP, the pipeline parser) has
  unit tests in `e2e/unit/`, run by the same `npm test`. The suite never calls the CRM, so
  the Aircast page is checked by hand

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

Deploys are triggered by CI, not by Dokploy's GitHub webhook: the `deploy` job in
`.github/workflows/ci.yml` runs after `verify` and `docker` pass on a push to master and
POSTs to the app's Dokploy deploy URL (GitHub secret `DOKPLOY_DEPLOY_URL`), retrying on
network errors. The Dokploy app's trigger type is set to `tag` on purpose so the GitHub App
push webhook no longer deploys: its deliveries to the VPS were being lost, and it deployed
unverified commits. A red CI run therefore means nothing was deployed.

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

`NEXT_PUBLIC_*` variables are inlined at **build** time. A local `.env` never reaches the
deployed site — pass them as Docker build args (see `Dockerfile` and `.env.example`). PostHog
is the only one, and it stays off when unset. The internal area's variables are the
exception: they are runtime environment variables (see "Internal area").

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
