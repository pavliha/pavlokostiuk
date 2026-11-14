import { authReady } from "@/lib/internal/auth"

const handle = async (request: Request): Promise<Response> => (await authReady()).handler(request)

export const GET = handle
export const POST = handle
