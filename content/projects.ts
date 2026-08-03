import type { Screenshot } from "@/components/ScreenshotCard"

export const AIRCAST_TAGS = ["React", "WebRTC", "MediaMTX", "MAVLink", "Raspberry Pi", "Tailscale", "Kubernetes"] as const

export const AIRCAST_SCREENS: readonly Screenshot[] = [
  {
    src: "/screenshots/aircast-overview.png",
    alt: "Aircast console overview showing live video links, telemetry, and cellular status",
    title: "Operations Overview",
    body: "Single-pane status for each drone unit — services up, cellular link quality, data usage, and a live video panel with one-click RTSP, WebRTC, and HLS stream URLs. Telemetry endpoint is exposed right alongside for ground-station connection.",
  },
  {
    src: "/screenshots/aircast-streaming.png",
    alt: "Aircast streaming page with RTSP, WebRTC, HLS endpoints and camera source config",
    title: "Live Video Streaming",
    body: "MediaMTX-backed streaming with simultaneous RTSP, WebRTC, and HLS outputs from a single camera source. Operators set the upstream camera URL and changes apply live, with a reachability check on the feed.",
  },
  {
    src: "/screenshots/aircast-telemetry.png",
    alt: "Aircast telemetry page exposing a MAVLink UDP endpoint for ground stations",
    title: "MAVLink Telemetry",
    body: "MAVP2P bridges the drone's MAVLink stream to a public UDP endpoint, so QGroundControl or Mission Planner can connect over the cellular link as if the aircraft were on the local network.",
  },
  {
    src: "/screenshots/aircast-network.png",
    alt: "Aircast network page showing cellular modem, interface priority, and Tailscale connection",
    title: "Network & Connectivity",
    body: "Live view of the cellular modem (signal, APN, data usage) with interface priority and failover between cellular, wired, and Wi-Fi uplinks. Tailscale provides secure remote access to every field unit without any port forwarding.",
  },
] as const

export const INTO_GE_TAGS = [
  "Next.js",
  "React",
  "Drizzle ORM",
  "PostgreSQL",
  "MCP",
  "Tailwind CSS",
  "Meilisearch",
  "Playwright",
  "AWS S3",
] as const

export const INTO_GE_SCREENS: readonly Screenshot[] = [
  {
    src: "/screenshots/into-ge-homepage.png",
    alt: "Into.ge homepage showing hero section and product categories",
    title: "Homepage with Dynamic Sections",
    body: "Hero section with CTAs, product category cards with images, trust indicators, and delivery/payment info. The homepage sections are fully configurable from the admin panel.",
  },
  {
    src: "/screenshots/into-ge-shop.png",
    alt: "Into.ge shop page with product filters and catalog",
    title: "Shop with Advanced Filtering",
    body: "Product catalog with category tree, price range sliders, brand/color/weight filters, and technical attribute filters (tensile strength, heat distortion, etc.). Powered by Meilisearch for instant full-text search across 77+ products.",
  },
  {
    src: "/screenshots/into-ge-product.png",
    alt: "Into.ge product detail page with variant selection",
    title: "Product Page with Variants",
    body: "Product detail pages with image gallery, color variant selection, discount badges, stock status, and add-to-cart. Includes breadcrumb navigation, social sharing, and delivery guarantees.",
  },
  {
    src: "/screenshots/into-ge-services.png",
    alt: "Into.ge 3D printing services page",
    title: "3D Printing Services",
    body: "Service booking flow for 3D printing, scanning, and modeling. Customers upload CAD files, receive quotes within 24 hours, and track order status. Includes a portfolio gallery of completed projects.",
  },
  {
    src: "/screenshots/into-ge-admin-dashboard.png",
    alt: "Into.ge admin dashboard with orders, products, and revenue",
    title: "Admin Dashboard",
    body: "Overview panel with total orders, product count, revenue stats, and recent order activity. Sidebar navigation gives access to orders, shop management, inventory, finance, POS, services, reports, customers, and settings.",
  },
  {
    src: "/screenshots/into-ge-admin-products.png",
    alt: "Into.ge admin product management with stock, category, and inventory links",
    title: "Product Management",
    body: "Admin product catalog with grid view, stock indicators, category/stock filters, search, and bulk import/export. Each product supports variants, images, translations, technical attributes, and discount rules.",
  },
] as const

export const INTO_GE_BUILT: readonly string[] = [
  "Full e-commerce storefront with cart, checkout, and Bank of Georgia payment integration",
  "Admin panel with product, order, inventory, discount, and customer management",
  "Inventory system with stock tracking, warehouse transfers, and movement history",
  "Point-of-sale (POS) system for in-store sales with customer phone lookup",
  "Three languages (English, Georgian, Russian) with translated product content",
  "97 end-to-end Playwright tests covering checkout, admin, and cart flows",
  "Telegram notifications for new orders and service requests",
  "Transactional emails via AWS SES for order confirmations and quotes",
] as const
