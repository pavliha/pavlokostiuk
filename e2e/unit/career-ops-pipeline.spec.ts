import { expect, test } from "@playwright/test"

import { parsePipeline } from "../../scripts/career-ops-pipeline.mjs"

const PIPELINE = `# Pipeline

## Pending
- [ ] https://jobs.ashbyhq.com/acme/1 | Acme | Senior Full-Stack Engineer | Remote · Europe | posted: 2026-11-03
- [ ] https://news.ycombinator.com/item?id=1 | Modash.io | Senior Product Engineer | posted: 2026-11-02
- [ ] https://example.com/bare-url

## Processed
- [x] #003 | https://jobs.ashbyhq.com/acme/2 | Acme | Full-Stack Engineer - API | 4.2/5 | PDF ✅
- [x] #004 | https://jobs.ashbyhq.com/acme/3 | Acme | Forward Deployed | 3.2/5 | PDF ❌
- [x] #-- | https://jobs.example.com/4 | skipped (pre-screen mismatch: US only)
`

test.describe("parsePipeline", () => {
  const jobs = parsePipeline(PIPELINE, "2026-11-14")

  test("keeps pending and evaluated rows and drops bare URLs and pre-screen skips", () => {
    expect(jobs.map((job: { role: string }) => job.role)).toEqual([
      "Senior Full-Stack Engineer",
      "Senior Product Engineer",
      "Full-Stack Engineer - API",
      "Forward Deployed",
    ])
  })

  test("reads the location cell and skips labeled cells", () => {
    expect(jobs[0].location).toBe("Remote · Europe")
    expect(jobs[1].location).toBeNull()
  })

  test("reads score and tailored-CV flag from evaluated rows", () => {
    expect(jobs[2]).toMatchObject({ score: 4.2, hasCv: true, location: null })
    expect(jobs[3]).toMatchObject({ score: 3.2, hasCv: false })
  })

  test("derives a stable id from the URL", () => {
    expect(parsePipeline(PIPELINE, "2026-12-01")[0].id).toBe(jobs[0].id)
  })
})
