import { TZDate } from "@date-fns/tz"
import { differenceInCalendarDays, eachDayOfInterval, endOfISOWeek, format, parseISO, startOfISOWeek } from "date-fns"

import { INTERNAL_TIMEZONE } from "@/content/internal"

const DAY = "yyyy-MM-dd"

export const today = (): string => format(new TZDate(new Date(), INTERNAL_TIMEZONE), DAY)

export const weekOf = (day: string): [string, ...string[]] => {
  const [monday, ...rest] = eachDayOfInterval({ start: startOfISOWeek(parseISO(day)), end: endOfISOWeek(parseISO(day)) })
  return [format(monday, DAY), ...rest.map((date) => format(date, DAY))]
}

export const daysBetween = (from: string, to: string): number => differenceInCalendarDays(parseISO(to), parseISO(from))

export const formatDay = (day: string, pattern: string): string => format(parseISO(day), pattern)
