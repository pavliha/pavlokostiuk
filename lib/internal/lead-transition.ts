import type { EventKind } from "@/lib/internal/events"

export const LEAD_STATUSES = ["NEW", "CONTACTED", "REPLIED", "INTERESTED"] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

const STAGE_EVENT: Record<LeadStatus, EventKind | null> = {
  NEW: null,
  CONTACTED: "contacted",
  REPLIED: "replied",
  INTERESTED: "interested",
}

export type LeadPlan = { record: EventKind | null; remove: EventKind | null }

export class LeadConflictError extends Error {}

export const planLeadUpdate = (current: LeadStatus, from: LeadStatus, to: LeadStatus): LeadPlan => {
  if (current !== from) throw new LeadConflictError(`Lead is ${current} in the CRM, not ${from}; reload before changing it`)
  if (Math.abs(LEAD_STATUSES.indexOf(to) - LEAD_STATUSES.indexOf(from)) !== 1) {
    throw new Error(`A lead moves one stage at a time, not from ${from} to ${to}`)
  }
  return LEAD_STATUSES.indexOf(to) > LEAD_STATUSES.indexOf(from)
    ? { record: STAGE_EVENT[to], remove: null }
    : { record: null, remove: STAGE_EVENT[from] }
}
