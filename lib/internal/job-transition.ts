export const JOB_STATUSES = ["todo", "applied", "replied", "interview", "offer", "rejected", "skipped"] as const
export type JobStatus = (typeof JOB_STATUSES)[number]

export const NEXT_STATUSES: Record<JobStatus, readonly JobStatus[]> = {
  todo: ["applied", "skipped"],
  applied: ["replied", "rejected"],
  replied: ["interview", "rejected"],
  interview: ["offer", "rejected"],
  offer: [],
  rejected: [],
  skipped: [],
}

export const CAREER_OPS_STATE: Record<Exclude<JobStatus, "todo">, string> = {
  applied: "Applied",
  replied: "Responded",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  skipped: "SKIP",
}

export type JobPlan = { status: JobStatus; prior: JobStatus | null }

export class JobTransitionError extends Error {}

export const planJobUpdate = (current: JobStatus, prior: JobStatus | null, to: JobStatus): JobPlan => {
  if (NEXT_STATUSES[current].includes(to)) return { status: to, prior: current }
  if (prior !== null && to === prior) return { status: prior, prior: null }
  throw new JobTransitionError(`A job cannot go from ${current} to ${to}`)
}
