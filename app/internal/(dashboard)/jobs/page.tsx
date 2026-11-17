import { notFound } from "next/navigation"
import { z } from "zod"

import JobBoardColumn from "@/components/internal/JobBoardColumn"
import JobRow from "@/components/internal/JobRow"
import StatusFilter from "@/components/internal/StatusFilter"
import { requireSignedIn } from "@/lib/internal/auth"
import { BOARD_COLUMNS, type BoardColumn, countJobs, listJobs, TRIAGE_VIEWS } from "@/lib/internal/jobs"

const PAGE_VIEWS = ["board", ...TRIAGE_VIEWS] as const
type PageView = (typeof PAGE_VIEWS)[number]

const COLUMN_LABELS: Record<BoardColumn, string> = {
  ready: "To apply",
  applied: "Applied",
  replied: "Replied",
  interview: "Interviewing",
  offer: "Offer",
  closed: "Closed",
}

const VIEWS: Record<PageView, { label: string; description: string }> = {
  board: {
    label: "Board",
    description: "Every application by stage. Apply to the roles scored 4.0 or higher, then move each card forward as the company answers.",
  },
  evaluate: { label: "Needs evaluation", description: "Found by the scan, not scored yet. The daily run scores them against your CV." },
  below: { label: "Below 4.0", description: "Scored under the bar. Skip them unless something changed." },
}

const viewFrom = (value: string | undefined): PageView => {
  if (value === undefined) return "board"
  const parsed = z.enum(PAGE_VIEWS).safeParse(value)
  return parsed.success ? parsed.data : notFound()
}

const JobsPage = async ({ searchParams }: { searchParams: Promise<{ status?: string }> }) => {
  await requireSignedIn()
  const view = viewFrom((await searchParams).status)
  const counts = countJobs()
  const boardCount = BOARD_COLUMNS.reduce((total, column) => total + counts[column], 0)
  const triageJobs = view === "board" ? [] : listJobs(view)

  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Pipeline</h1>
        <p className="text-muted-foreground">{VIEWS[view].description}</p>
      </header>
      <StatusFilter
        basePath="/internal/jobs"
        current={view}
        options={PAGE_VIEWS.map((value) => ({
          value,
          label: VIEWS[value].label,
          count: value === "board" ? boardCount : counts[value],
        }))}
      />
      {view === "board" ? (
        <div className="mx-[calc(50%-50vw)] flex gap-3 overflow-x-auto snap-x scroll-px-4 sm:scroll-px-6 px-4 sm:px-6 pb-2">
          {BOARD_COLUMNS.map((column) => (
            <JobBoardColumn key={column} label={COLUMN_LABELS[column]} jobs={listJobs(column)} canApply={column === "ready"} />
          ))}
        </div>
      ) : triageJobs.length ? (
        <ul className="rounded-xl border bg-card px-4">
          {triageJobs.map((job) => (
            <JobRow key={job.id} job={job} canApply={false} />
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">Nothing here.</p>
      )}
    </>
  )
}

export default JobsPage
