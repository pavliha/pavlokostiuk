import { type APIRequestContext, expect, type Page, test } from "@playwright/test"

import { daysBefore, today } from "@/lib/internal/days"

import { INTERNAL_TEST_ENV } from "./internal-env"

const isolatedClientIp = () => `198.18.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 254) + 1}`

const signInWithPassword = async (page: Page, password: string) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": isolatedClientIp() })
  await page.goto("/internal/login")
  await page.getByText("Use password instead").click()
  await page.getByLabel("Email").fill(INTERNAL_TEST_ENV.INTERNAL_OWNER_EMAIL)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { name: "Sign in with password" }).click()
}

const signIn = async (page: Page) => {
  await signInWithPassword(page, INTERNAL_TEST_ENV.INTERNAL_PASSWORD)
  await expect(page.getByRole("heading", { name: "Job search" })).toBeVisible()
}

const addVirtualAuthenticator = async (page: Page) => {
  const cdp = await page.context().newCDPSession(page)
  await cdp.send("WebAuthn.enable")
  await cdp.send("WebAuthn.addVirtualAuthenticator", {
    options: {
      protocol: "ctap2",
      transport: "internal",
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  })
}

const job = (id: string, company: string, score: number | null = 4.3) => ({
  id,
  company,
  role: "Senior Full-Stack Engineer",
  location: "Remote",
  url: `https://example.com/jobs/${id}`,
  score,
  report: null,
  addedOn: "2026-11-14",
})

const auth = { Authorization: `Bearer ${INTERNAL_TEST_ENV.INTERNAL_INGEST_TOKEN}` }

const push = (request: APIRequestContext, jobs: ReturnType<typeof job>[]) =>
  request.post("/internal/api/jobs", { headers: auth, data: { jobs } })

const setStatus = (request: APIRequestContext, id: string, status: string) =>
  request.post(`/internal/api/jobs/${id}/status`, { headers: auth, data: { status, source: "e2e" } })

const daysAgo = (days: number) => daysBefore(today(), days)

const boardCard = (page: Page, column: string, company: string) =>
  page.getByRole("region", { name: column, exact: true }).getByRole("listitem").filter({ hasText: company })

const MINIMAL_PDF = Buffer.from("%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n")

test.describe("internal dashboards", () => {
  test("signed-out visitors are sent to the login page from every page", async ({ page }) => {
    await Promise.all(
      ["/internal", "/internal/jobs", "/internal/security"].map(async (path) => {
        const response = await page.request.get(path, { maxRedirects: 0 })
        expect(response.status()).toBe(307)
        expect(response.headers().location).toBe("/internal/login")
      }),
    )
  })

  test("a wrong password is refused with a plain message", async ({ page }) => {
    await signInWithPassword(page, "not-the-password")
    await expect(page.getByRole("alert").filter({ hasText: "That email and password don't match." })).toBeVisible()
    await expect(page).toHaveURL(/\/internal\/login$/)
  })

  test("the ingest API rejects a missing or wrong token and a body that is not JSON", async ({ request }) => {
    expect((await request.post("/internal/api/jobs", { data: { jobs: [] } })).status()).toBe(401)
    expect(
      (
        await request.post("/internal/api/jobs", {
          headers: { Authorization: "Bearer wrong-token-of-the-right-shape-but-not-it" },
          data: { jobs: [] },
        })
      ).status(),
    ).toBe(401)
    expect(
      (
        await request.post("/internal/api/jobs", {
          headers: {
            Authorization: `Bearer ${INTERNAL_TEST_ENV.INTERNAL_INGEST_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: "{not json",
        })
      ).status(),
    ).toBe(400)
  })

  test("a passkey added on the Security page signs in without the password", async ({ page }) => {
    await addVirtualAuthenticator(page)
    await signIn(page)
    const prompt = page.getByRole("region", { name: "Add a passkey on this device" })
    await prompt.getByLabel("Device name (optional)").fill("E2E authenticator")
    await prompt.getByRole("button", { name: "Add a passkey" }).click()
    await expect(prompt).toHaveCount(0)
    await page.getByRole("link", { name: "Security" }).click()
    const passkeyRow = page.getByRole("listitem").filter({ hasText: "E2E authenticator" })
    await expect(passkeyRow).toBeVisible()

    await page.getByRole("button", { name: "Sign out" }).click()
    await expect(page).toHaveURL(/\/internal\/login$/)
    await page.getByRole("button", { name: "Sign in with passkey" }).click()
    await expect(page.getByRole("heading", { name: "Job search" })).toBeVisible()

    await page.getByRole("link", { name: "Security" }).click()
    await passkeyRow.getByRole("button", { name: "Remove" }).click()
    await expect(passkeyRow).toHaveCount(0)
  })

  test("a passkey the site no longer knows explains how to get back in", async ({ page }) => {
    await addVirtualAuthenticator(page)
    await signIn(page)
    await page.getByRole("link", { name: "Security" }).click()
    await expect(page.getByRole("heading", { name: "Security" })).toBeVisible()
    await page.getByLabel("Device name (optional)").fill("Removed authenticator")
    await page.getByRole("button", { name: "Add a passkey" }).click()
    const passkeyRow = page.getByRole("listitem").filter({ hasText: "Removed authenticator" })
    await passkeyRow.getByRole("button", { name: "Remove" }).click()
    await expect(passkeyRow).toHaveCount(0)

    await page.getByRole("button", { name: "Sign out" }).click()
    await page.getByRole("button", { name: "Sign in with passkey" }).click()
    await expect(page.getByRole("alert").filter({ hasText: "Sign in with your password, then add one" })).toBeVisible()
  })

  test("a ready job is applied to from Job search, counts toward the goal, and can be undone", async ({ page, request }) => {
    expect((await push(request, [job(`e2e-${Date.now()}`, "Example Robotics")])).ok()).toBe(true)

    await signIn(page)
    const applications = page.getByRole("region", { name: "Applications" })
    await expect(applications).toContainText("0 / 3")
    await expect(applications).toContainText("1 role is ready to apply")

    const nextUp = page.getByRole("region", { name: "Next up" })
    await nextUp.getByRole("listitem").filter({ hasText: "Example Robotics" }).getByRole("button", { name: "Mark applied" }).click()
    await expect(applications).toContainText("1 / 3")

    await page.goto("/internal/jobs")
    const row = boardCard(page, "Applied", "Example Robotics")
    await expect(row).toContainText("Applied")
    await row.getByRole("button", { name: "Undo" }).click()
    await page.getByRole("link", { name: "Job search", exact: true }).click()
    await expect(applications).toContainText("0 / 3")
  })

  test("jobs below the bar or unscored cannot be marked applied", async ({ page, request }) => {
    const stamp = Date.now()
    expect((await push(request, [job(`low-${stamp}`, "Low Score Corp", 3.2), job(`new-${stamp}`, "Unscored Corp", null)])).ok()).toBe(true)
    await signIn(page)
    await page.goto("/internal/jobs?status=below")
    const low = page.getByRole("listitem").filter({ hasText: "Low Score Corp" })
    await expect(low.getByRole("button", { name: "Skip" })).toBeVisible()
    await expect(low.getByRole("button", { name: "Mark applied" })).toHaveCount(0)
    await page.goto("/internal/jobs?status=evaluate")
    await expect(page.getByRole("listitem").filter({ hasText: "Unscored Corp" }).getByRole("button", { name: "Mark applied" })).toHaveCount(0)
  })

  test("the board moves a card from column to column as the application advances", async ({ page, request }) => {
    expect((await push(request, [job(`board-${Date.now()}`, "Board Robotics")])).ok()).toBe(true)

    await signIn(page)
    await page.getByRole("link", { name: "Pipeline", exact: true }).click()
    await boardCard(page, "To apply", "Board Robotics").getByRole("button", { name: "Mark applied" }).click()
    await expect(boardCard(page, "Applied", "Board Robotics")).toBeVisible()
    await expect(boardCard(page, "To apply", "Board Robotics")).toHaveCount(0)
    await boardCard(page, "Applied", "Board Robotics").getByRole("button", { name: "They replied" }).click()
    await expect(boardCard(page, "Replied", "Board Robotics")).toBeVisible()
    await expect(boardCard(page, "Applied", "Board Robotics")).toHaveCount(0)
  })

  test("an application moves through the stages, refuses skipped stages, and shows interview prep", async ({ page, request }) => {
    const id = `stage-${Date.now()}`
    expect((await push(request, [job(id, "Stage Robotics")])).ok()).toBe(true)
    expect((await setStatus(request, id, "applied")).ok()).toBe(true)
    expect((await setStatus(request, id, "interview")).status()).toBe(409)
    expect((await setStatus(request, id, "replied")).ok()).toBe(true)
    expect((await setStatus(request, id, "interview")).ok()).toBe(true)
    const prep = await request.put(`/internal/api/jobs/${id}/prep`, {
      headers: { ...auth, "Content-Type": "text/markdown" },
      data: "# Stage Robotics\n\nLead with the Aircast SFU story.",
    })
    expect(prep.ok()).toBe(true)

    await signIn(page)
    await page.goto("/internal/jobs")
    const row = boardCard(page, "Interviewing", "Stage Robotics")
    await expect(row).toContainText("Interviewing")
    await row.getByRole("link", { name: "Interview prep" }).click()
    await expect(page.getByText("Lead with the Aircast SFU story.")).toBeVisible()
  })

  test("a tailored CV uploaded by the daily run downloads only for a signed-in owner", async ({ page, request }) => {
    const id = `cv-${Date.now()}`
    expect((await push(request, [job(id, "CV Robotics")])).ok()).toBe(true)
    const notPdf = await request.put(`/internal/api/jobs/${id}/cv`, { headers: { ...auth, "Content-Type": "application/pdf" }, data: "hello" })
    expect(notPdf.status()).toBe(400)
    const upload = await request.put(`/internal/api/jobs/${id}/cv`, {
      headers: { ...auth, "Content-Type": "application/pdf" },
      data: MINIMAL_PDF,
    })
    expect(upload.ok()).toBe(true)
    expect((await request.get(`/internal/jobs/${id}/cv`)).status()).toBe(401)

    await signIn(page)
    await page.goto("/internal/jobs")
    const download = page.waitForEvent("download")
    await page.getByRole("listitem").filter({ hasText: "CV Robotics" }).getByRole("link", { name: "Download CV" }).click()
    expect((await download).suggestedFilename()).toBe("Pavlo-Kostiuk-CV-CV-Robotics.pdf")
  })

  test("an application with no answer for a week shows up under Follow up", async ({ page, request }) => {
    const id = `follow-${Date.now()}`
    expect((await push(request, [job(id, "Quiet Robotics")])).ok()).toBe(true)
    expect((await setStatus(request, id, "applied")).ok()).toBe(true)
    const backdate = await request.post("/internal/api/events", {
      headers: auth,
      data: { events: [{ kind: "applied", ref: id, day: daysAgo(10) }] },
    })
    expect(backdate.ok()).toBe(true)

    await signIn(page)
    const row = page.getByRole("region", { name: "Follow up" }).getByRole("listitem").filter({ hasText: "Quiet Robotics" })
    await expect(row).toContainText("no answer for 10 days")
    await row.getByRole("button", { name: "They replied" }).click()
    await expect(page.getByRole("region", { name: "Follow up" })).toHaveCount(0)
  })

  test("posting events alone leaves the job list untouched", async ({ request, page }) => {
    const id = `events-${Date.now()}`
    expect((await push(request, [job(id, "Events Robotics")])).ok()).toBe(true)
    const events = await request.post("/internal/api/events", {
      headers: auth,
      data: { events: [{ kind: "applied", ref: "events-without-a-job", day: daysAgo(30) }] },
    })
    expect(events.ok()).toBe(true)
    await signIn(page)
    await page.goto("/internal/jobs")
    await expect(page.getByRole("listitem").filter({ hasText: "Events Robotics" })).toBeVisible()
  })

  test("a new pipeline snapshot drops untouched jobs that left career-ops", async ({ page, request }) => {
    const stamp = Date.now()
    expect((await push(request, [job(`keep-${stamp}`, "Kept Robotics"), job(`drop-${stamp}`, "Dropped Robotics")])).ok()).toBe(
      true,
    )
    expect((await push(request, [job(`keep-${stamp}`, "Kept Robotics")])).ok()).toBe(true)

    await signIn(page)
    await page.getByRole("link", { name: "Pipeline", exact: true }).click()
    await expect(page.getByRole("listitem").filter({ hasText: "Kept Robotics" })).toBeVisible()
    await expect(page.getByRole("listitem").filter({ hasText: "Dropped Robotics" })).toHaveCount(0)
  })

  test("an unknown status filter is a 404, not a silent default", async ({ page }) => {
    await signIn(page)
    expect((await page.request.get("/internal/jobs?status=nonsense")).status()).toBe(404)
  })

  test("joining a network ticks it and counts toward today", async ({ page }) => {
    await signIn(page)
    const toptal = page.getByRole("button", { name: "Toptal" })
    await expect(toptal).toHaveAttribute("aria-pressed", "false")
    await toptal.click()
    await expect(page.getByRole("button", { name: "Toptal" })).toHaveAttribute("aria-pressed", "true")
    await expect(page.getByRole("region", { name: "Network sign-up" })).toContainText("1 / 1")
    await page.getByRole("button", { name: "Toptal" }).click()
    await expect(page.getByRole("button", { name: "Toptal" })).toHaveAttribute("aria-pressed", "false")
  })

  test("signing out ends the session", async ({ page }) => {
    await signIn(page)
    await page.getByRole("button", { name: "Sign out" }).click()
    await expect(page).toHaveURL(/\/internal\/login$/)
    await page.goto("/internal")
    await expect(page).toHaveURL(/\/internal\/login$/)
  })

  test("password attempts are rate limited even when the client forges cf-connecting-ip", async ({ request }) => {
    const statuses = await Array.from({ length: 12 }, (_, index) => index).reduce<Promise<number[]>>(
      async (previous, index) => [
        ...(await previous),
        (
          await request.post("/internal/api/auth/sign-in/email", {
            headers: {
              Origin: INTERNAL_TEST_ENV.BETTER_AUTH_URL,
              "x-forwarded-for": "192.0.2.50",
              "cf-connecting-ip": `198.51.100.${index + 1}`,
            },
            data: { email: INTERNAL_TEST_ENV.INTERNAL_OWNER_EMAIL, password: "not-the-password" },
          })
        ).status(),
      ],
      Promise.resolve([]),
    )
    expect(statuses).toContain(429)
    expect(statuses.at(-1)).toBe(429)
  })
})
