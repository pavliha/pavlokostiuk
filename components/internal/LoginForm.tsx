"use client"

import { KeyRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/internal/auth-client"

type AuthError = { code?: string; message?: string; status: number; statusText: string }

const HINTS: Record<string, string> = {
  PASSKEY_NOT_FOUND:
    "This device has no passkey for this site yet. Sign in with your password, then add one on the Security page.",
  AUTH_CANCELLED: "The passkey prompt was closed before it finished. Try again.",
  ERROR_CEREMONY_ABORTED: "The passkey prompt was closed before it finished. Try again.",
  INVALID_EMAIL_OR_PASSWORD: "That email and password don't match.",
}

const describe = (error: AuthError): string =>
  error.code && error.code in HINTS ? HINTS[error.code] : `Sign-in failed (${error.status} ${error.statusText}): ${error.message}`

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const settle = (result: { error: AuthError | null }) => {
    setPending(false)
    if (result.error) setError(describe(result.error))
    else router.replace("/internal")
  }

  const withPasskey = async () => {
    setPending(true)
    setError("")
    settle(await authClient.signIn.passkey())
  }

  const withPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setPending(true)
    setError("")
    settle(await authClient.signIn.email({ email: String(form.get("email")), password: String(form.get("password")) }))
  }

  return (
    <div className="grid gap-6">
      <Button type="button" onClick={withPasskey} disabled={pending}>
        <KeyRound />
        Sign in with passkey
      </Button>
      <details className="grid gap-4 text-sm">
        <summary className="cursor-pointer text-muted-foreground">Use password instead</summary>
        <form onSubmit={withPassword} className="grid gap-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="username webauthn" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <Button type="submit" variant="outline" disabled={pending}>
            Sign in with password
          </Button>
        </form>
      </details>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default LoginForm
