import TagList from "./TagList"

export type Experience = {
  title: string
  role: string
  via?: string
  duration: string
  body: string
  tags: readonly string[]
}

const ExperienceCard = ({ title, role, via, duration, body, tags }: Experience) => (
  <div className="bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-surface-hover transition-all">
    <div className="flex justify-between items-start gap-4 mb-2 flex-wrap">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-indigo-700 dark:text-indigo-300 text-sm font-medium">
          {role} {via ? <span className="text-zinc-600 dark:text-zinc-400">via {via}</span> : null}
        </div>
      </div>
      <span className="text-xs text-zinc-600 dark:text-zinc-300 bg-accent/10 px-3 py-1 rounded-md whitespace-nowrap">
        {duration}
      </span>
    </div>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-4">{body}</p>
    <TagList tags={tags} />
  </div>
)

export default ExperienceCard
