import { NextResponse, type NextRequest } from "next/server"

import { CLIENT_IP_HEADER, clientIp } from "@/lib/internal/client-ip"

export const proxy = (request: NextRequest): NextResponse => {
  const headers = new Headers(request.headers)
  headers.set(CLIENT_IP_HEADER, clientIp(request.headers.get("x-forwarded-for"), request.headers.get("cf-connecting-ip")))
  return NextResponse.next({ request: { headers } })
}

export const config = { matcher: "/internal/:path*" }
