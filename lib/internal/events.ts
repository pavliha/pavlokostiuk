import { z } from "zod"

import { database, transaction } from "@/lib/internal/db"

export const EVENT_KINDS = ["applied", "contacted", "replied", "interested", "network"] as const
export type EventKind = (typeof EVENT_KINDS)[number]

export const incomingEventSchema = z.object({
  kind: z.enum(EVENT_KINDS),
  ref: z.string().min(1).max(200),
  day: z.iso.date(),
})

export type IncomingEvent = z.infer<typeof incomingEventSchema>

export type DayCounts = Record<EventKind, number>

const zeroCounts = (): DayCounts =>
  Object.fromEntries(EVENT_KINDS.map((kind) => [kind, 0])) as DayCounts

export type DayTally = { day: string; counts: DayCounts }

export const countsByDay = (days: string[]): DayTally[] => {
  const rows = z
    .array(z.object({ day: z.string(), kind: z.enum(EVENT_KINDS), n: z.number() }))
    .parse(
      database()
        .prepare(
          `SELECT day, kind, COUNT(*) AS n FROM events
           WHERE day IN (${days.map(() => "?").join(", ")}) GROUP BY day, kind`,
        )
        .all(...days),
    )
  return days.map((day) => ({
    day,
    counts: rows.filter((row) => row.day === day).reduce((counts, row) => ({ ...counts, [row.kind]: row.n }), zeroCounts()),
  }))
}

export const eventDays = (kind: EventKind): Map<string, string> =>
  new Map(
    z
      .array(z.object({ ref: z.string(), day: z.string() }))
      .parse(database().prepare("SELECT ref, day FROM events WHERE kind = ?").all(kind))
      .map((row) => [row.ref, row.day]),
  )

export const recordEvent = (kind: EventKind, ref: string, day: string): void => {
  database().prepare("INSERT OR REPLACE INTO events (kind, ref, day) VALUES (?, ?, ?)").run(kind, ref, day)
}

export const removeEvent = (kind: EventKind, ref: string): void => {
  database().prepare("DELETE FROM events WHERE kind = ? AND ref = ?").run(kind, ref)
}

export const importEvents = (events: IncomingEvent[]): void =>
  transaction((db) => {
    const statement = db.prepare("INSERT OR REPLACE INTO events (kind, ref, day) VALUES (?, ?, ?)")
    events.forEach((event) => statement.run(event.kind, event.ref, event.day))
  })
