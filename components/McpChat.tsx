"use client"

import { useEffect, useState } from "react"

type Turn = { role: "user" | "tool" | "reply"; text: string }

const WINDOW = 8

const HOLD: Record<Turn["role"], number> = { user: 1000, tool: 1200, reply: 2600 }

const SHELL =
  "rounded-2xl overflow-hidden border border-[#E0DED5] dark:border-[#3B3A37] bg-[#FAF9F5] dark:bg-[#262624]"
const BAR = "border-[#E0DED5] dark:border-[#3B3A37] bg-[#F0EEE6] dark:bg-[#30302E]"
const MUTED = "text-[#6C6B66] dark:text-[#A3A29C]"
const BUBBLE =
  "bg-[#F0EEE6] dark:bg-[#3A3A37] text-[#1F1E1C] dark:text-[#F2F0E9] rounded-2xl rounded-tr-md"
const CARD =
  "border border-[#E0DED5] dark:border-[#3B3A37] bg-white/70 dark:bg-black/20 rounded-lg"

const ClaudeMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    {[0, 30, 60, 90, 120, 150].map((angle) => (
      <rect
        key={angle}
        x="11.1"
        y="2.4"
        width="1.8"
        height="19.2"
        rx="0.9"
        transform={`rotate(${angle} 12 12)`}
      />
    ))}
  </svg>
)

export default function McpChat({
  title,
  placeholder,
  turns,
}: {
  title: string
  placeholder: string
  turns: Turn[]
}) {
  const [sent, setSent] = useState(1)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSent(turns.length)
      return
    }
    const id = setTimeout(() => setSent(sent + 1), HOLD[turns[(sent - 1) % turns.length].role])
    return () => clearTimeout(id)
  }, [sent, turns])

  const visible = Array.from({ length: Math.min(sent, WINDOW) }, (_, i) =>
    Math.max(0, sent - WINDOW) + i,
  )

  return (
    <div className={SHELL}>
      <div className={`flex items-center gap-2.5 border-b px-4 py-3 ${BAR}`}>
        <ClaudeMark className="size-4 text-[#D97757]" />
        <span className="text-sm font-medium text-[#1F1E1C] dark:text-[#F2F0E9]">Claude</span>
        <span className={`text-xs ${MUTED} border-l border-[#D6D4CA] dark:border-[#484744] pl-2.5 truncate`}>
          {title}
        </span>
      </div>

      <div className="px-4 sm:px-6 pb-5 h-[34rem] sm:h-[32rem] overflow-hidden flex flex-col justify-end">
        {visible.map((cursor) => {
          const turn = turns[cursor % turns.length]
          const isLatest = cursor === sent - 1
          return (
          <div
            key={cursor}
            className={
              isLatest
                ? "grid grid-rows-[0fr] animate-[chat-grow_450ms_cubic-bezier(0.22,1,0.36,1)_forwards] motion-reduce:grid-rows-[1fr] motion-reduce:animate-none"
                : "grid grid-rows-[1fr]"
            }
          >
            <div
              className={`overflow-hidden pt-5 ${
                isLatest ? "animate-in fade-in duration-700" : ""
              }`}
            >
              {turn.role === "user" && (
                <p
                  className={`ml-auto w-fit max-w-[85%] px-4 py-2.5 text-base leading-[1.5] ${BUBBLE}`}
                >
                  {turn.text}
                </p>
              )}

              {turn.role === "tool" && (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${CARD}`}>
                  <span
                    className={`size-1.5 rounded-full bg-[#D97757] ${
                      isLatest ? "animate-pulse" : ""
                    }`}
                  />
                  <span className={`printed text-[12px] ${MUTED} break-words`}>{turn.text}</span>
                </div>
              )}

              {turn.role === "reply" && (
                <div className="flex gap-3">
                  <ClaudeMark className="size-4 mt-1 shrink-0 text-[#D97757]" />
                  <p className="font-serif text-base leading-[1.65] whitespace-pre-line text-[#1F1E1C] dark:text-[#F2F0E9]">
                    {turn.text}
                  </p>
                </div>
              )}
            </div>
          </div>
          )
        })}
      </div>

      <div className="px-4 sm:px-6 pb-5">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-[#D6D4CA] dark:border-[#484744] bg-white dark:bg-[#30302E]`}
        >
          <span className={`text-base ${MUTED} truncate`}>{placeholder}</span>
          <span className="ml-auto grid place-items-center size-7 rounded-lg bg-[#D97757] text-white shrink-0">
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 fill-current">
              <path d="M8 2.5 13 8h-3v5.5H6V8H3z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
