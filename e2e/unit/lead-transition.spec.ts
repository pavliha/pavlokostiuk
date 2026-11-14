import { expect, test } from "@playwright/test"

import { LeadConflictError, planLeadUpdate } from "@/lib/internal/lead-transition"

test.describe("planLeadUpdate", () => {
  test("moving forward records the new stage's event", () => {
    expect(planLeadUpdate("NEW", "NEW", "CONTACTED")).toEqual({ record: "contacted", remove: null })
    expect(planLeadUpdate("CONTACTED", "CONTACTED", "REPLIED")).toEqual({ record: "replied", remove: null })
    expect(planLeadUpdate("REPLIED", "REPLIED", "INTERESTED")).toEqual({ record: "interested", remove: null })
  })

  test("undo removes the event of the stage being left", () => {
    expect(planLeadUpdate("CONTACTED", "CONTACTED", "NEW")).toEqual({ record: null, remove: "contacted" })
    expect(planLeadUpdate("INTERESTED", "INTERESTED", "REPLIED")).toEqual({ record: null, remove: "interested" })
  })

  test("a lead that moved in the CRM since the page loaded is a conflict", () => {
    expect(() => planLeadUpdate("INTERESTED", "NEW", "CONTACTED")).toThrow(LeadConflictError)
  })

  test("skipping a stage or standing still is refused", () => {
    expect(() => planLeadUpdate("NEW", "NEW", "REPLIED")).toThrow(/one stage at a time/)
    expect(() => planLeadUpdate("NEW", "NEW", "NEW")).toThrow(/one stage at a time/)
  })
})
