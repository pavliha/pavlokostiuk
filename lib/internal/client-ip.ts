import ipaddr from "ipaddr.js"

import { CLOUDFLARE_RANGES } from "@/lib/internal/cloudflare-ranges"

export const CLIENT_IP_HEADER = "x-internal-client-ip"

const ranges = CLOUDFLARE_RANGES.map((range) => ipaddr.parseCIDR(range))

const isCloudflare = (address: string): boolean => {
  const parsed = ipaddr.process(address)
  return ranges.some(([network, bits]) => parsed.kind() === network.kind() && parsed.match(network, bits))
}

export const clientIp = (forwardedFor: string | null, cloudflareIp: string | null): string => {
  const nearestHop = forwardedFor?.split(",").at(-1)?.trim()
  if (!nearestHop || !ipaddr.isValid(nearestHop)) return "direct"
  return isCloudflare(nearestHop) && cloudflareIp && ipaddr.isValid(cloudflareIp) ? cloudflareIp : nearestHop
}
