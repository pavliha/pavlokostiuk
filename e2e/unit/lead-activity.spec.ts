import { expect, test } from "@playwright/test"

import { contactDays, countOn, replyDays, type LeadTransition } from "@/lib/internal/lead-activity"

const move = (companyId: string, day: string, before: string, after: string): LeadTransition => ({
  companyId,
  at: `${day}T10:00:00.000Z`,
  day,
  before,
  after,
})

test.describe("lead activity from CRM history", () => {
  test("a lead counts as contacted on the day it moved from NEW to CONTACTED, wherever that happened", () => {
    const days = contactDays(
      [{ id: "a", leadStatus: "REPLIED", createdDay: "2026-11-01" }],
      [move("a", "2026-11-10", "NEW", "CONTACTED"), move("a", "2026-11-12", "CONTACTED", "REPLIED")],
    )
    expect(days.get("a")).toBe("2026-11-10")
  })

  test("an undone contact does not count", () => {
    const leads = [{ id: "a", leadStatus: "NEW" as const, createdDay: "2026-11-01" }]
    const days = contactDays(leads, [move("a", "2026-11-10", "NEW", "CONTACTED"), move("a", "2026-11-10", "CONTACTED", "NEW")])
    expect(countOn(days, "2026-11-10")).toBe(0)
  })

  test("a lead created already contacted counts on the day it was created", () => {
    expect(contactDays([{ id: "a", leadStatus: "CONTACTED", createdDay: "2026-11-14" }], []).get("a")).toBe("2026-11-14")
  })

  test("a campaign reply that skipped CONTACTED is a reply, not a contact", () => {
    const leads = [{ id: "a", leadStatus: "INTERESTED" as const, createdDay: "2026-11-01" }]
    const history = [move("a", "2026-11-03", "NEW", "INTERESTED")]
    expect(contactDays(leads, history).has("a")).toBe(false)
    expect(replyDays(leads, history).get("a")).toBe("2026-11-03")
  })

  test("a no-thanks is a reply too", () => {
    const leads = [{ id: "a", leadStatus: "NOT_INTERESTED" as const, createdDay: "2026-11-01" }]
    expect(replyDays(leads, [move("a", "2026-11-06", "CONTACTED", "NOT_INTERESTED")]).get("a")).toBe("2026-11-06")
  })
})
