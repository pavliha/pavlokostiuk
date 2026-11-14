import LoginForm from "@/components/internal/LoginForm"

export const dynamic = "force-dynamic"

const LoginPage = () => (
  <main className="min-h-dvh grid place-items-center px-4">
    <div className="w-full max-w-sm grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Internal</h1>
        <p className="text-sm text-muted-foreground">Job search and outreach dashboards. Private.</p>
      </div>
      <LoginForm />
    </div>
  </main>
)

export default LoginPage
