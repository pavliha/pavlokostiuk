import type { DayTally } from "@/lib/internal/events"
import { formatDay } from "@/lib/internal/days"

const BAR_HEIGHT = 56

const WeekChart = ({ days, today }: { days: DayTally[]; today: string }) => {
  const peak = Math.max(3, ...days.flatMap(({ counts }) => [counts.applied, counts.contacted]))
  const height = (value: number) => `${Math.round((value / peak) * BAR_HEIGHT)}px`
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(({ day, counts }) => (
        <div key={day} className="grid justify-items-center gap-1 text-xs">
          <div
            className="flex items-end gap-1"
            style={{ height: `${BAR_HEIGHT}px` }}
            aria-label={`${formatDay(day, "EEEE")}: ${counts.applied} applications, ${counts.contacted} contacts`}
          >
            <span className="w-2.5 rounded-t-sm bg-primary min-h-0.5" style={{ height: height(counts.applied) }} />
            <span className="w-2.5 rounded-t-sm bg-foreground/50 min-h-0.5" style={{ height: height(counts.contacted) }} />
          </div>
          <span className={day === today ? "font-semibold" : "text-muted-foreground"}>{formatDay(day, "EEE")}</span>
        </div>
      ))}
    </div>
  )
}

export default WeekChart
