import GoalMeter from "@/components/internal/GoalMeter"
import NetworkChecklist from "@/components/internal/NetworkChecklist"
import WeekChart from "@/components/internal/WeekChart"
import { DAILY_GOALS, NETWORKS, WEEKLY_GOALS } from "@/content/internal"
import { formatDay, today, weekOf } from "@/lib/internal/days"
import { countsByDay, eventDays } from "@/lib/internal/events"

const TodayPage = () => {
  const day = today()
  const week = countsByDay(weekOf(day))
  const todays = week[weekOf(day).indexOf(day)].counts
  const total = (kind: "applied" | "contacted" | "replied") => week.reduce((sum, entry) => sum + entry.counts[kind], 0)
  const joined = eventDays("network")

  return (
    <>
      <header className="grid gap-1">
        <p className="text-sm text-muted-foreground">{formatDay(day, "EEEE, d MMMM")}</p>
        <h1 className="text-3xl font-semibold tracking-tight">Today</h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GoalMeter
          label="Applications"
          done={todays.applied}
          target={DAILY_GOALS.applications}
          note="Roles scored 4.0 or higher, each with its tailored CV."
        />
        <GoalMeter
          label="Operator contacts"
          done={todays.contacted}
          target={DAILY_GOALS.contacts}
          note="New US BVLOS operators reached, by email or LinkedIn."
        />
        <GoalMeter
          label="Network sign-up"
          done={todays.network}
          target={DAILY_GOALS.networks}
          note={`${NETWORKS.length - joined.size} of ${NETWORKS.length} networks still to join.`}
        />
      </div>

      <section aria-labelledby="week-heading" className="grid gap-4 rounded-xl border bg-card p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="week-heading" className="font-medium">
            This week
          </h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono tabular-nums">
              {total("applied")} / {WEEKLY_GOALS.applications}
            </span>{" "}
            applications ·{" "}
            <span className="font-mono tabular-nums">
              {total("contacted")} / {WEEKLY_GOALS.contacts}
            </span>{" "}
            contacts ·{" "}
            <span className="font-mono tabular-nums">{total("replied")}</span> replies
          </p>
        </div>
        <WeekChart days={week} today={day} />
        <p className="flex gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-primary" aria-hidden="true" />
            Applications
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-foreground/50" aria-hidden="true" />
            Operator contacts
          </span>
        </p>
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

export default TodayPage
