import { type APIRequestContext, expect, type Page, test } from "@playwright/test"

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
  await expect(page.getByRole("heading", { name: "Today" })).toBeVisible()
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

const job = (id: string, company: string) => ({
  id,
  company,
  role: "Senior Full-Stack Engineer",
  location: "Remote",
  url: `https://example.com/jobs/${id}`,
  score: 4.3,
  hasCv: true,
  addedOn: "2026-11-14",
})

const push = (request: APIRequestContext, jobs: ReturnType<typeof job>[]) =>
  request.post("/internal/api/jobs", {
    headers: { Authorization: `Bearer ${INTERNAL_TEST_ENV.INTERNAL_INGEST_TOKEN}` },
    data: { jobs, events: [] },
  })

test.describe("internal dashboards", () => {
  test("signed-out visitors are sent to the login page from every page", async ({ page }) => {
    await Promise.all(
      ["/internal", "/internal/jobs", "/internal/outreach", "/internal/security"].map(async (path) => {
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
    expect((await request.post("/internal/api/jobs", { data: { jobs: [], events: [] } })).status()).toBe(401)
    expect(
      (
        await request.post("/internal/api/jobs", {
          headers: { Authorization: "Bearer wrong-token-of-the-right-shape-but-not-it" },
          data: { jobs: [], events: [] },
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
    await page.getByRole("link", { name: "Security" }).click()
    await page.getByLabel("Device name").fill("E2E authenticator")
    await page.getByRole("button", { name: "Add a passkey" }).click()
    const passkeyRow = page.getByRole("listitem").filter({ hasText: "E2E authenticator" })
    await expect(passkeyRow).toBeVisible()

    await page.getByRole("button", { name: "Sign out" }).click()
    await expect(page).toHaveURL(/\/internal\/login$/)
    await page.getByRole("button", { name: "Sign in with passkey" }).click()
    await expect(page.getByRole("heading", { name: "Today" })).toBeVisible()

    await page.getByRole("link", { name: "Security" }).click()
    await passkeyRow.getByRole("button", { name: "Remove" }).click()
    await expect(passkeyRow).toHaveCount(0)
  })

  test("a passkey the site no longer knows explains how to get back in", async ({ page }) => {
    await addVirtualAuthenticator(page)
    await signIn(page)
    await page.getByRole("link", { name: "Security" }).click()
    await page.getByLabel("Device name").fill("Removed authenticator")
    await page.getByRole("button", { name: "Add a passkey" }).click()
    const passkeyRow = page.getByRole("listitem").filter({ hasText: "Removed authenticator" })
    await passkeyRow.getByRole("button", { name: "Remove" }).click()
    await expect(passkeyRow).toHaveCount(0)

    await page.getByRole("button", { name: "Sign out" }).click()
    await page.getByRole("button", { name: "Sign in with passkey" }).click()
    await expect(page.getByRole("alert").filter({ hasText: "Sign in with your password, then add one" })).toBeVisible()
  })

  test("an applied job counts toward today's goal and can be undone", async ({ page, request }) => {
    expect((await push(request, [job(`e2e-${Date.now()}`, "Example Robotics")])).ok()).toBe(true)

    await signIn(page)
    const applications = page.getByRole("region", { name: "Applications" })
    await expect(applications).toContainText("0 / 3")

    await page.getByRole("link", { name: "Jobs" }).click()
    const row = page.getByRole("listitem").filter({ hasText: "Example Robotics" })
    await expect(row).toContainText("4.3")
    await row.getByRole("button", { name: "Applied" }).click()
    await expect(page.getByRole("listitem").filter({ hasText: "Example Robotics" })).toHaveCount(0)

    await page.getByRole("link", { name: "Today" }).click()
    await expect(applications).toContainText("1 / 3")

    await page.goto("/internal/jobs?status=applied")
    await page.getByRole("listitem").filter({ hasText: "Example Robotics" }).getByRole("button", { name: "Undo" }).click()
    await page.getByRole("link", { name: "Today" }).click()
    await expect(applications).toContainText("0 / 3")
  })

  test("a new pipeline snapshot drops untouched jobs that left career-ops", async ({ page, request }) => {
    const stamp = Date.now()
    expect((await push(request, [job(`keep-${stamp}`, "Kept Robotics"), job(`drop-${stamp}`, "Dropped Robotics")])).ok()).toBe(
      true,
    )
    expect((await push(request, [job(`keep-${stamp}`, "Kept Robotics")])).ok()).toBe(true)

    await signIn(page)
    await page.getByRole("link", { name: "Jobs" }).click()
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
