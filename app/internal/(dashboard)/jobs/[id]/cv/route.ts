import { currentSession } from "@/lib/internal/auth"
import { readCv } from "@/lib/internal/cv-store"
import { jobById } from "@/lib/internal/jobs"

const fileName = (company: string): string => `Pavlo-Kostiuk-CV-${company.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "")}.pdf`

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
  if (!(await currentSession())) return new Response("Sign in first", { status: 401 })
  const job = jobById((await params).id)
  if (!job.hasCv) return new Response("No CV for this job", { status: 404 })
  return new Response(new Uint8Array(readCv(job.id)), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName(job.company)}"`,
      "Cache-Control": "private, no-store",
    },
  })
}
