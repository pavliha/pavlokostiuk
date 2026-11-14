"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible"
import { z } from "zod"

import { NETWORKS } from "@/content/internal"
import { LEAD_STATUSES, type LeadStatus, setLeadStatus } from "@/lib/internal/crm"
import { today } from "@/lib/internal/days"
import { type EventKind, eventDays, recordEvent, removeEvent } from "@/lib/internal/events"
import { JOB_STATUSES, setJobStatus } from "@/lib/internal/jobs"
import { internalEnv } from "@/lib/internal/env"
import { matchesSecret, requireSignedIn, session } from "@/lib/internal/session"

export type LoginState = { error: string }

// ponytail: in-process limiter, fine for one container; move to a shared store if the site scales out
const loginLimiter = new RateLimiterMemory({ points: 5, duration: 15 * 60 })

const clientAddress = async (): Promise<string> => {
  const incoming = await headers()
  return incoming.get("cf-connecting-ip") ?? incoming.get("x-forwarded-for")?.split(",")[0].trim() ?? "direct"
}

export const signIn = async (_previous: LoginState, form: FormData): Promise<LoginState> => {
  const address = await clientAddress()
  const limited = await loginLimiter.consume(address).then(
    () => null,
    (rejection: RateLimiterRes) => rejection,
  )
  if (limited) return { error: `Too many attempts. Try again in ${Math.ceil(limited.msBeforeNext / 60_000)} minutes.` }

  const password = z.string().parse(form.get("password"))
  if (!matchesSecret(password, internalEnv().INTERNAL_PASSWORD)) return { error: "That password is wrong." }

  await loginLimiter.delete(address)
  const current = await session()
  current.signedIn = true
  await current.save()
  redirect("/internal")
}

export const signOut = async (): Promise<void> => {
  const current = await session()
  current.destroy()
  redirect("/internal/login")
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
