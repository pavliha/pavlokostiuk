import type { ShotPainKey } from "@/content/media"
import type { PainKey } from "@/content/structure"

type FigureKey = Exclude<PainKey, ShotPainKey>

const FIGURES: Record<FigureKey, React.ReactNode> = {
  commission: (
    <>
      <path d="M8 72 H392" className="stroke-rule" />
      <path d="M8 64 C140 62 240 48 392 10" className="stroke-ledger" strokeWidth="2.5" />
      <path d="M8 46 H392" className="stroke-primary dark:stroke-brand-light" strokeWidth="2.5" />
      <circle cx="392" cy="10" r="4" className="fill-ledger" stroke="none" />
      <circle cx="392" cy="46" r="4" className="fill-primary dark:fill-brand-light" stroke="none" />
    </>
  ),
}

const PainFigure = ({ name }: { name: FigureKey }) => (
  <svg
    viewBox="0 0 400 80"
    fill="none"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="w-full h-auto mb-5"
  >
    {FIGURES[name]}
  </svg>
)

export default PainFigure
