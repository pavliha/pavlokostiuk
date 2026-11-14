import { Badge } from "@/components/ui/badge"
import { updateLead } from "@/app/internal/actions"
import type { Contact, Lead } from "@/lib/internal/crm"
import { LEAD_FLOW, type LeadStatus } from "@/lib/internal/lead-transition"

import ActionForm from "./ActionForm"
import CopyTextButton from "./CopyTextButton"

type FlowStage = (typeof LEAD_FLOW)[number]

const NEXT_LABEL: Record<FlowStage, string> = {
  NEW: "To contact",
  CONTACTED: "Contacted",
  REPLIED: "They replied",
  INTERESTED: "Interested",
}

const neighbours = (status: LeadStatus): { next: FlowStage | undefined; previous: FlowStage | undefined } => {
  const index = LEAD_FLOW.findIndex((stage) => stage === status)
  return index < 0 ? { next: undefined, previous: undefined } : { next: LEAD_FLOW[index + 1], previous: LEAD_FLOW[index - 1] }
}

const linkClass = "text-primary hover:underline underline-offset-4"

const ContactLine = ({ contact, crmBase }: { contact: Contact; crmBase: string }) => (
  <li className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
    <a href={`${crmBase}/object/person/${contact.id}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline underline-offset-4">
      {contact.name}
    </a>
    {contact.jobTitle && <span className="text-muted-foreground">{contact.jobTitle}</span>}
    {contact.email && (
      <span className="inline-flex items-center gap-1">
        <a href={`mailto:${contact.email}`} className={linkClass}>
          {contact.email}
        </a>
        <CopyTextButton text={contact.email} label="Copy email" />
      </span>
    )}
    {contact.linkedin && (
      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
        LinkedIn ↗
      </a>
    )}
  </li>
)

const LeadRow = ({
  lead,
  contacts,
  contactedOn,
  crmBase,
}: {
  lead: Lead
  contacts: Contact[]
  contactedOn: string | undefined
  crmBase: string
}) => {
  const { next, previous } = neighbours(lead.leadStatus)
  return (
    <li className="grid gap-2 py-4 border-b last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Badge variant={lead.fit === "HIGH" ? "default" : "outline"}>{lead.fit ?? "No fit"}</Badge>
        <span className="font-medium">{lead.name}</span>
      </div>
      {lead.hook && <p className="text-sm text-muted-foreground">{lead.hook}</p>}
      {contacts.length > 0 && (
        <ul aria-label={`People at ${lead.name}`} className="grid gap-1">
          {contacts.map((contact) => (
            <ContactLine key={contact.id} contact={contact} crmBase={crmBase} />
          ))}
        </ul>
      )}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {contactedOn && <span className="text-muted-foreground font-mono tabular-nums">Contacted {contactedOn}</span>}
        {lead.domainName.primaryLinkUrl && (
          <a href={`https://${lead.domainName.primaryLinkUrl}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Website ↗
          </a>
        )}
        {lead.linkedinLink.primaryLinkUrl && (
          <a href={lead.linkedinLink.primaryLinkUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn ↗
          </a>
        )}
        <a href={`${crmBase}/object/company/${lead.id}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
          CRM ↗
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {next && (
          <ActionForm action={updateLead} fields={{ id: lead.id, from: lead.leadStatus, to: next }} label={NEXT_LABEL[next]} primary />
        )}
        {previous && (
          <ActionForm action={updateLead} fields={{ id: lead.id, from: lead.leadStatus, to: previous }} label="Undo" primary={false} />
        )}
      </div>
    </li>
  )
}

export default LeadRow
