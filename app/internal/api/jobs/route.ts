import { z } from "zod"

import { incomingEventSchema, importEvents } from "@/lib/internal/events"
import { incomingJobSchema, replacePipeline } from "@/lib/internal/jobs"
import { internalEnv } from "@/lib/internal/env"
import { traced } from "@/lib/internal/log"
import { matchesSecret } from "@/lib/internal/secret"

const payloadSchema = z.object({
  jobs: z.array(incomingJobSchema).max(1000),
  events: z.array(incomingEventSchema).max(1000),
})

const NOT_JSON = Symbol("not json")

export const POST = async (request: Request): Promise<Response> => {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "")
  if (!token || !matchesSecret(token, internalEnv().INTERNAL_INGEST_TOKEN)) {
    return Response.json({ error: "unauthorized" }, { status: 401 })
  }

  const body: unknown = await request.json().catch(() => NOT_JSON)
  if (body === NOT_JSON) return Response.json({ error: "Body is not JSON" }, { status: 400 })
  const payload = payloadSchema.safeParse(body)
  if (!payload.success) return Response.json({ error: z.prettifyError(payload.error) }, { status: 400 })

  const { jobs, events } = payload.data
  await traced("internal.ingest", { jobs: jobs.length, events: events.length }, async () => {
    replacePipeline(jobs)
    importEvents(events)
  })
  return Response.json({ jobs: jobs.length, events: events.length })
}
