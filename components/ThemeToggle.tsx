"use client"

const toggle = () => {
  const html = document.documentElement
  const isDark = html.classList.toggle("dark")
  localStorage.theme = isDark ? "dark" : "light"
}

const ThemeToggle = () => (
  <button
    onClick={toggle}
    aria-label="Toggle theme"
    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
  >
    <svg className="hidden dark:block" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
    <svg className="block dark:hidden" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </button>
)

export default ThemeToggle
