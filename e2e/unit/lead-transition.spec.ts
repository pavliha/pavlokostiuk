import { expect, test } from "@playwright/test"

import { checkLeadUpdate, LeadConflictError } from "@/lib/internal/lead-transition"

test.describe("checkLeadUpdate", () => {
  test("a lead moves one stage forward or back along the flow", () => {
    expect(() => checkLeadUpdate("NEW", "NEW", "CONTACTED")).not.toThrow()
    expect(() => checkLeadUpdate("REPLIED", "REPLIED", "INTERESTED")).not.toThrow()
    expect(() => checkLeadUpdate("CONTACTED", "CONTACTED", "NEW")).not.toThrow()
  })

  test("a lead that moved in the CRM since the page loaded is a conflict", () => {
    expect(() => checkLeadUpdate("INTERESTED", "NEW", "CONTACTED")).toThrow(LeadConflictError)
  })

  test("skipping a stage, standing still or leaving a closed stage is refused", () => {
    expect(() => checkLeadUpdate("NEW", "NEW", "REPLIED")).toThrow(/one stage at a time/)
    expect(() => checkLeadUpdate("NEW", "NEW", "NEW")).toThrow(/one stage at a time/)
    expect(() => checkLeadUpdate("NOT_INTERESTED", "NOT_INTERESTED", "INTERESTED")).toThrow(/one stage at a time/)
  })
})
