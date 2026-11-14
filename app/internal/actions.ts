"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { NETWORKS } from "@/content/internal"
import { authReady, requireSignedIn } from "@/lib/internal/auth"
import { leadStatus, setLeadStatus } from "@/lib/internal/crm"
import { today } from "@/lib/internal/days"
import { eventDays, recordEvent, removeEvent } from "@/lib/internal/events"
import { JOB_STATUSES } from "@/lib/internal/job-transition"
import { setJobStatus } from "@/lib/internal/jobs"
import { checkLeadUpdate, LEAD_STATUSES } from "@/lib/internal/lead-transition"
import { traced } from "@/lib/internal/log"

export const signOut = async (): Promise<void> => {
  await traced("internal.sign_out", {}, async () => (await authReady()).api.signOut({ headers: await headers() }))
  redirect("/internal/login")
}

export const deletePasskey = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z.string().parse(form.get("id"))
  await traced("internal.passkey.delete", { passkeyId: id }, async () =>
    (await authReady()).api.deletePasskey({ headers: await headers(), body: { id } }),
  )
  revalidatePath("/internal/security")
}

const refresh = () => revalidatePath("/internal", "layout")

export const updateJob = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z.string().parse(form.get("id"))
  const status = z.enum(JOB_STATUSES).parse(form.get("status"))
  await traced("internal.job.update", { jobId: id, status }, async () => setJobStatus(id, status, today()))
  refresh()
}

export const updateLead = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z.string().parse(form.get("id"))
  const from = z.enum(LEAD_STATUSES).parse(form.get("from"))
  const to = z.enum(LEAD_STATUSES).parse(form.get("to"))
  await traced("internal.lead.update", { leadId: id, from, to }, async () => {
    checkLeadUpdate(await leadStatus(id), from, to)
    await setLeadStatus(id, to)
  })
  refresh()
}

export const toggleNetwork = async (form: FormData): Promise<void> => {
  await requireSignedIn()
  const id = z
    .string()
    .refine((value) => NETWORKS.some((network) => network.id === value))
    .parse(form.get("id"))
  const joined = eventDays("network").has(id)
  await traced("internal.network.toggle", { networkId: id, joined: !joined }, async () =>
    joined ? removeEvent("network", id) : recordEvent("network", id, today()),
  )
  refresh()
}
