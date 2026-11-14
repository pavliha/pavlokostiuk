import { expect, type Page, test } from "@playwright/test"

import { INTERNAL_TEST_ENV } from "../playwright.config"

const signInWithPassword = async (page: Page, password = INTERNAL_TEST_ENV.INTERNAL_PASSWORD) => {
  await page.goto("/internal/login")
  await page.getByText("Use password instead").click()
  await page.getByLabel("Email").fill(INTERNAL_TEST_ENV.INTERNAL_OWNER_EMAIL)
  await page.getByLabel("Password").fill(password)
  await page.getByRole("button", { name: "Sign in with password" }).click()
}

const signIn = async (page: Page) => {
  await signInWithPassword(page)
  await expect(page.getByRole("heading", { name: "Today" })).toBeVisible()
}

test.describe("internal dashboards", () => {
  test("signed-out visitors are sent to the login page", async ({ page }) => {
    await page.goto("/internal")
    await expect(page).toHaveURL(/\/internal\/login$/)
    await page.goto("/internal/jobs")
    await expect(page).toHaveURL(/\/internal\/login$/)
  })

  test("a wrong password is refused", async ({ page }) => {
    await signInWithPassword(page, "not-the-password")
    await expect(page.getByRole("alert").filter({ hasText: /invalid/i })).toBeVisible()
    await expect(page).toHaveURL(/\/internal\/login$/)
  })

  test("the ingest API rejects requests without the token", async ({ request }) => {
    const response = await request.post("/internal/api/jobs", { data: { jobs: [], events: [] } })
    expect(response.status()).toBe(401)
  })

  test("a passkey added on the Security page signs in without the password", async ({ page }) => {
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

  test("an applied job counts toward today's goal and can be undone", async ({ page, request }) => {
    const id = `e2e-${Date.now()}`
    const pushed = await request.post("/internal/api/jobs", {
      headers: { Authorization: `Bearer ${INTERNAL_TEST_ENV.INTERNAL_INGEST_TOKEN}` },
      data: {
        jobs: [
          {
            id,
            company: "Example Robotics",
            role: "Senior Full-Stack Engineer",
            location: "Remote",
            url: "https://example.com/jobs/1",
            score: 4.3,
            hasCv: true,
            addedOn: "2026-11-14",
          },
        ],
        events: [],
      },
    })
    expect(pushed.ok()).toBe(true)

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
})
