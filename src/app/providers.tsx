'use client'

import { NextUIProvider } from '@nextui-org/react'
import { CookiesProvider } from 'react-cookie'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <NextUIProvider>{children}</NextUIProvider>
    </CookiesProvider>
  )
}
