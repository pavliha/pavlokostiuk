"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

const CopyTextButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
  }
  return (
    <Button type="button" size="xs" variant="outline" onClick={copy}>
      {copied ? "Copied" : label}
    </Button>
  )
}

export default CopyTextButton
