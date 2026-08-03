"use client"

import { useState } from "react"

import { track } from "@/lib/track"
import { Button } from "@/components/ui/button"

const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT

type State = "idle" | "sending" | "done" | "error"

const EmailCapture = ({
  heading,
  body,
  label,
  placeholder,
  action,
  done,
  error,
  source,
}: {
  heading: string
  body: string
  label: string
  placeholder: string
  action: string
  done: string
  error: string
  source: string
}) => {
  const [state, setState] = useState<State>("idle")
  const [email, setEmail] = useState("")

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if ((form.elements.namedItem("company") as HTMLInputElement).value) return
    if (!ENDPOINT) {
      setState("error")
      return
    }
    setState("sending")
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setState("done")
      track("subscribed", { source })
    } catch {
      setState("error")
    }
  }

  if (state === "done")
    return (
      <section className="border-t border-rule pt-6">
        <h3 className="font-semibold mb-1.5 text-ink">{heading}</h3>
        <p className="text-sm text-muted-foreground">{done}</p>
      </section>
    )

  return (
    <section className="border-t border-rule pt-6">
      <h3 className="font-semibold mb-1.5 text-ink">{heading}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">{body}</p>
      <form onSubmit={submit} className="flex flex-wrap gap-2 items-start max-w-lg">
        <label htmlFor="subscribe-email" className="sr-only">
          {label}
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-56 h-11 px-3 rounded-xl bg-card border border-border text-sm text-ink placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <Button type="submit" size="lg" disabled={state === "sending"} className="h-11 rounded-xl px-5">
          {action}
        </Button>
      </form>
      {state === "error" ? (
        <p role="alert" className="text-sm text-destructive mt-2">
          {error}
        </p>
      ) : null}
    </section>
  )
}

export default EmailCapture
