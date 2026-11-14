import { z } from "zod"

import { importEvents, incomingEventSchema } from "@/lib/internal/events"
import { isIngestRequest, parseJson, unauthorized } from "@/lib/internal/ingest-auth"
import { traced } from "@/lib/internal/log"

const payloadSchema = z.object({ events: z.array(incomingEventSchema).min(1).max(1000) })

export const POST = async (request: Request): Promise<Response> => {
  if (!isIngestRequest(request)) return unauthorized()
  const payload = await parseJson(request, payloadSchema)
  if (payload instanceof Response) return payload
  await traced("internal.ingest.events", { events: payload.events.length }, async () => importEvents(payload.events))
  return Response.json({ events: payload.events.length })
}
