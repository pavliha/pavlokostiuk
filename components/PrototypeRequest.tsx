"use client"

import { useEffect, useRef, useState } from "react"

import { track } from "@/lib/track"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WHATSAPP } from "@/content/site"

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type State = "idle" | "done" | "blocked"

type FieldError = [string, string]

export type PrototypeCopy = {
  sellLabel: string
  sellPlaceholder: string
  emailLabel: string
  emailHint: string
  linkLabel: string
  linkPlaceholder: string
  privacy: string
  action: string
  done: string
  error: string
  errorSummary: string
  errors: {
    sell: string
    email: string
    catalog: string
  }
}

const PrototypeRequest = ({
  id,
  copy,
  contactEmail,
  mailSubject,
}: {
  id: string
  copy: PrototypeCopy
  contactEmail: string
  mailSubject: string
}) => {
  const [state, setState] = useState<State>("idle")
  const [sell, setSell] = useState("")
  const [email, setEmail] = useState("")
  const [link, setLink] = useState("")
  const [errors, setErrors] = useState<FieldError[]>([])
  const summary = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!errors.length) return
    summary.current?.focus()
    const base = document.title.replace(/^(Error: )+/, "")
    document.title = `Error: ${base}`
    return () => {
      document.title = base
    }
  }, [errors])

  const validate = (): FieldError[] =>
    (
      [
        sell.trim() ? null : ["sell", copy.errors.sell],
        EMAIL_PATTERN.test(email.trim()) ? null : ["email", copy.errors.email],
        link.trim() ? null : ["link", copy.errors.catalog],
      ] as (FieldError | null)[]
    ).filter((entry): entry is FieldError => entry !== null)

  const messageFor = (field: string) => errors.find(([name]) => name === field)?.[1]

  const describedBy = (field: string, ...extra: string[]) =>
    [...extra, messageFor(field) ? `${id}-${field}-error` : null]
      .filter((value): value is string => value !== null)
      .join(" ")

  const details = [
    `${copy.sellLabel} ${sell}`,
    `${copy.emailLabel} ${email}`,
    `${copy.linkLabel} ${link}`,
  ].join("\n")

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if ((form.elements.namedItem("company") as HTMLInputElement).value) return
    const found = validate()
    setErrors(found)
    if (found.length) return
    const opened = window.open(`${WHATSAPP}?text=${encodeURIComponent(details)}`, "_blank")
    if (!opened) {
      setState("blocked")
      return
    }
    opened.opener = null
    track("prototype_requested", { source: "prototype" })
    setState("done")
  }

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    mailSubject,
  )}&body=${encodeURIComponent(details)}`

  if (state === "done")
    return (
      <p className="border-l border-accent-blue pl-4 py-2 text-base text-ink-2 leading-[1.55] max-w-lg">
        {copy.done}
      </p>
    )

  return (
    <>
      {errors.length ? (
        <div
          ref={summary}
          tabIndex={-1}
          role="alert"
          className="border border-destructive p-4 mb-6 max-w-lg outline-none focus-visible:ring-3 focus-visible:ring-destructive/40"
        >
          <p className="text-base font-semibold text-destructive mb-2">{copy.errorSummary}</p>
          <ul className="grid gap-1 text-sm text-destructive">
            {errors.map(([field, message]) => (
              <li key={field}>
                <a href={`#${id}-${field}`} className="underline underline-offset-4">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form onSubmit={submit} noValidate className="grid gap-4 max-w-lg">
        <div>
          <Label htmlFor={`${id}-sell`} className="mb-2">
            {copy.sellLabel}
          </Label>
          <Input
            id={`${id}-sell`}
            name="sell"
            type="text"
            value={sell}
            onChange={(event) => setSell(event.target.value)}
            placeholder={copy.sellPlaceholder}
            aria-invalid={Boolean(messageFor("sell"))}
            aria-describedby={describedBy("sell")}
          />
          {messageFor("sell") ? (
            <p id={`${id}-sell-error`} className="mt-2 text-sm text-destructive">
              {messageFor("sell")}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor={`${id}-email`} className="mb-2">
            {copy.emailLabel}
          </Label>
          <p id={`${id}-email-hint`} className="mb-2 text-xs text-muted-foreground leading-relaxed">
            {copy.emailHint}
          </p>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={Boolean(messageFor("email"))}
            aria-describedby={describedBy("email", `${id}-email-hint`)}
          />
          {messageFor("email") ? (
            <p id={`${id}-email-error`} className="mt-2 text-sm text-destructive">
              {messageFor("email")}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor={`${id}-link`} className="mb-2">
            {copy.linkLabel}
          </Label>
          <Input
            id={`${id}-link`}
            name="link"
            type="text"
            inputMode="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder={copy.linkPlaceholder}
            aria-invalid={Boolean(messageFor("link"))}
            aria-describedby={describedBy("link")}
          />
          {messageFor("link") ? (
            <p id={`${id}-link-error`} className="mt-2 text-sm text-destructive">
              {messageFor("link")}
            </p>
          ) : null}
          <p className="mt-3 border-l border-rule pl-3 text-xs text-muted-foreground leading-relaxed">
            {copy.privacy}
          </p>
        </div>

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        {state === "blocked" ? (
          <p role="alert" className="text-sm text-destructive max-w-lg leading-relaxed">
            {copy.error}{" "}
            <a href={mailtoHref} className="underline underline-offset-4">
              {contactEmail}
            </a>
          </p>
        ) : null}

        <Button type="submit" className="justify-self-start">
          {copy.action}
        </Button>
      </form>
    </>
  )
}

export default PrototypeRequest
