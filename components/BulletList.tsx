import { cn } from "@/lib/utils"

const BulletList = ({
  items,
  className,
  itemClassName,
  dotClassName,
}: {
  items: readonly string[]
  className: string
  itemClassName?: string
  dotClassName: string
}) => (
  <ul className={className}>
    {items.map((item) => (
      <li key={item} className={cn("flex gap-3", itemClassName)}>
        <span
          aria-hidden="true"
          className={cn("mt-[0.6em] size-1 shrink-0 rounded-full", dotClassName)}
        />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export default BulletList
