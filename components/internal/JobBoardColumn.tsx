import type { Job } from "@/lib/internal/jobs"

import JobRow from "./JobRow"

const JobBoardColumn = ({ label, jobs, canApply }: { label: string; jobs: Job[]; canApply: boolean }) => (
  <section aria-label={label} className="grid content-start gap-3 flex-1 basis-0 min-w-[80vw] sm:min-w-52 snap-start">
    <h2 className="flex items-baseline justify-between text-sm font-medium">
      {label}
      <span className="font-mono tabular-nums text-muted-foreground">{jobs.length}</span>
    </h2>
    {jobs.length ? (
      <ul className="rounded-xl border bg-card px-4">
        {jobs.map((job) => (
          <JobRow key={job.id} job={job} canApply={canApply} />
        ))}
      </ul>
    ) : (
      <p className="text-sm text-muted-foreground">Nothing here.</p>
    )}
  </section>
)

export default JobBoardColumn
