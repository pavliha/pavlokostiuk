import { Badge } from "@/components/ui/badge"
import { updateLead } from "@/app/internal/actions"
import type { Lead, LeadStatus } from "@/lib/internal/crm"

import ActionForm from "./ActionForm"

const NEXT_STEP: Record<LeadStatus, { to: LeadStatus; label: string } | null> = {
  NEW: { to: "CONTACTED", label: "Contacted" },
  CONTACTED: { to: "REPLIED", label: "They replied" },
  REPLIED: { to: "INTERESTED", label: "Interested" },
  INTERESTED: null,
}

const PREVIOUS: Record<LeadStatus, LeadStatus | null> = {
  NEW: null,
  CONTACTED: "NEW",
  REPLIED: "CONTACTED",
  INTERESTED: "REPLIED",
}

const LeadRow = ({ lead, contactedOn, crmUrl }: { lead: Lead; contactedOn: string | undefined; crmUrl: string }) => {
  const next = NEXT_STEP[lead.leadStatus]
  const previous = PREVIOUS[lead.leadStatus]
  return (
    <li className="grid gap-2 py-4 border-b last:border-b-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Badge variant={lead.fit === "HIGH" ? "default" : "outline"}>{lead.fit ?? "No fit"}</Badge>
        <span className="font-medium">{lead.name}</span>
      </div>
      {lead.hook && <p className="text-sm text-muted-foreground">{lead.hook}</p>}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {contactedOn && <span className="text-muted-foreground font-mono tabular-nums">Contacted {contactedOn}</span>}
        {lead.domainName.primaryLinkUrl && (
          <a href={`https://${lead.domainName.primaryLinkUrl}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">
            Website ↗
          </a>
        )}
        {lead.linkedinLink.primaryLinkUrl && (
          <a href={lead.linkedinLink.primaryLinkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">
            LinkedIn ↗
          </a>
        )}
        <a href={crmUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4">
          CRM ↗
        </a>
      </div>
      <div className="flex flex-wrap gap-2">
        {next && (
          <ActionForm action={updateLead} fields={{ id: lead.id, from: lead.leadStatus, to: next.to }} label={next.label} primary />
        )}
        {previous && (
          <ActionForm action={updateLead} fields={{ id: lead.id, from: lead.leadStatus, to: previous }} label="Undo" primary={false} />
        )}
      </div>
    </li>
  )
}

export default LeadRow
