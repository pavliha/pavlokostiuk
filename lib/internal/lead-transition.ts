export const LEAD_STATUSES = ["NEW", "CONTACTED", "REPLIED", "INTERESTED", "NOT_INTERESTED", "CUSTOMER"] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const LEAD_FLOW = ["NEW", "CONTACTED", "REPLIED", "INTERESTED"] as const satisfies readonly LeadStatus[]

export class LeadConflictError extends Error {}

const flowIndex = (status: LeadStatus): number => LEAD_FLOW.findIndex((stage) => stage === status)

export const checkLeadUpdate = (current: LeadStatus, from: LeadStatus, to: LeadStatus): void => {
  if (current !== from) throw new LeadConflictError(`Lead is ${current} in the CRM, not ${from}; reload before changing it`)
  if (flowIndex(from) < 0 || flowIndex(to) < 0 || Math.abs(flowIndex(to) - flowIndex(from)) !== 1) {
    throw new Error(`A lead moves one stage at a time along ${LEAD_FLOW.join(" → ")}, not from ${from} to ${to}`)
  }
}
