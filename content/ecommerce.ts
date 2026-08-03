import type { BulletGroup } from "@/components/BulletCard"
import type { Screenshot } from "@/components/ScreenshotCard"

export const STATS: readonly { value: string; label: string }[] = [
  { value: "106", label: "AI tools your assistant can call on the store" },
  { value: "3", label: "Languages, machine-translated and human-editable" },
  { value: "1", label: "Stock number shared by web, POS and warehouse" },
  { value: "0", label: "Per-sale commission — you pay once, not per order" },
] as const

export const ASK_EXAMPLES: readonly string[] = [
  "Which products sold worst last month and still have stock sitting in the warehouse?",
  "Add these 12 items from the supplier invoice, translate the descriptions, and leave them unpublished.",
  "Put 15% off everything in the Filaments category until Sunday.",
  "What did we actually earn in March after cost of goods and delivery?",
  "Find every product with a missing photo, no category, or a price below cost.",
  "Order #6162 is coming back — refund it and put the stock back in the store.",
] as const

export const AI_POINTS: readonly { title: string; body: string }[] = [
  {
    title: "Two servers, two audiences",
    body: "A private admin server with the full 106-tool surface for you and your staff, and a public catalog server that lets customers' own AI assistants search your products and answer questions about them — putting your shop inside the tools people already ask.",
  },
  {
    title: "Connect in two minutes",
    body: "A settings page hands you the connection URL with copy-paste setup for each AI client, shows which assistants are currently connected, and lets you cut any of them off with one click.",
  },
  {
    title: "Translation without a translator",
    body: "Write a product once. Machine translation fills in the other languages instantly, and every string stays editable by hand in the admin — so the AI does the boring 90% and you fix the wording that matters.",
  },
  {
    title: "Data entry that reads documents",
    body: "Paste a supplier spec sheet and it becomes structured, filterable product attributes. Stock items get matched to catalog products automatically, with suggestions where the match is uncertain instead of silent guesses.",
  },
  {
    title: "Nothing happens off the record",
    body: "Every AI action goes through the same permissions, validation and audit log as a human click. You can see exactly what was changed, by which assistant, and when.",
  },
  {
    title: "And I build it the same way",
    body: "AI-accelerated development is why a system this size is affordable for a small business at all. You get the output of a team, at the pace and price of one developer who knows how to drive the tools.",
  },
] as const

