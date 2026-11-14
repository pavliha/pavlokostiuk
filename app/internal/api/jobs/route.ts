import { z } from "zod"

import { removeCvs } from "@/lib/internal/cv-store"
import { isIngestRequest, parseJson, unauthorized } from "@/lib/internal/ingest-auth"
import { incomingJobSchema, replacePipeline } from "@/lib/internal/jobs"
import { traced } from "@/lib/internal/log"

const payloadSchema = z.object({ jobs: z.array(incomingJobSchema).max(1000) })

export const POST = async (request: Request): Promise<Response> => {
  if (!isIngestRequest(request)) return unauthorized()
  const payload = await parseJson(request, payloadSchema)
  if (payload instanceof Response) return payload
  const removed = await traced("internal.ingest.jobs", { jobs: payload.jobs.length }, async () => {
    const ids = replacePipeline(payload.jobs)
    removeCvs(ids)
    return ids
  })
  return Response.json({ jobs: payload.jobs.length, removed: removed.length })
}
