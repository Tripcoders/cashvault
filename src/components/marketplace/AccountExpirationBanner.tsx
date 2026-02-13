'use client'

import React, { useState, useEffect } from 'react'
import { AlertTriangle, Clock, X } from 'lucide-react'

interface AccountExpirationBannerProps {
  accountCreatedAt: Date
  hasMadeDeposit: boolean
}

const EXPIRATION_HOURS = 96

export function AccountExpirationBanner({ accountCreatedAt, hasMadeDeposit }: AccountExpirationBannerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (hasMadeDeposit) return

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const created = new Date(accountCreatedAt).getTime()
      const expirationTime = created + (EXPIRATION_HOURS * 60 * 60 * 1000)
      const remaining = Math.max(0, expirationTime - now)
      return remaining
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)
      if (remaining <= 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [accountCreatedAt, hasMadeDeposit])

  if (hasMadeDeposit || !isVisible || timeLeft <= 0) return null

  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000)

  // Determine banner color based on time left
  let bannerClass = 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
  let iconColor = 'text-green-500'
  let urgencyText = 'Account Active'

  if (hoursLeft <= 24) {
    bannerClass = 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30 animate-pulse'
    iconColor = 'text-red-500'
    urgencyText = 'CRITICAL: Account expires soon!'
  } else if (hoursLeft <= 48) {
    bannerClass = 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30'
    iconColor = 'text-yellow-500'
    urgencyText = 'WARNING: Account expires in 48 hours!'
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${bannerClass} border-b backdrop-blur-sm`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground text-sm">
                {urgencyText}
              </span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-background/50 rounded-lg">
                <Clock className={`w-4 h-4 ${iconColor}`} />
                <span className="font-mono font-bold text-foreground">
                  {String(hoursLeft).padStart(2, '0')}:
                  {String(minutesLeft).padStart(2, '0')}:
                  {String(secondsLeft).padStart(2, '0')}
                </span>
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Make a deposit to keep your account active
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-background/50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
