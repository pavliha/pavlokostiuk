import { expect, test } from "@playwright/test"

import { INTERNAL_TEST_ENV } from "../playwright.config"

const signIn = async (page: import("@playwright/test").Page) => {
  await page.goto("/internal/login")
  await page.getByLabel("Password").fill(INTERNAL_TEST_ENV.INTERNAL_PASSWORD)
  await page.getByRole("button", { name: "Sign in" }).click()
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
    await page.goto("/internal/login")
    await page.getByLabel("Password").fill("not-the-password")
    await page.getByRole("button", { name: "Sign in" }).click()
    await expect(page.getByRole("alert").filter({ hasText: "That password is wrong." })).toBeVisible()
  })

  test("the ingest API rejects requests without the token", async ({ request }) => {
    const response = await request.post("/internal/api/jobs", { data: { jobs: [], events: [] } })
    expect(response.status()).toBe(401)
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
