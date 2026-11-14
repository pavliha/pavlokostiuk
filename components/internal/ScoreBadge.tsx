import { Badge } from "@/components/ui/badge"

const ScoreBadge = ({ score }: { score: number | null }) =>
  score === null ? (
    <Badge variant="outline">Not scored</Badge>
  ) : (
    <Badge variant={score >= 4 ? "default" : "outline"} className="font-mono tabular-nums">
      {score.toFixed(1)}
    </Badge>
  )

export default ScoreBadge
