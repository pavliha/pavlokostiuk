const NODES = [
  { cx: 120, cy: 80, r: 6 },
  { cx: 280, cy: 160, r: 8 },
  { cx: 400, cy: 100, r: 5 },
  { cx: 80, cy: 240, r: 7 },
  { cx: 320, cy: 300, r: 10 },
  { cx: 200, cy: 350, r: 6 },
  { cx: 440, cy: 260, r: 5 },
  { cx: 340, cy: 430, r: 7 },
] as const

const LINKS = [
  { x1: 120, y1: 80, x2: 280, y2: 160, w: 1 },
  { x1: 280, y1: 160, x2: 400, y2: 100, w: 1 },
  { x1: 280, y1: 160, x2: 320, y2: 300, w: 1 },
  { x1: 120, y1: 80, x2: 80, y2: 240, w: 1 },
  { x1: 80, y1: 240, x2: 200, y2: 350, w: 1 },
  { x1: 200, y1: 350, x2: 320, y2: 300, w: 1 },
  { x1: 320, y1: 300, x2: 440, y2: 260, w: 1 },
  { x1: 400, y1: 100, x2: 440, y2: 260, w: 1 },
  { x1: 200, y1: 350, x2: 340, y2: 430, w: 1 },
  { x1: 320, y1: 300, x2: 340, y2: 430, w: 1 },
  { x1: 80, y1: 240, x2: 320, y2: 300, w: 0.5 },
  { x1: 120, y1: 80, x2: 320, y2: 300, w: 0.5 },
] as const

const RINGS = [
  { cx: 280, cy: 160, r: 20, w: 0.5, dash: undefined },
  { cx: 320, cy: 300, r: 24, w: 0.5, dash: undefined },
  { cx: 120, cy: 80, r: 16, w: 0.5, dash: undefined },
  { cx: 250, cy: 250, r: 180, w: 0.5, dash: "4 8" },
  { cx: 250, cy: 250, r: 120, w: 0.3, dash: "2 6" },
] as const

const HeroBackdrop = () => (
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.08] dark:opacity-[0.15] pointer-events-none z-0">
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {LINKS.map(({ x1, y1, x2, y2, w }) => (
        <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#heroGrad)" strokeWidth={w} />
      ))}
      {NODES.map(({ cx, cy, r }) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="url(#heroGrad)" />
      ))}
      {RINGS.map(({ cx, cy, r, w, dash }) => (
        <circle key={`${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} stroke="url(#heroGrad)" strokeWidth={w} strokeDasharray={dash} fill="none" />
      ))}
    </svg>
  </div>
)

export default HeroBackdrop
