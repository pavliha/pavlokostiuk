"use client"

import { useEffect, useRef, useState } from "react"

import { track } from "@/lib/track"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SUBSCRIBE_ENDPOINT } from "@/content/site"

const MAX_BYTES = 10 * 1024 * 1024
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const ACCEPT = ".csv,.tsv,.txt,.xls,.xlsx,.xml,.json,.pdf,.zip,image/*"

type State = "idle" | "sending" | "done" | "error"

type FieldError = [string, string]

export type PrototypeCopy = {
  sellLabel: string
  sellPlaceholder: string
  emailLabel: string
  emailHint: string
  linkLabel: string
  linkHint: string
  linkPlaceholder: string
  fileLabel: string
  fileHint: string
  privacy: string
  action: string
  sending: string
  done: string
  error: string
  errorSummary: string
  errors: {
    sell: string
    email: string
    catalog: string
    file: string
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
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<FieldError[]>([])
  const summary = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!errors.length) return
    summary.current?.focus()
    const restore = document.title
    document.title = `Error: ${restore}`
    return () => {
      document.title = restore
    }
  }, [errors])

  const validate = (): FieldError[] =>
    ([
      sell.trim() ? null : ["sell", copy.errors.sell],
      EMAIL_PATTERN.test(email.trim()) ? null : ["email", copy.errors.email],
      link.trim() || files.length ? null : ["link", copy.errors.catalog],
      files.some((file) => file.size > MAX_BYTES) ? ["file", copy.errors.file] : null,
    ] as (FieldError | null)[]).filter((entry): entry is FieldError => entry !== null)

  const messageFor = (field: string) => errors.find(([name]) => name === field)?.[1]

  const describedBy = (field: string, ...extra: string[]) =>
    [...extra, messageFor(field) ? `${id}-${field}-error` : null]
      .filter((value): value is string => value !== null)
      .join(" ")

  const payload = () =>
    files.length
      ? {
          body: [
            ...Object.entries({ sell, email, link, source: "prototype" }),
            ...files.map((file): [string, File] => ["catalog", file]),
          ].reduce((data, [key, value]) => {
            data.append(key, value)
            return data
          }, new FormData()),
        }
      : {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, sell, link, source: "prototype" }),
        }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if ((form.elements.namedItem("company") as HTMLInputElement).value) return
    const found = validate()
    setErrors(found)
    if (found.length) return
    setState("sending")
    try {
      const response = await fetch(SUBSCRIBE_ENDPOINT, { method: "POST", ...payload() })
      if (!response.ok) throw new Error(String(response.status))
      setState("done")
      track("prototype_requested", { source: "prototype" })
    } catch {
      setState("error")
    }
  }

  const mailtoHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(
    [`${copy.sellLabel} ${sell}`, `${copy.emailLabel} ${email}`, `${copy.linkLabel} ${link}`].join(
      "\n"
    )
  )}`

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
          <p id={`${id}-link-hint`} className="mb-2 text-xs text-muted-foreground leading-relaxed">
            {copy.linkHint}
          </p>
          <Input
            id={`${id}-link`}
            name="link"
            type="text"
            inputMode="url"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            placeholder={copy.linkPlaceholder}
            aria-invalid={Boolean(messageFor("link"))}
            aria-describedby={describedBy("link", `${id}-link-hint`)}
          />
          {messageFor("link") ? (
            <p id={`${id}-link-error`} className="mt-2 text-sm text-destructive">
              {messageFor("link")}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor={`${id}-file`} className="mb-2">
            {copy.fileLabel}
          </Label>
          <p id={`${id}-file-hint`} className="mb-2 text-xs text-muted-foreground leading-relaxed">
            {copy.fileHint}
          </p>
          <Input
            id={`${id}-file`}
            name="catalog"
            type="file"
            multiple
            accept={ACCEPT}
            onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
            className="py-2.5"
            aria-invalid={Boolean(messageFor("file"))}
            aria-describedby={describedBy("file", `${id}-file-hint`)}
          />
          {messageFor("file") ? (
            <p id={`${id}-file-error`} className="mt-2 text-sm text-destructive">
              {messageFor("file")}
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

        {state === "error" ? (
          <p role="alert" className="text-sm text-destructive max-w-lg leading-relaxed">
            {copy.error}{" "}
            <a href={mailtoHref} className="underline underline-offset-4">
              {contactEmail}
            </a>
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={state === "sending"}
          aria-busy={state === "sending"}
          className="justify-self-start"
        >
          {state === "sending" ? copy.sending : copy.action}
        </Button>
      </form>
    </>
  )
}

export default PrototypeRequest
