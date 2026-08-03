import posthog from "posthog-js"

export const track = (event: string, properties: Record<string, string>) => {
  if (posthog.__loaded) posthog.capture(event, properties)
}
