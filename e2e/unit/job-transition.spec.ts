import { expect, test } from "@playwright/test"

import { JobTransitionError, planJobUpdate } from "@/lib/internal/job-transition"

test.describe("planJobUpdate", () => {
  test("moves forward one stage and remembers where it came from", () => {
    expect(planJobUpdate("todo", null, "applied")).toEqual({ status: "applied", prior: "todo" })
    expect(planJobUpdate("applied", "todo", "replied")).toEqual({ status: "replied", prior: "applied" })
    expect(planJobUpdate("replied", "applied", "interview")).toEqual({ status: "interview", prior: "replied" })
    expect(planJobUpdate("interview", "replied", "rejected")).toEqual({ status: "rejected", prior: "interview" })
  })

  test("undo returns to the remembered stage once", () => {
    expect(planJobUpdate("applied", "todo", "todo")).toEqual({ status: "todo", prior: null })
    expect(planJobUpdate("rejected", "interview", "interview")).toEqual({ status: "interview", prior: null })
  })

  test("skipping a stage or moving backwards without a remembered stage is refused", () => {
    expect(() => planJobUpdate("applied", "todo", "interview")).toThrow(JobTransitionError)
    expect(() => planJobUpdate("replied", null, "applied")).toThrow(JobTransitionError)
    expect(() => planJobUpdate("offer", "interview", "rejected")).toThrow(JobTransitionError)
  })
})
