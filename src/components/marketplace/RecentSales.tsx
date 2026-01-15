'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingBag, X, Check } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

export function RecentSales() {
  const [visible, setVisible] = useState(false)
  const [sale, setSale] = useState({
    category: '',
    time: '',
    buyer: '',
  })

  const realisticBuyers = [
    'AnonymousUser', 'CryptoTrader', 'DigitalNinja', 'SecureBuyer', 
    'VerifiedUser', 'QuickShop', 'PremiumBuyer', 'ShadowPurchaser'
  ]

  useEffect(() => {
    const showRandomSale = () => {
      const randomCategory =
        CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
      const randomBuyer = realisticBuyers[Math.floor(Math.random() * realisticBuyers.length)]
      setSale({
        category: randomCategory.name,
        time: 'Just now',
        buyer: randomBuyer,
      })
      setVisible(true)
      setTimeout(() => setVisible(false), 5000)
    }

    const initialTimer = setTimeout(showRandomSale, 3000)
    const interval = setInterval(
      () => {
        if (!visible) {
          showRandomSale()
        }
      },
      Math.random() * 15000 + 15000,
    )

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-face-in-up">
      <div className="bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-5 flex items-start gap-4 max-w-sm hover-lift glass-strong">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl animate-bounce-subtle">
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
          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hover:scale-110"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
