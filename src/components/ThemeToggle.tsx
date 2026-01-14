import React, { useEffect, useState } from "react"

function applyTheme(dark: boolean) {
  const root = document.documentElement
  root.classList.toggle("dark", dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme")
    return saved ? saved === "dark" : true
  })

  useEffect(() => {
    applyTheme(dark)
  }, [dark])

  return (
    <button
      type="button"
      className="px-3 py-1 rounded border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
      onClick={() => setDark((d) => !d)}
      aria-label="切换主题"
      title="切换主题"
    >
      {dark ? "Dark" : "Light"}
    </button>
  )
}
