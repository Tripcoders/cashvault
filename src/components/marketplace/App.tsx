'use client'

import React from 'react'
import { Marketplace } from './Marketplace'
import { AuthPage } from './AuthPage'
import { useUserStore } from '@/stores/user-store'

export function MarketplaceApp() {
  const user = useUserStore((state) => state.user)
  
  // Simple auth routing
  if (!user) {
    return <AuthPage />
  }
  
  return <Marketplace />
}
