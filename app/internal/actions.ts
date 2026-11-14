"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { NETWORKS } from "@/content/internal"
import { LEAD_STATUSES, type LeadStatus, setLeadStatus } from "@/lib/internal/crm"
import { today } from "@/lib/internal/days"
import { type EventKind, eventDays, recordEvent, removeEvent } from "@/lib/internal/events"
import { JOB_STATUSES, setJobStatus } from "@/lib/internal/jobs"
import { authReady, requireSignedIn } from "@/lib/internal/auth"

export const signOut = async (): Promise<void> => {
  await (await authReady()).api.signOut({ headers: await headers() })
  redirect("/internal/login")
}

export const deletePasskey = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  await (await authReady()).api.deletePasskey({ headers: await headers(), body: { id: z.string().parse(form.get("id")) } })
  revalidatePath("/internal/security")
}

const refresh = () => revalidatePath("/internal", "layout")

export const updateJob = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  setJobStatus(z.string().parse(form.get("id")), z.enum(JOB_STATUSES).parse(form.get("status")), today())
  refresh()
}

const LEAD_EVENTS: Record<Exclude<LeadStatus, "NEW">, EventKind> = {
  CONTACTED: "contacted",
  REPLIED: "replied",
  INTERESTED: "interested",
}

export const updateLead = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z.string().parse(form.get("id"))
  const from = z.enum(LEAD_STATUSES).parse(form.get("from"))
  const to = z.enum(LEAD_STATUSES).parse(form.get("to"))
  await setLeadStatus(id, to)
  if (LEAD_STATUSES.indexOf(to) > LEAD_STATUSES.indexOf(from) && to !== "NEW") recordEvent(LEAD_EVENTS[to], id, today())
  if (LEAD_STATUSES.indexOf(to) < LEAD_STATUSES.indexOf(from) && from !== "NEW") removeEvent(LEAD_EVENTS[from], id)
  refresh()
}

export const toggleNetwork = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z
    .string()
    .refine((value) => NETWORKS.some((network) => network.id === value))
    .parse(form.get("id"))
  if (eventDays("network").has(id)) removeEvent("network", id)
  else recordEvent("network", id, today())
  refresh()
}
