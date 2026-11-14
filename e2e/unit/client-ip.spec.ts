import { expect, test } from "@playwright/test"

import { clientIp } from "@/lib/internal/client-ip"

test.describe("clientIp", () => {
  test("trusts cf-connecting-ip only when the nearest hop is Cloudflare", () => {
    expect(clientIp("104.16.0.10", "203.0.113.5")).toBe("203.0.113.5")
    expect(clientIp("2606:4700::1", "2001:db8::5")).toBe("2001:db8::5")
  })

  test("ignores cf-connecting-ip sent straight to the origin", () => {
    expect(clientIp("198.51.100.7", "203.0.113.5")).toBe("198.51.100.7")
  })

  test("uses the nearest hop, not a client-supplied first entry", () => {
    expect(clientIp("1.2.3.4, 198.51.100.7", null)).toBe("198.51.100.7")
  })

  test("falls to one shared key without a proxy hop", () => {
    expect(clientIp(null, "203.0.113.5")).toBe("direct")
    expect(clientIp("not-an-ip", null)).toBe("direct")
  })
})
