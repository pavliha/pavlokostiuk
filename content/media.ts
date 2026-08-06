export type MediaAsset = { key: string; src: string; width: number; height: number }

const shot = (key: string, file: string, width: number, height: number): MediaAsset => ({
  key,
  src: `/screenshots/${file}`,
  width,
  height,
})

export const AIRCAST_SHOTS: readonly MediaAsset[] = [
  shot("overview", "aircast-overview.png", 1760, 1100),
  shot("streaming", "aircast-streaming.png", 1760, 1100),
  shot("telemetry", "aircast-telemetry.png", 1760, 1100),
  shot("network", "aircast-network.png", 1760, 1684),
]

export const INTO_GE_SHOTS: readonly MediaAsset[] = [
  shot("homepage", "into-ge-homepage.png", 2880, 1800),
  shot("shop", "into-ge-shop.png", 2880, 1800),
  shot("product", "into-ge-product.png", 2880, 1800),
  shot("services", "into-ge-services.png", 2880, 1800),
  shot("dashboard", "into-ge-admin-dashboard.png", 2880, 1800),
  shot("products", "into-ge-admin-products.png", 2880, 1800),
]

export const PLATFORM_SHOTS: readonly MediaAsset[] = [
  ...INTO_GE_SHOTS,
  shot("pos", "into-ge-admin-pos.png", 2880, 1800),
  shot("movements", "into-ge-admin-inventory.png", 2880, 1800),
  shot("mcp", "into-ge-admin-mcp.png", 2880, 1800),
]

export const PLATFORM_HERO_SHOT: MediaAsset = shot("heroStorefront", "hero-storefront.webp", 1800, 975)

export const PRIMARY_SHOT_KEYS: readonly string[] = ["homepage", "dashboard", "pos"]

export const PORTRAIT: MediaAsset ={ key: "portrait", src: "/pavlo.webp", width: 576, height: 768 }
