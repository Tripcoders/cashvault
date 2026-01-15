'use client'

import { MarketplaceApp } from '@/components/marketplace/App'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <MarketplaceApp />
    </ThemeProvider>
  )
}
