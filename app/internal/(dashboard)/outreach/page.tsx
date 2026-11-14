import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"

import LeadRow from "@/components/internal/LeadRow"
import StatusFilter from "@/components/internal/StatusFilter"
import { PART_108_DEADLINE } from "@/content/internal"
import { listLeads, type Lead } from "@/lib/internal/crm"
import { requireSignedIn } from "@/lib/internal/auth"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/internal/lead-transition"
import { daysBetween, today } from "@/lib/internal/days"
import { eventDays } from "@/lib/internal/events"
import { internalEnv } from "@/lib/internal/env"

const LABELS = { NEW: "To contact", CONTACTED: "Contacted", REPLIED: "Replied", INTERESTED: "Interested" } as const

const FIT_ORDER = ["HIGH", "MEDIUM", "LOW", "UNKNOWN", "NONE"] as const

const fitRank = (lead: Lead) => (lead.fit === null ? FIT_ORDER.length : FIT_ORDER.indexOf(lead.fit))

const PAGE_SIZE = 40

const statusFrom = (value: string | undefined): LeadStatus => {
  if (value === undefined) return "NEW"
  const parsed = z.enum(LEAD_STATUSES).safeParse(value)
  return parsed.success ? parsed.data : notFound()
}

const OutreachPage = async ({ searchParams }: { searchParams: Promise<{ status?: string; all?: string }> }) => {
  await requireSignedIn()
  const params = await searchParams
  const status = statusFrom(params.status)
  const showAll = params.all === "1"
  const leads = await listLeads()
  const visible = leads
    .filter((lead) => lead.leadStatus === status)
    .toSorted((a, b) => fitRank(a) - fitRank(b) || a.name.localeCompare(b.name))
  const contacted = eventDays("contacted")
  const crmBase = new URL(internalEnv().TWENTY_API_URL).origin
  const daysLeft = daysBetween(today(), PART_108_DEADLINE)

  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Outreach</h1>
        <p className="text-muted-foreground">
          Aircast leads from the CRM, high fit first. Part 108 statutory deadline {PART_108_DEADLINE}:{" "}
          <span className="font-mono tabular-nums">{daysLeft > 0 ? `${daysLeft} days` : "passed"}</span>.
        </p>
      </header>
      <StatusFilter
        basePath="/internal/outreach"
        current={status}
        options={LEAD_STATUSES.map((value) => ({
          value,
          label: LABELS[value],
          count: leads.filter((lead) => lead.leadStatus === value).length,
        }))}
      />
      {visible.length ? (
        <ul className="rounded-xl border bg-card px-4">
          {(showAll ? visible : visible.slice(0, PAGE_SIZE)).map((lead) => (
            <LeadRow key={lead.id} lead={lead} contactedOn={contacted.get(lead.id)} crmUrl={`${crmBase}/object/company/${lead.id}`} />
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">Nothing here yet.</p>
      )}
      {!showAll && visible.length > PAGE_SIZE && (
        <Link href={`/internal/outreach?status=${status}&all=1`} className="text-primary hover:underline underline-offset-4">
          Show all {visible.length}
        </Link>
      )}
    </>
  )
}

export default OutreachPage