export const FEATURE_GROUPS: readonly BulletGroup[] = [
  {
    title: "Storefront",
    bullets: [
      "Homepage built from sections you drag into order yourself",
      "Category pages with a nested category tree",
      "Product pages with galleries, variants, badges and live stock",
      'Per-location availability ("in stock at the shop, not the warehouse")',
      "Wishlist, recently viewed, social sharing",
      "Light and dark themes, mobile-first throughout",
      "Static pages: FAQ, terms, privacy, contact",
    ],
  },
  {
    title: "Search & filtering",
    bullets: [
      "Instant full-text search that tolerates typos, in every language",
      "Filters you define: checkboxes, colour swatches, numeric ranges, yes/no",
      "Filter by any technical attribute your products have",
      "Live result counts per filter option, price range slider",
      "Sorting by best sellers, newest, price",
      "In-stock-only toggle",
    ],
  },
  {
    title: "Cart & checkout",
    bullets: [
      "Server-side cart that survives closing the browser, no login required",
      "Guest checkout, or checkout as an account holder",
      "Coupon codes and automatic discounts, stacked correctly",
      "Delivery options: self-pickup, your own delivery, customer-arranged courier",
      "Delivery fees by rule, phone validation, address capture",
      "Stock re-checked at the moment of purchase, so you never oversell",
      "Confirmation page and email receipt",
    ],
  },
  {
    title: "Payments",
    bullets: [
      "Bank card payments through a real bank integration (Bank of Georgia today, others on request)",
      "Cash, bank transfer, and marketplace-settled orders",
      "Payment status tracked separately from fulfilment status",
      "Refunds, including partial ones, with stock returned",
      "Test mode for trying the whole flow without moving money",
    ],
  },
  {
    title: "Orders",
    bullets: [
      "One queue for web, walk-in and marketplace orders",
      "Eight-stage lifecycle from pending to completed, plus cancel and archive",
      "Sales channels tracked separately (your site, Glovo, Wolt)",
      "Create orders by hand for phone and messenger customers",
      "Printable invoices and picking slips",
      "Search and filter by customer, status, date, channel, amount",
    ],
  },
  {
    title: "Products & catalog",
    bullets: [
      "Variants with their own price, stock, photos and barcode",
      "Colour swatches, dropdowns and pills, your choice per attribute",
      "Rich-text descriptions with images and tables",
      "Image upload with cropping, stored on S3 and served resized",
      "Technical specifications grouped into readable blocks",
      "Duplicate a product to create the next one in seconds",
      "CSV import and export, plus a WooCommerce importer for migrations",
      "A catalog health report that finds missing photos, prices and categories",
    ],
  },
  {
    title: "Pricing & promotions",
    bullets: [
      "Percentage or fixed-amount discounts",
      "Target everything, a category, or hand-picked products",
      "Scheduled start and end dates",
      "Coupon codes with usage limits and per-customer tracking",
      "Sale badges and struck-through pricing on the storefront automatically",
      "Prices stored in exact minor units — no rounding drift, ever",
    ],
  },
  {
    title: "Inventory",
    bullets: [
      "Multiple locations: warehouses, shops, zones, shelves, bins",
      "Every change is a movement: receive, remove, transfer, adjust, reserve",
      'Full stock history — you can always answer "where did it go?"',
      "Weighted average cost per item, maintained automatically",
      "Low-stock alerts",
      "Stock items linked to catalog products, so one number drives everything",
      "Bulk import of stock counts",
    ],
  },
  {
    title: "Point of sale",
    bullets: [
      "Sell over the counter from any tablet or laptop, no extra hardware",
      "Barcode scanning with the device camera",
      "Fast product search built for a queue at the till",
      "Cash and card, refunds, and a shift summary",
      "Sales history with receipt reprints",
      "Counter sales draw down the same stock as the website, instantly",
    ],
  },
  {
    title: "Money & reporting",
    bullets: [
      "Income and expense transactions in one ledger",
      "Profit and loss with real cost of goods, not guesswork",
      "Sales dynamics over time, by product and category",
      "Per-item sales history: what it cost, what it sold for, how often",
      "Dashboard with revenue, orders, average order value and stock alerts",
    ],
  },
  {
    title: "Customers",
    bullets: [
      "Customer accounts with order history and saved addresses",
      "Email and Google sign-in, password reset",
      "Admin-side customer records with lifetime spend",
      "Search by name, phone or email",
      "Transactional emails from your own domain",
    ],
  },
  {
    title: "Services & quotes",
    bullets: [
      "For businesses that sell work, not only goods",
      "Customers submit a request with files and a description",
      "Request queue with statuses, quoting, and conversion to an order",
      "Portfolio gallery of finished jobs, managed from the admin",
    ],
  },
  {
    title: "Languages & content",
    bullets: [
      "Three languages live today: English, Georgian, Russian — more on request",
      "Every interface string editable from the admin, no developer needed",
      "Product names, descriptions and categories translated per language",
      "Machine translation to fill the gaps, human editing to fix them",
      "Proper per-language URLs so each version can rank on its own",
    ],
  },
  {
    title: "Staff & permissions",
    bullets: [
      "Separate roles for owners, managers and cashiers",
      "A cashier sees the till, not your profit margins",
      "Invite staff by email",
      "Audit log of who changed what, and when",
    ],
  },
  {
    title: "Notifications",
    bullets: [
      "New orders straight to a Telegram chat or group",
      "Low-stock warnings before you run out",
      "Order confirmations and status emails to customers",
      "Test any channel before you rely on it",
    ],
  },
  {
    title: "Being found",
    bullets: [
      "Server-rendered pages, fast on a phone on mobile data",
      "Structured data so products show rich results in Google",
      "Automatic sitemap and robots rules",
      "Search engines pinged the moment a product changes",
      "CDN caching in front of everything",
      "Visitor analytics you can actually read",
    ],
  },
  {
    title: "Configuration, not code",
    bullets: [
      "Business details, currency, contacts and opening hours",
      "Commerce rules: delivery fees, order settings, tax handling",
      "Storefront settings: what appears where on the homepage",
      "Feature switches to turn whole modules on and off",
      "Changes take effect immediately, no deployment",
    ],
  },
  {
    title: "Not losing your data",
    bullets: [
      "One-click backups you can download and keep yourself",
      "Full export of catalog, orders and stock in an open format",
      "Import from WooCommerce if you're migrating off it",
      "It's your database on your own hosting, not a tenant on someone else's",
      "Structured logging and health checks, so problems surface before customers report them",
    ],
  },
] as const

