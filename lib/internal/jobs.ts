import { z } from "zod"

import { database, transaction } from "@/lib/internal/db"

export const JOB_STATUSES = ["todo", "applied", "skipped"] as const
export type JobStatus = (typeof JOB_STATUSES)[number]

export const incomingJobSchema = z.object({
  id: z.string().min(1).max(200),
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string(),
  url: z.url(),
  score: z.number().min(0).max(5).nullable(),
  hasCv: z.boolean(),
  addedOn: z.iso.date(),
})

export type IncomingJob = z.infer<typeof incomingJobSchema>

const rowSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  location: z.string(),
  url: z.string(),
  score: z.number().nullable(),
  has_cv: z.number(),
  status: z.enum(JOB_STATUSES),
  applied_on: z.string().nullable(),
})

export type Job = {
  id: string
  company: string
  role: string
  location: string
  url: string
  score: number | null
  hasCv: boolean
  status: JobStatus
  appliedOn: string | null
}

const toJob = (row: unknown): Job => {
  const parsed = rowSchema.parse(row)
  return {
    id: parsed.id,
    company: parsed.company,
    role: parsed.role,
    location: parsed.location,
    url: parsed.url,
    score: parsed.score,
    hasCv: parsed.has_cv === 1,
    status: parsed.status,
    appliedOn: parsed.applied_on,
  }
}

export const listJobs = (status: JobStatus): Job[] =>
  database()
    .prepare(
      `SELECT jobs.*, events.day AS applied_on
       FROM jobs LEFT JOIN events ON events.kind = 'applied' AND events.ref = jobs.id
       WHERE jobs.status = ?
       ORDER BY jobs.score IS NULL, jobs.score DESC, events.day DESC, jobs.company`,
    )
    .all(status)
    .map(toJob)

export const countJobs = (): Record<JobStatus, number> => {
  const rows = z
    .array(z.object({ status: z.enum(JOB_STATUSES), n: z.number() }))
    .parse(database().prepare("SELECT status, COUNT(*) AS n FROM jobs GROUP BY status").all())
  return Object.fromEntries(JOB_STATUSES.map((status) => [status, rows.find((row) => row.status === status)?.n ?? 0])) as Record<
    JobStatus,
    number
  >
}

export const setJobStatus = (id: string, status: JobStatus, day: string): void =>
  transaction((db) => {
    const updated = db.prepare("UPDATE jobs SET status = ? WHERE id = ?").run(status, id)
    if (updated.changes !== 1) throw new Error(`No job with id ${id}`)
    db.prepare("DELETE FROM events WHERE kind = 'applied' AND ref = ?").run(id)
    if (status === "applied") db.prepare("INSERT INTO events (kind, ref, day) VALUES ('applied', ?, ?)").run(id, day)
  })

export const upsertJobs = (jobs: IncomingJob[]): void =>
  transaction((db) => {
    const statement = db.prepare(
      `INSERT INTO jobs (id, company, role, location, url, score, has_cv, added_on)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT (id) DO UPDATE SET company = excluded.company, role = excluded.role, location = excluded.location,
         url = excluded.url, score = excluded.score, has_cv = excluded.has_cv`,
    )
    jobs.forEach((job) =>
      statement.run(job.id, job.company, job.role, job.location, job.url, job.score, job.hasCv ? 1 : 0, job.addedOn),
    )
  })
