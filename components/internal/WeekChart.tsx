import type { DayTally, EventKind } from "@/lib/internal/events"
import { formatDay } from "@/lib/internal/days"

const BAR_HEIGHT = 56

const WeekChart = ({ days, today, kind, label }: { days: DayTally[]; today: string; kind: EventKind; label: string }) => {
  const peak = Math.max(3, ...days.map(({ counts }) => counts[kind]))
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(({ day, counts }) => (
        <div key={day} className="grid justify-items-center gap-1 text-xs">
          <div
            className="flex items-end"
            style={{ height: `${BAR_HEIGHT}px` }}
            aria-label={`${formatDay(day, "EEEE")}: ${counts[kind]} ${label}`}
          >
            <span
              className="w-3 rounded-t-sm bg-primary min-h-0.5"
              style={{ height: `${Math.round((counts[kind] / peak) * BAR_HEIGHT)}px` }}
            />
          </div>
          <span className={day === today ? "font-semibold" : "text-muted-foreground"}>{formatDay(day, "EEE")}</span>
        </div>
      ))}
    </div>
  )
}

export default WeekChart
