import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/app/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Kanban.vn',
  description: 'Workflow management follow kanban template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/ivicon.svg" sizes="any" />
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
