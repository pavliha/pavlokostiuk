import { TZDate } from "@date-fns/tz"
import { differenceInCalendarDays, eachDayOfInterval, endOfISOWeek, format, parseISO, startOfISOWeek, subDays } from "date-fns"

import { INTERNAL_TIMEZONE } from "@/content/internal"

const DAY = "yyyy-MM-dd"

export const dayOf = (instant: string | Date): string => format(new TZDate(new Date(instant), INTERNAL_TIMEZONE), DAY)

export const today = (): string => dayOf(new Date())

export const weekOf = (day: string): [string, ...string[]] => {
  const [monday, ...rest] = eachDayOfInterval({ start: startOfISOWeek(parseISO(day)), end: endOfISOWeek(parseISO(day)) })
  return [format(monday, DAY), ...rest.map((date) => format(date, DAY))]
}

export const daysBetween = (from: string, to: string): number => differenceInCalendarDays(parseISO(to), parseISO(from))

export const formatDay = (day: string, pattern: string): string => format(parseISO(day), pattern)

export const daysBefore = (day: string, days: number): string => format(subDays(parseISO(day), days), DAY)
