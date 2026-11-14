import { z } from "zod"

import JobRow from "@/components/internal/JobRow"
import StatusFilter from "@/components/internal/StatusFilter"
import { countJobs, JOB_STATUSES, listJobs } from "@/lib/internal/jobs"

const LABELS = { todo: "To apply", applied: "Applied", skipped: "Skipped" } as const

const JobsPage = async ({ searchParams }: { searchParams: Promise<{ status?: string }> }) => {
  const status = z.enum(JOB_STATUSES).catch("todo").parse((await searchParams).status)
  const counts = countJobs()
  const jobs = listJobs(status)

  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground">
          Apply to roles scored 4.0 or higher. Unscored roles come from the career-ops scan and still need evaluating.
        </p>
      </header>
      <StatusFilter
        basePath="/internal/jobs"
        current={status}
        options={JOB_STATUSES.map((value) => ({ value, label: LABELS[value], count: counts[value] }))}
      />
      {jobs.length ? (
        <ul className="rounded-xl border bg-card px-4">{jobs.map((job) => <JobRow key={job.id} job={job} />)}</ul>
      ) : (
        <p className="text-muted-foreground">Nothing here yet.</p>
      )}
    </>
  )
}

export default JobsPage
