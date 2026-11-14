import { notFound } from "next/navigation"
import { z } from "zod"

import JobRow from "@/components/internal/JobRow"
import StatusFilter from "@/components/internal/StatusFilter"
import { requireSignedIn } from "@/lib/internal/auth"
import { countJobs, JOB_STATUSES, type JobStatus, listJobs } from "@/lib/internal/jobs"

const LABELS = { todo: "To apply", applied: "Applied", skipped: "Skipped" } as const

const statusFrom = (value: string | undefined): JobStatus => {
  if (value === undefined) return "todo"
  const parsed = z.enum(JOB_STATUSES).safeParse(value)
  return parsed.success ? parsed.data : notFound()
}

const JobsPage = async ({ searchParams }: { searchParams: Promise<{ status?: string }> }) => {
  await requireSignedIn()
  const status = statusFrom((await searchParams).status)
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
