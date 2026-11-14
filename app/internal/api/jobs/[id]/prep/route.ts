import { isIngestRequest, unauthorized } from "@/lib/internal/ingest-auth"
import { setPrep } from "@/lib/internal/jobs"
import { traced } from "@/lib/internal/log"

const MAX_PREP_CHARS = 200_000

export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  if (!isIngestRequest(request)) return unauthorized()
  const { id } = await params
  const prep = await request.text()
  if (!prep.trim() || prep.length > MAX_PREP_CHARS) {
    return Response.json({ error: `Body must be 1–${MAX_PREP_CHARS} characters of markdown` }, { status: 400 })
  }
  await traced("internal.job.prep", { jobId: id, chars: prep.length }, async () => setPrep(id, prep))
  return Response.json({ id, chars: prep.length })
}
