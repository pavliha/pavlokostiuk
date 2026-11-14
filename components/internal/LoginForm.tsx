"use client"

import { KeyRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/internal/auth-client"

type AuthResult = { error: { message?: string } | null }

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const settle = (result: AuthResult) => {
    setPending(false)
    if (result.error) setError(result.error.message ?? "Sign-in failed.")
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
