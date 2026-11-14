import { headers } from "next/headers"
import Link from "next/link"

import FollowUpRow from "@/components/internal/FollowUpRow"
import GoalMeter from "@/components/internal/GoalMeter"
import JobRow from "@/components/internal/JobRow"
import NetworkChecklist from "@/components/internal/NetworkChecklist"
import PasskeyPrompt from "@/components/internal/PasskeyPrompt"
import WeekChart from "@/components/internal/WeekChart"
import { DAILY_GOALS, FOLLOW_UP_AFTER_DAYS, NETWORKS, WEEKLY_GOALS } from "@/content/internal"
import { authReady, requireSignedIn } from "@/lib/internal/auth"
import { daysBefore, daysBetween, formatDay, today, weekOf } from "@/lib/internal/days"
import { countsByDay, eventDays } from "@/lib/internal/events"
import { followUps, listJobs } from "@/lib/internal/jobs"

const NEXT_UP = 3

const JobSearchPage = async () => {
  await requireSignedIn()
  const passkeys = await (await authReady()).api.listPasskeys({ headers: await headers() })
  const day = today()
  const days = weekOf(day)
  const week = countsByDay(days)
  const todays = week[days.indexOf(day)].counts
  const appliedThisWeek = week.reduce((sum, entry) => sum + entry.counts.applied, 0)
  const joined = eventDays("network")
  const ready = listJobs("ready")
  const overdue = followUps(daysBefore(day, FOLLOW_UP_AFTER_DAYS))

  return (
    <>
      <header className="grid gap-1">
        <p className="text-sm text-muted-foreground">{formatDay(day, "EEEE, d MMMM")}</p>
        <h1 className="text-3xl font-semibold tracking-tight">Job search</h1>
      </header>

      {passkeys.length === 0 && <PasskeyPrompt />}

      <div className="grid gap-4 sm:grid-cols-2">
        <GoalMeter
          label="Applications"
          done={todays.applied}
          target={DAILY_GOALS.applications}
          note={`${ready.length} ${ready.length === 1 ? "role is" : "roles are"} ready to apply (scored 4.0 or higher).`}
        />
        <GoalMeter
          label="Network sign-up"
          done={todays.network}
          target={DAILY_GOALS.networks}
          note={`${NETWORKS.length - joined.size} of ${NETWORKS.length} networks still to join.`}
        />
      </div>

      <section aria-labelledby="next-heading" className="grid gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="next-heading" className="font-medium">
            Next up
          </h2>
          <Link href="/internal/jobs" className="text-sm text-primary hover:underline underline-offset-4">
            All jobs
          </Link>
        </div>
        {ready.length ? (
          <ul className="rounded-xl border bg-card px-4">
            {ready.slice(0, NEXT_UP).map((job) => (
              <JobRow key={job.id} job={job} canApply />
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No role scored 4.0 or higher is waiting. The daily run adds new ones each morning.</p>
        )}
      </section>

      {overdue.length > 0 && (
        <section aria-labelledby="follow-up-heading" className="grid gap-3">
          <h2 id="follow-up-heading" className="font-medium">
            Follow up
          </h2>
          <ul className="rounded-xl border bg-card px-4">
            {overdue.map((job) => (
              <FollowUpRow key={job.id} job={job} daysSince={daysBetween(job.appliedOn, day)} />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="week-heading" className="grid gap-4 rounded-xl border bg-card p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="week-heading" className="font-medium">
            This week
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">
              {appliedThisWeek} / {WEEKLY_GOALS.applications}
            </span>{" "}
            applications
          </p>
        </div>
        <WeekChart days={week} today={day} kind="applied" label="applications" />
      </section>

      <section aria-labelledby="networks-heading" className="grid gap-3">
        <h2 id="networks-heading" className="font-medium">
          Job networks to join
        </h2>
        <NetworkChecklist joined={joined} />
      </section>
    </>
  )
}

export default JobSearchPage
