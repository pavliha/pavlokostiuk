import { notFound } from "next/navigation"
import { z } from "zod"

import JobRow from "@/components/internal/JobRow"
import StatusFilter from "@/components/internal/StatusFilter"
import { requireSignedIn } from "@/lib/internal/auth"
import { countJobs, JOB_VIEWS, type JobView, listJobs } from "@/lib/internal/jobs"

const VIEWS: Record<JobView, { label: string; description: string }> = {
  ready: { label: "Ready", description: "Scored 4.0 or higher. Open the posting, apply with the tailored CV, then mark it applied." },
  evaluate: { label: "Needs evaluation", description: "Found by the scan, not scored yet. The daily run scores them against your CV." },
  below: { label: "Below 4.0", description: "Scored under the bar. Skip them unless something changed." },
  active: { label: "Active", description: "Applications in flight. Move each one forward as the company answers." },
  closed: { label: "Closed", description: "Rejected or skipped." },
}

const viewFrom = (value: string | undefined): JobView => {
  if (value === undefined) return "ready"
  const parsed = z.enum(JOB_VIEWS).safeParse(value)
  return parsed.success ? parsed.data : notFound()
}

const JobsPage = async ({ searchParams }: { searchParams: Promise<{ status?: string }> }) => {
  await requireSignedIn()
  const view = viewFrom((await searchParams).status)
  const counts = countJobs()
  const jobs = listJobs(view)

  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground">{VIEWS[view].description}</p>
      </header>
      <StatusFilter
        basePath="/internal/jobs"
        current={view}
        options={JOB_VIEWS.map((value) => ({ value, label: VIEWS[value].label, count: counts[value] }))}
      />
      {jobs.length ? (
        <ul className="rounded-xl border bg-card px-4">
          {jobs.map((job) => (
            <JobRow key={job.id} job={job} canApply={view === "ready"} />
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">Nothing here.</p>
      )}
    </>
  )
}

export default JobsPage
