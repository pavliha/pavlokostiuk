import type { PainKey } from "@/content/structure"

export type MediaAsset<Key extends string = string> = {
  key: Key
  src: string
  width: number
  height: number
}

const shot = <Key extends string>(
  key: Key,
  file: string,
  width: number,
  height: number,
): MediaAsset<Key> => ({
  key,
  src: `/screenshots/${file}`,
  width,
  height,
})

const HOMEPAGE = shot("homepage", "into-ge-homepage.png", 2880, 1800)
const SHOP = shot("shop", "into-ge-shop.png", 2880, 1800)
const PRODUCT = shot("product", "into-ge-product.png", 2880, 1800)
const SERVICES = shot("services", "into-ge-services.png", 2880, 1800)
const DASHBOARD = shot("dashboard", "into-ge-admin-dashboard.png", 2880, 1800)
const PRODUCTS = shot("products", "into-ge-admin-products.png", 2880, 1800)
const POS = shot("pos", "into-ge-admin-pos.png", 2880, 1800)
const MOVEMENTS = shot("movements", "into-ge-admin-inventory.png", 2880, 1800)
const MCP = shot("mcp", "into-ge-admin-mcp.png", 2880, 1800)

export const AIRCAST_SHOTS = [
  shot("flight", "console-flight.png", 1760, 1100),
  shot("cameras", "console-cameras.png", 1760, 1100),
  shot("connection", "console-connection.png", 1760, 1100),
  shot("flightlog", "console-flightlog.png", 1760, 1100),
] as const

export const DRONE_SHOTS = {
  gcs: shot("gcs", "drones-gcs.webp", 1200, 552),
  telemetry: shot("telemetry", "drones-telemetry.webp", 1600, 900),
  missions: shot("missions", "drones-missions.webp", 2000, 1126),
  hardware: shot("hardware", "drones-hardware.webp", 1200, 552),
  device: shot("device", "drones-device.webp", 1600, 1140),
} as const

export const INTO_GE_SHOTS = [
  HOMEPAGE,
  SHOP,
  PRODUCT,
  SERVICES,
  DASHBOARD,
  PRODUCTS,
] as const

export const STOREFRONT_SHOTS = [HOMEPAGE, SHOP, PRODUCT, SERVICES] as const

export const ADMIN_SHOTS = [DASHBOARD, POS, PRODUCTS, MOVEMENTS] as const

export const MCP_SHOTS = [MCP] as const

export const PAIN_SHOTS = {
  stock: shot("stockLocations", "into-ge-stock-locations.png", 2880, 1800),
  money: shot("profitLoss", "into-ge-admin-profit-loss.png", 2880, 1800),
  catalog: shot("productSpecs", "into-ge-product-specs.png", 2880, 1800),
  orders: shot("adminOrders", "into-ge-admin-orders.png", 2880, 1800),
  staff: shot("adminTeam", "into-ge-admin-team.png", 2880, 1800),
} satisfies Record<string, MediaAsset>

export type ShotPainKey = keyof typeof PAIN_SHOTS

export const hasShot = (key: PainKey): key is ShotPainKey => key in PAIN_SHOTS

export const PLATFORM_HERO_SHOT = shot("heroStorefront", "hero-storefront.webp", 1800, 975)

export const PORTRAIT: MediaAsset = {
  key: "portrait",
  src: "/pavlo.webp",
  width: 576,
  height: 768,
}
