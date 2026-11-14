import { z } from "zod"

import { internalEnv } from "@/lib/internal/env"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/internal/lead-transition"

const FITS = ["HIGH", "MEDIUM", "LOW", "UNKNOWN", "NONE"] as const
export type Fit = (typeof FITS)[number]

const leadSchema = z.object({
  id: z.string(),
  name: z.string(),
  leadStatus: z.enum(LEAD_STATUSES),
  fit: z.enum(FITS).nullable(),
  hook: z.string(),
  domainName: z.object({ primaryLinkUrl: z.string() }),
  linkedinLink: z.object({ primaryLinkUrl: z.string() }),
})

export type Lead = z.infer<typeof leadSchema>

const responseSchema = z.object({
  data: z.object({ companies: z.array(leadSchema) }),
  pageInfo: z.object({ hasNextPage: z.boolean() }),
})

const crmFetch = async (path: string, init: RequestInit & { method: "GET" | "PATCH" }): Promise<unknown> => {
  const env = internalEnv()
  const response = await fetch(new URL(path, env.TWENTY_API_URL), {
    ...init,
    cache: "no-store",
    headers: { Authorization: `Bearer ${env.TWENTY_API_KEY}`, "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error(`Twenty CRM ${init.method} ${path} failed: ${response.status} ${await response.text()}`)
  return response.json()
}

export const listLeads = async (): Promise<Lead[]> => {
  const params = new URLSearchParams({
    filter: `leadStatus[in]:[${LEAD_STATUSES.map((status) => `"${status}"`).join(",")}]`,
    limit: "200",
  })
  const parsed = responseSchema.parse(await crmFetch(`/rest/companies?${params}`, { method: "GET" }))
  if (parsed.pageInfo.hasNextPage) throw new Error("More than 200 open leads in Twenty CRM; add paging to listLeads")
  return parsed.data.companies
}

const statusSchema = z.object({ data: z.object({ company: z.object({ leadStatus: z.enum(LEAD_STATUSES) }) }) })

export const leadStatus = async (id: string): Promise<LeadStatus> =>
  statusSchema.parse(await crmFetch(`/rest/companies/${encodeURIComponent(id)}`, { method: "GET" })).data.company.leadStatus

export const setLeadStatus = async (id: string, status: LeadStatus): Promise<void> => {
  await crmFetch(`/rest/companies/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ leadStatus: status }),
  })
}
