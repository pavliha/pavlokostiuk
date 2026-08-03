const TagList = ({ tags }: { tags: readonly string[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
      <span
        key={tag}
        className="text-xs px-2.5 py-1 rounded-md bg-accent/10 text-indigo-700 dark:text-indigo-300 border border-accent/15"
      >
        {tag}
      </span>
    ))}
  </div>
)

export default TagList
