import { Button } from "@/components/ui/button"

const ActionForm = ({
  action,
  fields,
  label,
  primary,
}: {
  action: (form: FormData) => Promise<void>
  fields: Record<string, string>
  label: string
  primary: boolean
}) => (
  <form action={action}>
    {Object.entries(fields).map(([name, value]) => (
      <input key={name} type="hidden" name={name} value={value} />
    ))}
    <Button type="submit" size="xs" variant={primary ? "default" : "outline"}>
      {label}
    </Button>
  </form>
)

export default ActionForm
