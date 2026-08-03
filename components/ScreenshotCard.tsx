import Image from "next/image"

export type Screenshot = { src: string; alt: string; title: string; body: string }

const ScreenshotCard = ({ src, alt, title, body }: Screenshot) => (
  <div className="bg-white dark:bg-surface border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
    <Image src={src} alt={alt} width={2880} height={1800} className="w-full h-auto" loading="lazy" />
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{body}</p>
    </div>
  </div>
)

export default ScreenshotCard
