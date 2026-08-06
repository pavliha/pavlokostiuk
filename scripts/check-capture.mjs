const endpoint = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT?.trim()

if (!endpoint) {
  console.error(
    [
      "",
      "NEXT_PUBLIC_SUBSCRIBE_ENDPOINT is not set.",
      "",
      "Every lead form on the site reads it at build time. Without it the forms",
      "render, accept an email, show an error and send nothing — silently, in",
      "production. Affected: PrototypeRequest (x2, the lead generator) and",
      "EmailCapture (the newsletter).",
      "",
      "Set it in .env for local builds, and pass it as a build ARG in Docker:",
      "  docker build --build-arg NEXT_PUBLIC_SUBSCRIBE_ENDPOINT=https://...",
      "",
    ].join("\n")
  )
  process.exit(1)
}

try {
  const url = new URL(endpoint)
  if (url.protocol !== "https:") throw new Error("must be https")
} catch {
  console.error(`\nNEXT_PUBLIC_SUBSCRIBE_ENDPOINT is not a valid https URL: ${endpoint}\n`)
  process.exit(1)
}

console.log("capture endpoint ok")
