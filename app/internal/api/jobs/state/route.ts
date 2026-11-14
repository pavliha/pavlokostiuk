import { isIngestRequest, unauthorized } from "@/lib/internal/ingest-auth"
import { pipelineState } from "@/lib/internal/jobs"

export const GET = (request: Request): Response =>
  isIngestRequest(request) ? Response.json({ jobs: pipelineState() }) : unauthorized()
