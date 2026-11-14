import { isPdf, saveCv } from "@/lib/internal/cv-store"
import { isIngestRequest, unauthorized } from "@/lib/internal/ingest-auth"
import { markCv } from "@/lib/internal/jobs"
import { traced } from "@/lib/internal/log"

export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  if (!isIngestRequest(request)) return unauthorized()
  const { id } = await params
  const bytes = Buffer.from(await request.arrayBuffer())
  if (!isPdf(bytes)) return Response.json({ error: "Body must be a PDF of at most 5 MB" }, { status: 400 })
  await traced("internal.job.cv", { jobId: id, bytes: bytes.length }, async () => {
    markCv(id)
    saveCv(id, bytes)
  })
  return Response.json({ id, bytes: bytes.length })
}
