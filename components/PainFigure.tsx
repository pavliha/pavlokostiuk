import type { ReactNode } from "react"

import type { PAIN_KEYS } from "@/content/structure"

type PainKey = (typeof PAIN_KEYS)[number]

const DEAD_DAYS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const CHANNELS = [10, 30, 50, 70]
const BOX_ROWS = [17, 41, 65]
const SCATTERED_BARS = [
  { x: 12, y: 58, h: 18 },
  { x: 28, y: 58, h: 28 },
  { x: 44, y: 58, h: 12 },
  { x: 96, y: 44, h: 22 },
  { x: 112, y: 44, h: 14 },
  { x: 128, y: 44, h: 30 },
  { x: 180, y: 68, h: 16 },
  { x: 196, y: 68, h: 26 },
  { x: 212, y: 68, h: 20 },
]
const JOINED_BARS = [
  { x: 280, h: 24 },
  { x: 296, h: 38 },
  { x: 312, h: 18 },
  { x: 328, h: 46 },
  { x: 344, h: 30 },
  { x: 360, h: 40 },
  { x: 376, h: 26 },
]

const FIGURES: Record<PainKey, ReactNode> = {
  stock: (
    <>
      <path d="M8 48 H392" className="stroke-rule" strokeDasharray="3 5" />
      <path d="M8 14 H110 V28 H210 V48 H286" className="stroke-ledger" strokeWidth="2" />
      <path
        d="M286 48 V68 H392"
        className="stroke-primary dark:stroke-brand-light"
        strokeWidth="2.5"
      />
      <circle cx="286" cy="48" r="4" className="fill-primary dark:fill-brand-light" stroke="none" />
    </>
  ),
  money: (
    <>
      {SCATTERED_BARS.map(({ x, y, h }) => (
        <rect key={`${x}-${y}`} x={x} y={y - h} width="11" height={h} rx="2" className="fill-ledger" stroke="none" />
      ))}
      {JOINED_BARS.map(({ x, h }) => (
        <rect
          key={x}
          x={x}
          y={70 - h}
          width="11"
          height={h}
          rx="2"
          className="fill-primary dark:fill-brand-light"
          stroke="none"
        />
      ))}
      <path d="M276 74 H392" className="stroke-primary dark:stroke-brand-light" strokeWidth="2" />
    </>
  ),
  commission: (
    <>
      <path d="M8 72 H392" className="stroke-rule" />
      <path d="M8 64 C140 62 240 48 392 10" className="stroke-ledger" strokeWidth="2.5" />
      <path d="M8 46 H392" className="stroke-primary dark:stroke-brand-light" strokeWidth="2.5" />
      <circle cx="392" cy="10" r="4" className="fill-ledger" stroke="none" />
      <circle cx="392" cy="46" r="4" className="fill-primary dark:fill-brand-light" stroke="none" />
    </>
  ),
  catalog: (
    <>
      <rect x="20" y="26" width="20" height="20" rx="4" className="stroke-ledger" strokeWidth="2" />
      <rect x="46" y="26" width="20" height="20" rx="4" className="stroke-ledger" strokeWidth="2" />
      <rect
        x="72"
        y="26"
        width="20"
        height="20"
        rx="4"
        className="fill-primary dark:fill-brand-light"
        stroke="none"
      />
      {DEAD_DAYS.map((day) => (
        <rect
          key={day}
          x={72 + (day - 2) * 26}
          y="26"
          width="20"
          height="20"
          rx="4"
          className="stroke-ledger"
          strokeDasharray="3 4"
        />
      ))}
      <path d="M98 62 H378" className="stroke-ledger" strokeDasharray="3 5" />
    </>
  ),
  orders: (
    <>
      {CHANNELS.map((y) => (
        <path key={y} d={`M10 ${y} Q150 ${y} 232 40`} className="stroke-ledger" strokeWidth="2" />
      ))}
      {CHANNELS.map((y) => (
        <circle key={y} cx="10" cy={y} r="4" className="fill-ledger" stroke="none" />
      ))}
      <rect
        x="250"
        y="30"
        width="142"
        height="20"
        rx="10"
        className="fill-primary/15 stroke-primary dark:stroke-brand-light"
        strokeWidth="2"
      />
    </>
  ),
  staff: (
    <>
      <path d="M46 20 C160 20 210 17 296 17" className="stroke-primary dark:stroke-brand-light" strokeWidth="2" />
      {BOX_ROWS.map((y) => (
        <path key={y} d={`M46 60 C170 60 220 ${y} 296 ${y}`} className="stroke-ledger" strokeWidth="2" />
      ))}
      <circle cx="24" cy="12" r="7" className="fill-primary dark:fill-brand-light" stroke="none" />
      <path d="M10 28 Q24 16 38 28" className="stroke-primary dark:stroke-brand-light" strokeWidth="2" />
      <circle cx="24" cy="52" r="7" className="fill-ledger" stroke="none" />
      <path d="M10 68 Q24 56 38 68" className="stroke-ledger" strokeWidth="2" />
      {BOX_ROWS.map((y) => (
        <rect
          key={y}
          x="300"
          y={y - 9}
          width="52"
          height="18"
          rx="4"
          className={
            y === 17
              ? "fill-primary/15 stroke-primary dark:stroke-brand-light"
              : "stroke-ledger"
          }
          strokeWidth="2"
        />
      ))}
    </>
  ),
}

const PainFigure = ({ name }: { name: PainKey }) => (
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
