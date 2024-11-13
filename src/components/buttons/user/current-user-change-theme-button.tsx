'use client'

// svg
import { Sun, Moon } from 'lucide-react'

// utils
import { useTheme } from 'next-themes'

export const CurrentUserChangeThemeButton = () => {
  const { theme, setTheme } = useTheme()

  let newTheme = 'dark'

  switch (theme) {
    case 'light':
      newTheme = 'dark'
      break
    case 'dark':
      newTheme = 'light'
      break
    default:
      newTheme = 'dark'
      break
  }

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => setTheme(newTheme)}
    >
      {theme === 'light' && <Sun />}
      {theme === 'dark' && <Moon />}
      Change theme
    </button>
  )
}
