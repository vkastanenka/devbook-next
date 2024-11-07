// components
import { Toaster } from '@/src/components/ui/toaster'
import { ModalProvider } from '@/src/components/providers/modal-provider'
import { ThemeProvider } from '@/src/components/providers/theme-provider'

// utils
import { cn } from '@/src/lib/utils'

// types
import type { Metadata } from 'next'

// typography
import { Inter } from 'next/font/google'

// styles
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devbook',
  description: 'Social media for developers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="devbook-theme"
        >
          <ModalProvider />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
