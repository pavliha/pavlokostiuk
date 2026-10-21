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

test.describe("404", () => {
  test("an unmatched path serves the custom 404 with a 404 status", async ({ page }) => {
    const response = await page.goto("/en/nonsense")
    expect(response?.status()).toBe(404)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page does not exist")
    await expect(page.getByRole("link", { name: "Home page" })).toBeVisible()
  })

  test("an unknown locale 404s instead of erroring", async ({ page }) => {
    const response = await page.goto("/xx")
    expect(response?.status()).toBe(404)
  })

  test("the 404 page is styled and uses the site font, not a bare fallback", async ({ page }) => {
    await page.goto("/en/nonsense")
    const { sheets, font } = await page.evaluate(() => ({
      sheets: document.styleSheets.length,
      font: getComputedStyle(document.documentElement).getPropertyValue("--font-sans-face").trim(),
    }))
    expect(sheets).toBeGreaterThan(0)
    expect(font).not.toBe("")
  })
})

test.describe("pains", () => {
  const PAIN_KEYS = ["stock", "money", "commission", "catalog", "orders", "staff"] as const

  test("every pain has its own anchored section", async ({ page }) => {
    await page.goto("/en/ecommerce")
    await Promise.all(
      PAIN_KEYS.map((key) => expect(page.locator(`#pain-${key}`)).toBeAttached()),
    )
  })

  test("every pain carries a visual, screenshot or figure", async ({ page }) => {
    await page.goto("/en/ecommerce")
    await Promise.all(
      PAIN_KEYS.map((key) =>
        expect(page.locator(`#pain-${key}`).locator("img, svg").first()).toBeAttached(),
      ),
    )
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
  const bar = page.locator("#stickyCta")
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

  test("hands off to WhatsApp with the address prefilled", async ({ page, context }) => {
    await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, body: "ok" }))
    await page.goto("/en/ecommerce")
    const popup = context.waitForEvent("page")
    await page.getByLabel("Email address").fill("shop@example.com")
    await page.getByRole("button", { name: "Send them" }).click()
    const opened = await popup
    expect(decodeURIComponent(opened.url())).toContain("shop@example.com")
    await expect(page.getByText("You're on the list")).toBeVisible()
  })
})

test.describe("prototype request", () => {
  test("refuses to send and says what is missing", async ({ page }) => {
    await page.goto("/en/ecommerce")
    await page.getByRole("button", { name: "Get my shop link" }).first().click()
    const problem = page.getByRole("alert").filter({ hasText: "There is a problem" }).first()
    await expect(problem).toBeVisible()
    await expect(
      problem.getByRole("link", { name: /Add a link to your catalog/ })
    ).toBeVisible()
  })


  test("two failing forms do not compound the error prefix on the page title", async ({ page }) => {
    await page.goto("/en/ecommerce")
    const original = await page.title()

    await page.getByRole("button", { name: "Get my shop link" }).first().click()
    await expect(page.getByRole("alert").filter({ hasText: "There is a problem" }).first()).toBeVisible()
    expect(await page.title()).toBe(`Error: ${original}`)

    await page.getByRole("button", { name: "See your shop, free" }).last().click()
    await page.getByRole("button", { name: "Get my shop link" }).last().click()
    await expect(page.getByRole("alert").filter({ hasText: "There is a problem" }).last()).toBeVisible()
    expect(await page.title()).toBe(`Error: ${original}`)
  })

  test("every element id on the page is unique", async ({ page }) => {
    await page.goto("/en/ecommerce")
    const ids = await page.locator("[id]").evaluateAll((nodes) => nodes.map((node) => node.id))
    expect(new Set(ids).size).toBe(ids.length)
  })
})

test("no analytics requests fire when the key is unset", async ({ page }) => {
  const analytics: string[] = []
  page.on("request", (r) => /posthog|i\.posthog\.com/.test(r.url()) && analytics.push(r.url()))
  await page.goto("/en/ecommerce")
  await page.waitForTimeout(1500)
  expect(analytics).toEqual([])
})
