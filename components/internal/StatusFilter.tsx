import Link from "next/link"

const StatusFilter = ({
  basePath,
  current,
  options,
}: {
  basePath: string
  current: string
  options: readonly { value: string; label: string; count: number }[]
}) => (
  <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
    {options.map((option) => (
      <Link
        key={option.value}
        href={`${basePath}?status=${option.value}`}
        aria-current={option.value === current ? "page" : undefined}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
          option.value === current
            ? "bg-foreground text-background border-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {option.label}
        <span className="font-mono tabular-nums">{option.count}</span>
      </Link>
    ))}
  </nav>
)

export default StatusFilter
