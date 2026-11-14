"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/internal/auth-client"

const DEVICES: [RegExp, string][] = [
  [/iPhone/, "iPhone"],
  [/iPad/, "iPad"],
  [/Android/, "Android phone"],
  [/Macintosh/, "Mac"],
  [/Windows/, "Windows PC"],
]

const thisDevice = (): string => DEVICES.find(([pattern]) => pattern.test(navigator.userAgent))?.[1] ?? "This device"

const AddPasskeyForm = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const add = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const typed = String(new FormData(event.currentTarget).get("name")).trim()
    const name = typed === "" ? thisDevice() : typed
    setPending(true)
    setError("")
    const result = await authClient.passkey.addPasskey({ name })
    setPending(false)
    if (result?.error) setError(`The passkey was not saved (${result.error.status} ${result.error.statusText}): ${result.error.message}`)
    else router.refresh()
  }

  return (
    <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <div className="grid gap-2">
        <Label htmlFor="passkey-name">Device name (optional)</Label>
        <Input id="passkey-name" name="name" placeholder="Named after this device if left empty" />
      </div>
      <Button type="submit" disabled={pending}>
        Add a passkey
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive sm:col-span-2">
          {error}
        </p>
      )}
    </form>
  )
}

export default AddPasskeyForm