export const SCREENS: readonly Screenshot[] = [
  {
    src: "/screenshots/into-ge-homepage.png",
    alt: "Into.ge storefront homepage with hero section and category cards",
    title: "The storefront",
    body: "Every block on this page — hero, categories, featured products, service promos — is arranged from the admin panel by dragging, not by calling a developer.",
  },
  {
    src: "/screenshots/into-ge-shop.png",
    alt: "Into.ge shop page with category tree, price slider and brand filters",
    title: "Browsing and filtering",
    body: "Instant search with typo tolerance, a nested category tree, price slider, and filters generated from whatever attributes your products carry — brand and colour here, size and material somewhere else.",
  },
  {
    src: "/screenshots/into-ge-product.png",
    alt: "Into.ge product page with colour variants and per-location stock",
    title: "A product page that tells the truth",
    body: "Colour variants each with their own photos and stock, sold-out options greyed rather than hidden, the discount spelled out, and availability shown per location — one left in the shop, none in the workshop.",
  },
  {
    src: "/screenshots/into-ge-services.png",
    alt: "Into.ge services page describing 3D printing and scanning",
    title: "Selling work, not just products",
    body: "A request flow for custom jobs: the customer uploads files and describes what they need, you quote from the admin, and the accepted quote becomes an order like any other.",
  },
  {
    src: "/screenshots/into-ge-admin-dashboard.png",
    alt: "Into.ge admin dashboard with revenue, orders and stock movements",
    title: "The morning check",
    body: "Revenue, orders, average order value, recent stock movements and low-stock alerts on one screen. Everything else — orders, catalog, inventory, finance, POS, reports, staff — is one click down the sidebar.",
  },
  {
    src: "/screenshots/into-ge-admin-products.png",
    alt: "Into.ge admin product list with stock, category, status and inventory links",
    title: "Running the catalog",
    body: "Price, live stock, category, published state and the linked stock item in one table — with search, saved filters, bulk import and export. The same operations your AI assistant performs when you ask it to.",
  },
  {
    src: "/screenshots/into-ge-admin-pos.png",
    alt: "Into.ge point of sale with barcode scanning, product search and live stock per location",
    title: "The till",
    body: "Sell over the counter from a laptop or tablet — scan with the device camera or search by name and SKU, pick which location you're selling from, take cash or card. The counter draws down the same stock the website sells from, so the two can't drift apart.",
  },
  {
    src: "/screenshots/into-ge-admin-inventory.png",
    alt: "Into.ge stock movement history showing receives, reserves and removals per location",
    title: "Where did it go?",
    body: "Every change to stock is a recorded movement — received, reserved when an order is placed, removed when it ships, transferred between locations, adjusted after a count. This store has 6,801 of them and you can filter to any one. Nothing changes quantity without leaving a row here.",
  },
  {
    src: "/screenshots/into-ge-admin-mcp.png",
    alt: "Into.ge admin settings page for connecting Claude, ChatGPT and Gemini to the store over MCP",
    title: "Connecting the AI, for real",
    body: "This is the actual settings page, not a mock-up. Copy the address, paste it into Claude, ChatGPT or Gemini, sign in with your own admin account, approve. Your staff each connect with their own login, so a cashier's assistant gets a cashier's permissions.",
  },
] as const

export const AUDIT_FINDINGS: readonly string[] = [
  "17 published products tracking stock with no inventory item linked",
  '158 links whose product and stock-item names don’t match, e.g. "ABS-Like OdorLite" → "eResine ABS Odor Grey"',
  "0 missing translations, missing images, empty categories, bad prices, duplicate barcodes or duplicate SKUs",
  "0 orphaned translation rows, shared stock items or links to retired items",
] as const

export const PRICE_GROUPS: readonly BulletGroup[] = [
  {
    title: "What moves the number",
    bullets: [
      "How many products, and how messy the data is today",
      "How many languages you sell in",
      "Whether you need inventory and a point of sale, or just a shop",
      "Which bank and which couriers have to be integrated",
      "Whether you're migrating an existing shop or starting clean",
      "How much ongoing support and change work you want after launch",
    ],
  },
  {
    title: "What's yours, and what isn't",
    bullets: [
      "It runs on your servers, your hosting account, your database — not rented space on mine",
      "Your catalog, orders, stock and customer list, exportable in full any time you ask",
      "Backups you download and keep yourself, not just a promise of one",
      "Your domain, your bank account, your customer relationship",
      "No per-sale commission, no per-seat licence, no monthly platform rent",
      "The platform code stays mine, licensed to you to run. You're buying a working system and my support of it, not the source.",
    ],
  },
] as const

export const PROCESS_STEPS: readonly { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "We talk about your shop",
    body: 'Thirty minutes, free. What you sell, how you sell it, where the day currently goes. I tell you honestly which parts of this you need and which you don’t — including if the answer is "use Shopify, you’ll be fine".',
  },
  {
    step: "02",
    title: "You see your own data in it",
    body: "Your catalog gets imported — from a spreadsheet, from WooCommerce, or from photos of the shelves — and you get a working store on a private URL with your products, prices and languages in it.",
  },
  {
    step: "03",
    title: "We shape it to your trade",
    body: "Branding, the fields your products actually need, your delivery rules, your bank, your languages, the modules you use and the ones we leave switched off. This is the part a template can't do.",
  },
  {
    step: "04",
    title: "Launch, then keep going",
    body: "Live on your domain and your hosting, staff trained, AI assistant connected. Then ongoing support at whatever level you want — I keep your installation patched and changing as the business does.",
  },
] as const

export const SHOPIFY_REASONS: readonly string[] = [
  "Your products don't fit the boxes: variants, technical specs, per-location stock, made-to-order work",
  "You're paying for five apps to patch the gaps, and they still don't talk to each other",
  "Your shop floor and your website need to share one stock number and currently don't",
  "You sell in more than one language and the translation add-on is making a mess of it",
  "Per-sale commission has started costing more than software would",
  "You want an AI assistant with real access to your business, not a support-chat widget",
  "You want your customer list and your data on your own infrastructure, not a platform's",
] as const

export const CALL_EXPECTATIONS: readonly { label: string; body: string }[] = [
  { label: "Bring", body: "Your product list in any form, and the admin task you hate most." },
  { label: "We cover", body: "What you sell, what breaks today, what it would cost and how long it takes." },
  { label: "You leave with", body: "A price, a timeline, and a straight answer on whether it's worth it." },
] as const
