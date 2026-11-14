import { z } from "zod"

import { dayOf } from "@/lib/internal/days"
import { internalEnv } from "@/lib/internal/env"
import type { LeadTransition } from "@/lib/internal/lead-activity"
import { LEAD_STATUSES, type LeadStatus } from "@/lib/internal/lead-transition"

const FITS = ["HIGH", "MEDIUM", "LOW", "UNKNOWN", "NONE"] as const
export type Fit = (typeof FITS)[number]

const leadSchema = z.object({
  id: z.string(),
  name: z.string(),
  leadStatus: z.enum(LEAD_STATUSES),
  fit: z.enum(FITS).nullable(),
  hook: z.string(),
  createdAt: z.string(),
  domainName: z.object({ primaryLinkUrl: z.string() }),
  linkedinLink: z.object({ primaryLinkUrl: z.string() }),
})

export type Lead = z.infer<typeof leadSchema>

const personSchema = z.object({
  id: z.string(),
  companyId: z.string().nullable(),
  name: z.object({ firstName: z.string(), lastName: z.string() }),
  jobTitle: z.string(),
  emails: z.object({ primaryEmail: z.string() }),
  linkedinLink: z.object({ primaryLinkUrl: z.string() }),
})

export type Contact = { id: string; companyId: string | null; name: string; jobTitle: string; email: string; linkedin: string }

const activitySchema = z.object({
  happensAt: z.string(),
  targetCompanyId: z.string(),
  properties: z
    .object({ diff: z.object({ leadStatus: z.object({ before: z.string().nullable(), after: z.string().nullable() }) }).partial() })
    .partial()
    .nullable(),
})

const PAGE_SIZE = 200

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

const listAll = async <T,>(object: string, filter: string, item: z.ZodType<T>, after: string | null = null): Promise<T[]> => {
  const params = new URLSearchParams({ filter, limit: String(PAGE_SIZE), ...(after === null ? {} : { starting_after: after }) })
  const page = z
    .object({
      data: z.record(z.string(), z.array(item)),
      pageInfo: z.object({ hasNextPage: z.boolean(), endCursor: z.string().nullable() }),
    })
    .parse(await crmFetch(`/rest/${object}?${params}`, { method: "GET" }))
  const items = page.data[object] ?? []
  return page.pageInfo.hasNextPage && page.pageInfo.endCursor !== null
    ? [...items, ...(await listAll(object, filter, item, page.pageInfo.endCursor))]
    : items
}

const ID_FILTER_CHUNK = 50

const chunk = <T,>(items: readonly T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, (index + 1) * size))

const quoted = (values: readonly string[]) => `[${values.map((value) => JSON.stringify(value)).join(",")}]`

export const listLeads = (): Promise<Lead[]> => listAll("companies", `leadStatus[in]:${quoted(LEAD_STATUSES)}`, leadSchema)

export const leadTransitions = async (): Promise<LeadTransition[]> =>
  (await listAll("timelineActivities", "targetCompanyId[is]:NOT_NULL", activitySchema)).flatMap((activity) => {
    const change = activity.properties?.diff?.leadStatus
    return change
      ? [{ companyId: activity.targetCompanyId, at: activity.happensAt, day: dayOf(activity.happensAt), ...change }]
      : []
  })

export const contactsAt = async (companyIds: readonly string[]): Promise<Contact[]> => {
  const people = (
    await Promise.all(
      chunk(companyIds, ID_FILTER_CHUNK).map((ids) => listAll("people", `companyId[in]:${quoted(ids)}`, personSchema)),
    )
  ).flat()
  return people.map((person) => ({
    id: person.id,
    companyId: person.companyId,
    name: `${person.name.firstName} ${person.name.lastName}`.trim(),
    jobTitle: person.jobTitle,
    email: person.emails.primaryEmail,
    linkedin: person.linkedinLink.primaryLinkUrl,
  }))
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
