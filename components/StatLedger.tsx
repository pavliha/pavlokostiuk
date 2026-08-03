export type Stat = { value: string; label: string }

const StatLedger = ({ hero, note, rest }: { hero: Stat; note: string; rest: readonly Stat[] }) => (
  <div>
    <div className="flex items-baseline gap-4 flex-wrap">
      <span className="figure text-6xl sm:text-7xl font-bold leading-[0.9] text-ink">{hero.value}</span>
      <span className="text-base font-medium text-ink-2 max-w-72 leading-snug">{hero.label}</span>
    </div>
    <p className="text-sm text-muted-foreground mt-3 mb-7">{note}</p>
    <dl className="grid grid-cols-1 sm:grid-cols-3 border-t border-rule">
      {rest.map(({ value, label }, index) => (
        <div
          key={label}
          className={`pt-4 pr-6 pb-1 ${index < rest.length - 1 ? "sm:border-r border-rule" : ""} ${
            index > 0 ? "border-t sm:border-t-0 border-rule mt-4 sm:mt-0" : ""
          } ${index > 0 ? "sm:pl-6" : ""}`}
        >
          <dt
            className={`figure text-xl font-semibold mb-1 ${
              index === rest.length - 1 ? "text-primary dark:text-brand-light" : "text-ink"
            }`}
          >
            {value}
          </dt>
          <dd className="text-xs text-muted-foreground leading-snug">{label}</dd>
        </div>
      ))}
    </dl>
  </div>
)

export default StatLedger
