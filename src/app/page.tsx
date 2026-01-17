'use client'

import { MarketplaceApp } from '@/components/marketplace/App'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Suspense fallback={null}>
        <MarketplaceApp />
      </Suspense>
    </ThemeProvider>
  )
}
