import Image from "next/image"

export type Screenshot = {
  src: string
  alt: string
  title: string
  body: string
  width: number
  height: number
}

const ScreenshotCard = ({ src, alt, title, body, width, height }: Screenshot) => (
  <figure className="border border-rule bg-card rounded-xl overflow-hidden">
    <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto border-b border-rule" loading="lazy" />
    <figcaption className="p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>
      <p className="text-base text-ink-2 leading-[1.55]">{body}</p>
    </figcaption>
  </figure>
)

export default ScreenshotCard
