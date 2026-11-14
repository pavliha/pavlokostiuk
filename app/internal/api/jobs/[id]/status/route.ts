import { z } from "zod"

import { today } from "@/lib/internal/days"
import { isIngestRequest, parseJson, unauthorized } from "@/lib/internal/ingest-auth"
import { JOB_STATUSES, JobTransitionError } from "@/lib/internal/job-transition"
import { setJobStatus } from "@/lib/internal/jobs"
import { traced } from "@/lib/internal/log"

const payloadSchema = z.object({ status: z.enum(JOB_STATUSES), source: z.string().min(1).max(200) })

export const POST = async (request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  if (!isIngestRequest(request)) return unauthorized()
  const payload = await parseJson(request, payloadSchema)
  if (payload instanceof Response) return payload
  const { id } = await params
  const outcome = await traced("internal.job.update", { jobId: id, status: payload.status, source: payload.source }, async () => {
    try {
      setJobStatus(id, payload.status, today())
      return null
    } catch (error) {
      if (error instanceof JobTransitionError) return error.message
      throw error
    }
  })
  return outcome === null ? Response.json({ id, status: payload.status }) : Response.json({ error: outcome }, { status: 409 })
}
