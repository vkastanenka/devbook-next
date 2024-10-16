// components
import { ModalProvider } from '@/components/providers/modal-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

// utils
import { cn } from '@/lib/utils'

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
        </ThemeProvider>
      </body>
    </html>
  )
}
