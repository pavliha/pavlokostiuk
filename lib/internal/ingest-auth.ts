import { z } from "zod"

import { internalEnv } from "@/lib/internal/env"
import { matchesSecret } from "@/lib/internal/secret"

export const unauthorized = (): Response => Response.json({ error: "unauthorized" }, { status: 401 })

export const isIngestRequest = (request: Request): boolean => {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "")
  return token !== undefined && matchesSecret(token, internalEnv().INTERNAL_INGEST_TOKEN)
}

const NOT_JSON = Symbol("not json")

export const parseJson = async <T>(request: Request, schema: z.ZodType<T>): Promise<T | Response> => {
  const body: unknown = await request.json().catch(() => NOT_JSON)
  if (body === NOT_JSON) return Response.json({ error: "Body is not JSON" }, { status: 400 })
  const parsed = schema.safeParse(body)
  return parsed.success ? parsed.data : Response.json({ error: z.prettifyError(parsed.error) }, { status: 400 })
}
