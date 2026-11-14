import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { updateJob } from "@/app/internal/actions"
import { type JobStatus, NEXT_STATUSES } from "@/lib/internal/job-transition"
import type { Job } from "@/lib/internal/jobs"

import ActionForm from "./ActionForm"
import ScoreBadge from "./ScoreBadge"

const ACTION_LABELS: Record<JobStatus, string> = {
  todo: "Back to the list",
  applied: "Mark applied",
  replied: "They replied",
  interview: "Interview booked",
  offer: "Got an offer",
  rejected: "Rejected",
  skipped: "Skip",
}

const STATUS_LABELS: Record<JobStatus, string> = {
  todo: "Not applied",
  applied: "Applied",
  replied: "Replied",
  interview: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
  skipped: "Skipped",
}

const linkClass = "text-primary hover:underline underline-offset-4"

const JobRow = ({ job, canApply }: { job: Job; canApply: boolean }) => {
  const next = NEXT_STATUSES[job.status].filter((status) => status !== "applied" || canApply)
  return (
    <li className="grid gap-2 py-4 border-b last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <ScoreBadge score={job.score} />
        <span className="font-medium">{job.company}</span>
        <span className="text-muted-foreground">{job.role}</span>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        {job.location && <span className="text-muted-foreground">{job.location}</span>}
        {job.status !== "todo" && (
          <Badge variant="secondary">
            {STATUS_LABELS[job.status]}
            {job.statusOn && <span className="font-mono tabular-nums"> {job.statusOn}</span>}
          </Badge>
        )}
        <a href={job.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Open posting ↗
        </a>
        {job.hasCv && (
          <a href={`/internal/jobs/${job.id}/cv`} className={linkClass}>
            Download CV
          </a>
        )}
        {job.hasPrep && (
          <Link href={`/internal/jobs/${job.id}`} className={linkClass}>
            Interview prep
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {next.map((status, index) => (
          <ActionForm
            key={status}
            action={updateJob}
            fields={{ id: job.id, status }}
            label={ACTION_LABELS[status]}
            primary={index === 0}
          />
        ))}
        {job.priorStatus && (
          <ActionForm action={updateJob} fields={{ id: job.id, status: job.priorStatus }} label="Undo" primary={false} />
        )}
      </div>
    </li>
  )
}

export default JobRow
