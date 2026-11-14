import { updateJob } from "@/app/internal/actions"
import type { FollowUp } from "@/lib/internal/jobs"

import ActionForm from "./ActionForm"
import CopyTextButton from "./CopyTextButton"

const message = (job: FollowUp): string =>
  `Hi, I applied for the ${job.role} role at ${job.company} on ${job.appliedOn} and wanted to check where it stands. ` +
  `I'm still very interested and happy to share more about my work on US e-commerce at scale and real-time video. ` +
  `Thanks, Pavlo Kostiuk`

const FollowUpRow = ({ job, daysSince }: { job: FollowUp; daysSince: number }) => (
  <li className="grid gap-2 py-4 border-b last:border-b-0">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-medium">{job.company}</span>
      <span className="text-muted-foreground">{job.role}</span>
    </div>
    <p className="text-sm text-muted-foreground">
      Applied <span className="font-mono tabular-nums">{job.appliedOn}</span>, no answer for{" "}
      <span className="font-mono tabular-nums">{daysSince}</span> days.
    </p>
    <div className="flex flex-wrap gap-2">
      <CopyTextButton text={message(job)} label="Copy follow-up" />
      <ActionForm action={updateJob} fields={{ id: job.id, status: "replied" }} label="They replied" primary />
      <ActionForm action={updateJob} fields={{ id: job.id, status: "rejected" }} label="Rejected" primary={false} />
    </div>
  </li>
)

export default FollowUpRow
