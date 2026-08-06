import { expect, test } from "@playwright/test"

const LOCALES = ["en", "ka", "uk", "ru"] as const

test.describe("locales", () => {
  LOCALES.forEach((locale) => {
    test(`${locale} pages render with the right lang and no console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))

      await page.goto(`/${locale}`)
      await expect(page.locator("html")).toHaveAttribute("lang", locale)
      await expect(page.locator("h1")).toBeVisible()

      await page.goto(`/${locale}/ecommerce`)
      await expect(page.locator("html")).toHaveAttribute("lang", locale)
      await expect(page.locator("#price")).toBeAttached()

      expect(errors).toEqual([])
    })
  })

  test("every locale declares hreflang alternates for all three", async ({ page }) => {
    await page.goto("/en/ecommerce")
    const hreflangs = await page.locator('link[rel="alternate"]').evaluateAll((links) =>
      links.map((link) => link.getAttribute("hreflang")),
    )
    LOCALES.forEach((locale) => expect(hreflangs).toContain(locale))
  })

  test("the switcher moves between locales and keeps the page", async ({ page }) => {
    await page.goto("/en/ecommerce")
    await page.getByRole("button", { name: "Language" }).click()
    await page.getByRole("menuitem", { name: /RU/ }).click()
    await expect(page).toHaveURL(/\/ru\/ecommerce/)
    await expect(page.locator("html")).toHaveAttribute("lang", "ru")
  })

  test("the switcher shows the current locale and is reachable by keyboard", async ({ page }) => {
    await page.goto("/en")
    const trigger = page.getByRole("button", { name: "Language" })
    await expect(trigger).toContainText("EN")
    await trigger.focus()
    await expect(trigger).toBeFocused()
    await page.keyboard.press("Enter")
    await expect(page.getByRole("menuitem", { name: /KA/ })).toBeVisible()
  })
})

test("theme toggle flips the class and persists it", async ({ page }) => {
  await page.goto("/en")
  const before = await page.evaluate(() => document.documentElement.classList.contains("dark"))
  await page.getByRole("button", { name: /theme/i }).click()
  const after = await page.evaluate(() => document.documentElement.classList.contains("dark"))
  expect(after).toBe(!before)
  expect(await page.evaluate(() => localStorage.theme)).toBe(after ? "dark" : "light")
})

test("the mobile sticky call bar hides at the top and shows after a screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/en/ecommerce")
  const bar = page.locator("#stickyCta, div:has(> a[href*='calendly']).fixed.bottom-0").last()
  await expect(bar).toHaveClass(/translate-y-full/)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200))
  await expect(bar).not.toHaveClass(/translate-y-full/)
})

test("no page overflows horizontally at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const path of ["/en", "/en/ecommerce", "/ka/ecommerce", "/ru/ecommerce"]) {
    await page.goto(path)
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflows, `${path} overflows`).toBe(false)
  }
})

test.describe("email capture", () => {
  test("renders with a labelled field and a honeypot", async ({ page }) => {
    await page.goto("/en/ecommerce")
    const field = page.getByLabel("Email address")
    await expect(field).toBeVisible()
    await expect(field).toHaveAttribute("type", "email")
    await expect(field).toHaveAttribute("autocomplete", "email")
    const honeypots = await page.locator('input[name="company"]').all()
    expect(honeypots.length).toBeGreaterThan(0)
    await Promise.all(honeypots.map((honeypot) => expect(honeypot).toBeHidden()))
  })

  test("says so instead of failing silently when it cannot send", async ({ page }) => {
    await page.goto("/en/ecommerce")
    await page.getByLabel("Email address").fill("shop@example.com")
    await page.getByRole("button", { name: "Send them" }).click()
    await expect(page.locator("form ~ p[role=alert]")).toContainText("didn't send")
  })
})

test("no analytics requests fire when the key is unset", async ({ page }) => {
  const analytics: string[] = []
  page.on("request", (r) => /posthog|i\.posthog\.com/.test(r.url()) && analytics.push(r.url()))
  await page.goto("/en/ecommerce")
  await page.waitForTimeout(1500)
  expect(analytics).toEqual([])
})
