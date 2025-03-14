"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Force light mode on initial load by clearing any stored theme preference
    if (typeof window !== 'undefined') {
      // Only set to light if no theme is already stored
      if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'light')
      }
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

