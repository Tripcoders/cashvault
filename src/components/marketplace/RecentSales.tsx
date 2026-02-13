'use client'

import React, { useEffect, useState, useRef } from 'react'
import { ShoppingBag, X, Check } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'
import { useUser } from "@stackframe/stack";

const FIFTEEN_MINUTES = 15 * 60 * 1000 // 15 minutes in ms
const TWO_MINUTES = 2 * 60 * 1000 // 2 minutes in ms
const SHOW_DURATION = 5000 // Show for 5 seconds

export function RecentSales() {
  const [visible, setVisible] = useState(false)
  const [sale, setSale] = useState({
    category: '',
    time: '',
    buyer: '',
  })
  const user = useUser()
  const loginTimeRef = useRef<number>(Date.now())
  const lastShownRef = useRef<number>(0)
  const isInitialPeriodRef = useRef<boolean>(true)

  const realisticBuyers = [
    'AnonymousUser', 'CryptoTrader', 'DigitalNinja', 'SecureBuyer', 
    'VerifiedUser', 'QuickShop', 'PremiumBuyer', 'ShadowPurchaser',
    'DarkNetBuyer', 'EliteClient', 'GhostUser', 'ProTrader'
  ]

  // Reset login time when user changes
  useEffect(() => {
    if (user) {
      loginTimeRef.current = Date.now()
      lastShownRef.current = 0
      isInitialPeriodRef.current = true
    }
  }, [user?.id])

  useEffect(() => {
    const showRandomSale = () => {
      const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
      const randomBuyer = realisticBuyers[Math.floor(Math.random() * realisticBuyers.length)]
      setSale({
        category: randomCategory.name,
        time: 'Just now',
        buyer: randomBuyer,
      })
      setVisible(true)
      lastShownRef.current = Date.now()
      
      // Hide after 5 seconds
      setTimeout(() => setVisible(false), SHOW_DURATION)
    }

    const checkAndShow = () => {
      const now = Date.now()
      const timeSinceLogin = now - loginTimeRef.current
      const timeSinceLastShown = now - lastShownRef.current

      // Check if we're past the initial 2-minute period
      if (timeSinceLogin > TWO_MINUTES) {
        isInitialPeriodRef.current = false
      }

      // Determine interval based on period
      const interval = isInitialPeriodRef.current ? TWO_MINUTES : FIFTEEN_MINUTES

      // Show if enough time has passed since last shown
      if (timeSinceLastShown >= interval && !visible) {
        showRandomSale()
      }
    }

    // Check every 10 seconds
    const checkInterval = setInterval(checkAndShow, 10000)

    // Initial check after 2 minutes
    const initialTimer = setTimeout(() => {
      if (!visible) {
        showRandomSale()
      }
    }, TWO_MINUTES)

    return () => {
      clearInterval(checkInterval)
      clearTimeout(initialTimer)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-5 flex items-start gap-4 max-w-sm">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Check className="w-4 h-4 text-green-500" />
            <h4 className="text-sm font-bold text-foreground">
              New Purchase
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            <span className="font-bold text-foreground">{sale.buyer}</span>{' '}
            just purchased{' '}
            <span className="font-bold text-blue-600">{sale.category}</span>
          </p>
          <span className="text-xs text-muted-foreground/60 mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            {sale.time}
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
