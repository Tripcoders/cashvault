'use client'

import React, { useState, useEffect } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import { CountdownModal } from './CountdownModal'

interface HeaderCountdownProps {
  accountCreatedAt: Date
  hasMadeDeposit: boolean
}

const EXPIRATION_HOURS = 96

export function HeaderCountdown({ accountCreatedAt, hasMadeDeposit }: HeaderCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  if (hasMadeDeposit || timeLeft <= 0) return null

  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  // Determine color based on time left
  let bgClass = 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30 hover:border-emerald-500/50'
  let textClass = 'text-emerald-400'
  let iconColor = 'text-emerald-400'

  if (hoursLeft <= 24) {
    bgClass = 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30 hover:border-red-500/50 animate-pulse'
    textClass = 'text-red-400'
    iconColor = 'text-red-400'
  } else if (hoursLeft <= 48) {
    bgClass = 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30 hover:border-amber-500/50'
    textClass = 'text-amber-400'
    iconColor = 'text-amber-400'
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border ${bgClass} backdrop-blur-sm transition-all cursor-pointer hover:scale-105`}
        title="Click for more information"
      >
        <AlertTriangle className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
        <div className="flex items-center gap-1.5">
          <Clock className={`w-3.5 h-3.5 ${iconColor}`} />
          <span className={`font-mono font-bold text-sm ${textClass}`}>
            {String(hoursLeft).padStart(2, '0')}:{String(minutesLeft).padStart(2, '0')}
          </span>
        </div>
        <span className="text-xs text-muted-foreground hidden lg:inline">
          to deposit
        </span>
      </button>

      <CountdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hoursLeft={hoursLeft}
        minutesLeft={minutesLeft}
      />
    </>
  )
}
