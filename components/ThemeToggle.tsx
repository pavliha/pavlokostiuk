"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const toggle = () => {
  const isDark = document.documentElement.classList.toggle("dark")
  window.localStorage.theme = isDark ? "dark" : "light"
}

const ThemeToggle = ({ label }: { label: string }) => (
  <Button onClick={toggle} aria-label={label} variant="ghost" size="icon" className="shrink-0 size-11">
    <Sun className="hidden dark:block" />
    <Moon className="block dark:hidden" />
  </Button>
)

export default ThemeToggle
