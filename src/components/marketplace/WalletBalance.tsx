'use client'

import React from 'react'
import { Wallet } from 'lucide-react'

interface WalletBalanceProps {
  balance: number
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="flex items-center space-x-3 px-4 py-2 bg-muted/50 dark:bg-muted/30 rounded-full border border-border/50 backdrop-blur-sm group hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500/30 transition-all duration-300 hover-lift">
      <div className="p-1.5 bg-white dark:bg-card rounded-full shadow-sm group-hover:scale-105 group-hover:rotate-6 transition-transform duration-300">
        <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-muted-foreground font-semibold mb-0.5">
          Balance
        </span>
        <span className="text-sm font-mono font-medium text-foreground">
          $
          {balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  )
}
