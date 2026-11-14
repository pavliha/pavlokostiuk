import { headers } from "next/headers"

import AddPasskeyForm from "@/components/internal/AddPasskeyForm"
import { Button } from "@/components/ui/button"
import { deletePasskey } from "@/app/internal/actions"
import { authReady } from "@/lib/internal/auth"

const SecurityPage = async () => {
  const passkeys = await (await authReady()).api.listPasskeys({ headers: await headers() })
  return (
    <>
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Security</h1>
        <p className="text-muted-foreground">
          Passkeys let you sign in with Face ID, Touch ID or your phone. The password in Bitwarden stays as a fallback.
        </p>
      </header>
      <section aria-labelledby="add-heading" className="grid gap-3 rounded-xl border bg-card p-4">
        <h2 id="add-heading" className="font-medium">
          Add a passkey on this device
        </h2>
        <AddPasskeyForm />
      </section>
      <section aria-labelledby="list-heading" className="grid gap-3">
        <h2 id="list-heading" className="font-medium">
          Your passkeys
        </h2>
        {passkeys.length ? (
          <ul className="rounded-xl border bg-card px-4">
            {passkeys.map((passkey) => (
              <li key={passkey.id} className="flex flex-wrap items-center justify-between gap-2 py-3 border-b last:border-b-0">
                <span>
                  <span className="font-medium">{passkey.name}</span>{" "}
                  <span className="text-sm text-muted-foreground">
                    added {passkey.createdAt.toISOString().slice(0, 10)}
                  </span>
                </span>
                <form action={deletePasskey}>
                  <input type="hidden" name="id" value={passkey.id} />
                  <Button type="submit" size="xs" variant="outline">
                    Remove
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No passkeys yet. You are signing in with the password.</p>
        )}
      </section>
    </>
  )
}

export default SecurityPage
