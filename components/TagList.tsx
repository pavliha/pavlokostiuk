import { Badge } from "@/components/ui/badge"

const TagList = ({ tags }: { tags: readonly string[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <Badge key={tag} variant="outline" className="text-primary dark:text-brand-light border-primary/20">
        {tag}
      </Badge>
    ))}
  </div>
)

export default TagList
