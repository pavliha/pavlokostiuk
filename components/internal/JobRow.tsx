import { Badge } from "@/components/ui/badge"
import { updateJob } from "@/app/internal/actions"
import type { Job } from "@/lib/internal/jobs"

import ActionForm from "./ActionForm"
import ScoreBadge from "./ScoreBadge"

const JobRow = ({ job }: { job: Job }) => (
  <li className="grid gap-2 py-4 border-b last:border-b-0">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <ScoreBadge score={job.score} />
      <span className="font-medium">{job.company}</span>
      <span className="text-muted-foreground">{job.role}</span>
    </div>
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {job.location && <span className="text-muted-foreground">{job.location}</span>}
      {job.hasCv && <Badge variant="secondary">Tailored CV ready</Badge>}
      {job.appliedOn && <span className="text-muted-foreground font-mono tabular-nums">Applied {job.appliedOn}</span>}
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">
        Open posting ↗
      </a>
    </div>
    <div className="flex flex-wrap gap-2">
      {job.status === "todo" ? (
        <>
          <ActionForm action={updateJob} fields={{ id: job.id, status: "applied" }} label="Applied" primary />
          <ActionForm action={updateJob} fields={{ id: job.id, status: "skipped" }} label="Skip" primary={false} />
        </>
      ) : (
        <ActionForm action={updateJob} fields={{ id: job.id, status: "todo" }} label="Undo" primary={false} />
      )}
    </div>
  </li>
)

export default JobRow
