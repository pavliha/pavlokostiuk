import { Check } from "lucide-react"

import { NETWORKS } from "@/content/internal"
import { toggleNetwork } from "@/app/internal/actions"

const NetworkChecklist = ({ joined }: { joined: Map<string, string> }) => (
  <ul className="flex flex-wrap gap-2">
    {NETWORKS.map((network) => (
      <li key={network.id} className="flex items-center gap-1 rounded-lg border bg-card pl-1 pr-3">
        <form action={toggleNetwork}>
          <input type="hidden" name="id" value={network.id} />
          <button
            type="submit"
            aria-pressed={joined.has(network.id)}
            className="inline-flex min-h-11 items-center gap-2 px-2 text-sm"
          >
            <span
              aria-hidden="true"
              className={`grid size-4 place-items-center rounded border ${
                joined.has(network.id) ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/50"
              }`}
            >
              {joined.has(network.id) && <Check className="size-3" />}
            </span>
            <span className={joined.has(network.id) ? "line-through text-muted-foreground" : undefined}>{network.name}</span>
          </button>
        </form>
        <a href={network.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${network.name}`} className="text-primary">
          ↗
        </a>
      </li>
    ))}
  </ul>
)

export default NetworkChecklist
