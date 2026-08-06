"use client"

import { useState } from "react"

import { track } from "@/lib/track"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT

type State = "idle" | "sending" | "done" | "error"

const PrototypeRequest = ({
  emailLabel,
  sellLabel,
  sellPlaceholder,
  linkLabel,
  linkPlaceholder,
  optional,
  action,
  done,
  error,
  mailtoHref,
  mailtoLabel,
}: {
  emailLabel: string
  sellLabel: string
  sellPlaceholder: string
  linkLabel: string
  linkPlaceholder: string
  optional: string
  action: string
  done: string
  error: string
  mailtoHref: string
  mailtoLabel: string
}) => {
  const [state, setState] = useState<State>("idle")
  const [email, setEmail] = useState("")
  const [sell, setSell] = useState("")
  const [link, setLink] = useState("")

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
        body: JSON.stringify({ email, sell, link, source: "prototype" }),
      })
      if (!response.ok) throw new Error(String(response.status))
      setState("done")
      track("prototype_requested", { source: "prototype" })
    } catch {
      setState("error")
    }
  }

  if (state === "done")
    return (
      <p className="border-l border-accent-blue pl-4 py-2 text-base text-ink-2 leading-[1.55] max-w-lg">
        {done}
      </p>
    )

  return (
    <>
      <form onSubmit={submit} className="grid gap-4 max-w-lg">
        <div>
          <Label htmlFor="proto-sell" className="mb-2">
            {sellLabel}
          </Label>
          <Input
            id="proto-sell"
            name="sell"
            type="text"
            required
            value={sell}
            onChange={(event) => setSell(event.target.value)}
            placeholder={sellPlaceholder}
          />
        </div>
        <div>
          <Label htmlFor="proto-email" className="mb-2">
            {emailLabel}
          </Label>
          <Input
            id="proto-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="proto-link" className="mb-2">
            {linkLabel} <span className="text-xs font-normal text-muted-foreground">{optional}</span>
          </Label>
          <Input
            id="proto-link"
            name="link"
            type="text"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder={linkPlaceholder}
          />
        </div>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <Button type="submit" disabled={state === "sending"} className="justify-self-start">
          {action}
        </Button>
      </form>
      {state === "error" ? (
        <p role="alert" className="text-sm text-destructive mt-3 max-w-lg leading-relaxed">
          {error}{" "}
          <a href={mailtoHref} className="underline underline-offset-4">
            {mailtoLabel}
          </a>
        </p>
      ) : null}
    </>
  )
}

export default PrototypeRequest
