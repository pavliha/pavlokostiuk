import AddPasskeyForm from "./AddPasskeyForm"

const PasskeyPrompt = () => (
  <section aria-labelledby="passkey-heading" className="grid gap-3 rounded-xl border border-primary/40 bg-card p-4">
    <div className="grid gap-1">
      <h2 id="passkey-heading" className="font-medium">
        Add a passkey on this device
      </h2>
      <p className="text-sm text-muted-foreground">
        Next time, sign in with Face ID or Touch ID instead of the password. Manage passkeys on the Security page.
      </p>
    </div>
    <AddPasskeyForm />
  </section>
)

export default PasskeyPrompt
