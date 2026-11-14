import type { LeadStatus } from "@/lib/internal/lead-transition"

export type LeadTransition = { companyId: string; at: string; day: string; before: string | null; after: string | null }

export type LeadSnapshot = { id: string; leadStatus: LeadStatus; createdDay: string }

const REPLIES: readonly LeadStatus[] = ["REPLIED", "INTERESTED", "NOT_INTERESTED", "CUSTOMER"]

const entryDays = (
  leads: LeadSnapshot[],
  transitions: LeadTransition[],
  rule: { holding: readonly string[]; from: readonly string[]; into: readonly string[] },
): Map<string, string> =>
  new Map(
    leads
      .filter((lead) => rule.holding.includes(lead.leadStatus))
      .flatMap((lead): [string, string][] => {
        const own = transitions.filter((transition) => transition.companyId === lead.id)
        const entry = own
          .filter((transition) => rule.from.includes(transition.before ?? "") && rule.into.includes(transition.after ?? ""))
          .toSorted((a, b) => a.at.localeCompare(b.at))
          .at(-1)
        if (entry) return [[lead.id, entry.day]]
        return own.some((transition) => rule.from.includes(transition.before ?? "")) ? [] : [[lead.id, lead.createdDay]]
      }),
  )

export const contactDays = (leads: LeadSnapshot[], transitions: LeadTransition[]): Map<string, string> =>
  entryDays(leads, transitions, { holding: ["CONTACTED", ...REPLIES], from: ["NEW"], into: ["CONTACTED"] })

export const replyDays = (leads: LeadSnapshot[], transitions: LeadTransition[]): Map<string, string> =>
  entryDays(leads, transitions, { holding: REPLIES, from: ["NEW", "CONTACTED"], into: REPLIES })

export const countOn = (days: Map<string, string>, day: string): number => [...days.values()].filter((value) => value === day).length
