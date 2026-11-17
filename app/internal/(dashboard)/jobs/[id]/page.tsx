import Link from "next/link"
import { notFound } from "next/navigation"

import ScoreBadge from "@/components/internal/ScoreBadge"
import { requireSignedIn } from "@/lib/internal/auth"
import { jobById, jobPrep } from "@/lib/internal/jobs"

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await requireSignedIn()
  const { id } = await params
  const job = jobById(id)
  const prep = jobPrep(id)
  if (prep === null) notFound()
  return (
    <>
      <header className="grid gap-2">
        <Link href="/internal/jobs" className="text-sm text-primary hover:underline underline-offset-4">
          ← Board
        </Link>
        <div className="flex flex-wrap items-baseline gap-3">
          <ScoreBadge score={job.score} />
          <h1 className="text-3xl font-semibold tracking-tight">{job.company}</h1>
        </div>
        <p className="text-muted-foreground">{job.role} · interview prep</p>
      </header>
      <article className="rounded-xl border bg-card p-4 whitespace-pre-wrap text-sm leading-relaxed">{prep}</article>
    </>
  )
}

export default JobPage
