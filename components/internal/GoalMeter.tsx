import { Badge } from "@/components/ui/badge"

const GoalMeter = ({ label, done, target, note }: { label: string; done: number; target: number; note: string }) => (
  <section aria-label={label} className="grid gap-3 rounded-xl border bg-card p-4">
    <div className="flex items-center justify-between gap-2">
      <h2 className="text-sm font-medium">{label}</h2>
      {done >= target ? <Badge>Done</Badge> : <Badge variant="outline">{target - done} to go</Badge>}
    </div>
    <p className="font-mono tabular-nums">
      <span className="text-3xl">{done}</span>
      <span className="text-muted-foreground"> / {target}</span>
    </p>
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: target }, (_, index) => (
        <span key={index} className={`h-1.5 flex-1 rounded-full ${index < done ? "bg-primary" : "bg-border"}`} />
      ))}
    </div>
    <p className="text-sm text-muted-foreground">{note}</p>
  </section>
)

export default GoalMeter
