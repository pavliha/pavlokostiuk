import { z } from "zod"

import { database, transaction } from "@/lib/internal/db"
import { JOB_STATUSES, type JobStatus, planJobUpdate } from "@/lib/internal/job-transition"

export const BOARD_COLUMNS = ["ready", "applied", "replied", "interview", "offer", "closed"] as const
export const TRIAGE_VIEWS = ["evaluate", "below"] as const
export type BoardColumn = (typeof BOARD_COLUMNS)[number]
export type TriageView = (typeof TRIAGE_VIEWS)[number]
export type JobView = BoardColumn | TriageView
const JOB_VIEWS: readonly JobView[] = [...BOARD_COLUMNS, ...TRIAGE_VIEWS]

const VIEW_WHERE: Record<JobView, string> = {
  ready: "jobs.status = 'todo' AND jobs.score >= 4",
  evaluate: "jobs.status = 'todo' AND jobs.score IS NULL",
  below: "jobs.status = 'todo' AND jobs.score < 4",
  applied: "jobs.status = 'applied'",
  replied: "jobs.status = 'replied'",
  interview: "jobs.status = 'interview'",
  offer: "jobs.status = 'offer'",
  closed: "jobs.status IN ('rejected', 'skipped')",
}

export const incomingJobSchema = z.object({
  id: z.string().min(1).max(200),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1).nullable(),
  url: z.url(),
  score: z.number().min(0).max(5).nullable(),
  report: z.number().int().positive().nullable(),
  addedOn: z.iso.date(),
})

export type IncomingJob = z.infer<typeof incomingJobSchema>

const rowSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string().nullable(),
  url: z.string(),
  score: z.number().nullable(),
  report: z.number().nullable(),
  has_cv: z.number(),
  has_prep: z.number(),
  status: z.enum(JOB_STATUSES),
  prior_status: z.enum(JOB_STATUSES).nullable(),
  status_on: z.string().nullable(),
  applied_on: z.string().nullable(),
})

export type Job = {
  id: string
  company: string
  role: string
  location: string | null
  url: string
  score: number | null
  report: number | null
  hasCv: boolean
  hasPrep: boolean
  status: JobStatus
  priorStatus: JobStatus | null
  statusOn: string | null
  appliedOn: string | null
}

const SELECT = `
  SELECT jobs.id, jobs.company, jobs.role, jobs.location, jobs.url, jobs.score, jobs.report, jobs.has_cv,
         jobs.prep IS NOT NULL AS has_prep, jobs.status, jobs.prior_status, jobs.status_on, events.day AS applied_on
  FROM jobs LEFT JOIN events ON events.kind = 'applied' AND events.ref = jobs.id`

const toJob = (row: unknown): Job => {
  const parsed = rowSchema.parse(row)
  return {
    id: parsed.id,
    company: parsed.company,
    role: parsed.role,
    location: parsed.location,
    url: parsed.url,
    score: parsed.score,
    report: parsed.report,
    hasCv: parsed.has_cv === 1,
    hasPrep: parsed.has_prep === 1,
    status: parsed.status,
    priorStatus: parsed.prior_status,
    statusOn: parsed.status_on,
    appliedOn: parsed.applied_on,
  }
}

export const listJobs = (view: JobView): Job[] =>
  database()
    .prepare(`${SELECT} WHERE ${VIEW_WHERE[view]} ORDER BY jobs.score IS NULL, jobs.score DESC, jobs.status_on DESC, jobs.company`)
    .all()
    .map(toJob)

export const countJobs = (): Record<JobView, number> =>
  Object.fromEntries(
    JOB_VIEWS.map((view) => [
      view,
      z.object({ n: z.number() }).parse(database().prepare(`SELECT COUNT(*) AS n FROM jobs WHERE ${VIEW_WHERE[view]}`).get()).n,
    ]),
  ) as Record<JobView, number>

export const jobById = (id: string): Job => toJob(database().prepare(`${SELECT} WHERE jobs.id = ?`).get(id))

export const jobPrep = (id: string): string | null =>
  z.object({ prep: z.string().nullable() }).parse(database().prepare("SELECT prep FROM jobs WHERE id = ?").get(id)).prep

export type FollowUp = Job & { appliedOn: string }

export const followUps = (appliedOnOrBefore: string): FollowUp[] =>
  database()
    .prepare(`${SELECT} WHERE jobs.status = 'applied' AND events.day <= ? ORDER BY events.day`)
    .all(appliedOnOrBefore)
    .map(toJob)
    .map((job) => ({ ...job, appliedOn: z.string().parse(job.appliedOn) }))

export const setJobStatus = (id: string, to: JobStatus, day: string): void =>
  transaction((db) => {
    const current = jobById(id)
    const plan = planJobUpdate(current.status, current.priorStatus, to)
    db.prepare("UPDATE jobs SET status = ?, prior_status = ?, status_on = ? WHERE id = ?").run(plan.status, plan.prior, day, id)
    if (plan.status === "applied" && current.status === "todo") {
      db.prepare("INSERT OR REPLACE INTO events (kind, ref, day) VALUES ('applied', ?, ?)").run(id, day)
    }
    if (plan.status === "todo") db.prepare("DELETE FROM events WHERE kind = 'applied' AND ref = ?").run(id)
  })

export const replacePipeline = (jobs: IncomingJob[]): string[] => {
  const keep = JSON.stringify(jobs.map((job) => job.id))
  const removed = z
    .array(z.object({ id: z.string() }))
    .parse(database().prepare("SELECT id FROM jobs WHERE status = 'todo' AND id NOT IN (SELECT value FROM json_each(?))").all(keep))
    .map((row) => row.id)
  transaction((db) => {
    db.prepare("DELETE FROM jobs WHERE status = 'todo' AND id NOT IN (SELECT value FROM json_each(?))").run(keep)
    const statement = db.prepare(
      `INSERT INTO jobs (id, company, role, location, url, score, report, added_on)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET company = excluded.company, role = excluded.role, location = excluded.location,
         url = excluded.url, score = excluded.score, report = excluded.report`,
    )
    jobs.forEach((job) => statement.run(job.id, job.company, job.role, job.location, job.url, job.score, job.report, job.addedOn))
  })
  return removed
}

const updateOne = (sql: string, id: string, ...values: (string | number)[]): void => {
  const updated = database().prepare(sql).run(...values, id)
  if (updated.changes !== 1) throw new Error(`No job with id ${id}`)
}

export const markCv = (id: string): void => updateOne("UPDATE jobs SET has_cv = 1 WHERE id = ?", id)

export const setPrep = (id: string, prep: string): void => updateOne("UPDATE jobs SET prep = ? WHERE id = ?", id, prep)

export const pipelineState = () =>
  database()
    .prepare(`${SELECT} ORDER BY jobs.company`)
    .all()
    .map(toJob)
    .map((job) => ({
      id: job.id,
      report: job.report,
      company: job.company,
      role: job.role,
      status: job.status,
      statusOn: job.statusOn,
      appliedOn: job.appliedOn,
      hasPrep: job.hasPrep,
    }))
