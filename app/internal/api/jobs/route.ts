import { z } from "zod"

import { incomingEventSchema, importEvents } from "@/lib/internal/events"
import { incomingJobSchema, upsertJobs } from "@/lib/internal/jobs"
import { internalEnv } from "@/lib/internal/env"
import { matchesSecret } from "@/lib/internal/session"

const payloadSchema = z.object({
  jobs: z.array(incomingJobSchema).max(1000),
  events: z.array(incomingEventSchema).max(1000),
})

export const POST = async (request: Request): Promise<Response> => {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "")
  if (!token || !matchesSecret(token, internalEnv().INTERNAL_INGEST_TOKEN)) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  const payload = payloadSchema.safeParse(await request.json())
  if (!payload.success) return Response.json({ error: z.prettifyError(payload.error) }, { status: 400 })

  upsertJobs(payload.data.jobs)
  importEvents(payload.data.events)
  return Response.json({ jobs: payload.data.jobs.length, events: payload.data.events.length })
}
