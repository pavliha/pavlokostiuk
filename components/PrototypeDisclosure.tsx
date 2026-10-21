"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import PrototypeRequest, { type PrototypeCopy } from "@/components/PrototypeRequest"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const PrototypeDisclosure = ({
  id,
  trigger,
  copy,
  contactEmail,
  mailSubject,
}: {
  id: string
  trigger: string
  copy: PrototypeCopy
  contactEmail: string
  mailSubject: string
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button size="cta" aria-controls={id}>
          {trigger}
          <ChevronDown
            aria-hidden="true"
            className="transition-transform duration-200 group-data-[state=open]/button:rotate-180"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        id={id}
        className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div className="pt-8">
          <PrototypeRequest
            id={`${id}-fields`}
            copy={copy}
            contactEmail={contactEmail}
            mailSubject={mailSubject}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default PrototypeDisclosure
