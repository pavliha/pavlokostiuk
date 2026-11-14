import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"

import GoalMeter from "@/components/internal/GoalMeter"
import LeadRow from "@/components/internal/LeadRow"
import StatusFilter from "@/components/internal/StatusFilter"
import WeekChart from "@/components/internal/WeekChart"
import { DAILY_GOALS, PART_108_DEADLINE, WEEKLY_GOALS } from "@/content/internal"
import { listLeads, type Lead } from "@/lib/internal/crm"
import { requireSignedIn } from "@/lib/internal/auth"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/internal/lead-transition"
import { daysBetween, today, weekOf } from "@/lib/internal/days"
import { countsByDay, eventDays } from "@/lib/internal/events"
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

const AircastPage = async ({ searchParams }: { searchParams: Promise<{ status?: string; all?: string }> }) => {
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
  const day = today()
  const daysLeft = daysBetween(day, PART_108_DEADLINE)
  const days = weekOf(day)
  const week = countsByDay(days)
  const thisWeek = (kind: "contacted" | "replied") => week.reduce((sum, entry) => sum + entry.counts[kind], 0)

  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Aircast</h1>
        <p className="text-muted-foreground">
          US BVLOS operator outreach from the CRM, high fit first. Part 108 statutory deadline {PART_108_DEADLINE}:{" "}
          {daysLeft > 0 ? (
            <>
              <span className="font-mono tabular-nums">{daysLeft}</span> days
            </>
          ) : (
            "passed"
          )}
          .
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <GoalMeter
          label="Operator contacts"
          done={week[days.indexOf(day)].counts.contacted}
          target={DAILY_GOALS.contacts}
          note="New US BVLOS operators reached today, by email or LinkedIn."
        />
        <section aria-labelledby="week-heading" className="grid gap-4 rounded-xl border bg-card p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="week-heading" className="text-sm font-medium">
              This week
            </h2>
            <p className="text-sm text-muted-foreground">
              <span className="font-mono tabular-nums">
                {thisWeek("contacted")} / {WEEKLY_GOALS.contacts}
              </span>{" "}
              contacts · <span className="font-mono tabular-nums">{thisWeek("replied")}</span> replies
            </p>
          </div>
          <WeekChart days={week} today={day} kind="contacted" label="contacts" />
        </section>
      </div>
      <StatusFilter
        basePath="/internal/aircast"
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
        <Link href={`/internal/aircast?status=${status}&all=1`} className="text-primary hover:underline underline-offset-4">
          Show all {visible.length}
        </Link>
      )}
    </>
  )
}

export default AircastPage
