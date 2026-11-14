import { formatDay } from "@/lib/internal/days"

const BAR_HEIGHT = 56

const WeekChart = ({ days, today, label }: { days: { day: string; value: number }[]; today: string; label: string }) => {
  const peak = Math.max(3, ...days.map(({ value }) => value))
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(({ day, value }) => (
        <div key={day} className="grid justify-items-center gap-1 text-xs">
          <div className="flex items-end" style={{ height: `${BAR_HEIGHT}px` }} aria-label={`${formatDay(day, "EEEE")}: ${value} ${label}`}>
            <span className="w-3 rounded-t-sm bg-primary min-h-0.5" style={{ height: `${Math.round((value / peak) * BAR_HEIGHT)}px` }} />
          </div>
          <span className={day === today ? "font-semibold" : "text-muted-foreground"}>{formatDay(day, "EEE")}</span>
        </div>
      ))}
    </div>
  )
}

export default WeekChart
