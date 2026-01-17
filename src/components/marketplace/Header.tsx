'use client'

import React from 'react'
import { Search, Bell } from 'lucide-react'
import { WalletBalance } from './WalletBalance'

interface HeaderProps {
  onOpenTopUp: () => void
}

export function Header({ onOpenTopUp }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <img
              src="/logo.png"
              alt="CashVault"
              className="h-4 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Discover', 'Collections', 'Analytics', 'Activity'].map(
              (item) => (
                <button
                  key={item}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                >
                  {item}
                </button>
              ),
            )}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden lg:flex items-center relative group">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <input
              type="text"
              placeholder="Search assets..."
              className="pl-10 pr-4 py-2 w-64 bg-muted/50 border border-transparent hover:border-border focus:border-primary focus:bg-background rounded-lg text-sm transition-all outline-none"
            />
          </div>

          <div className="h-6 w-px bg-border mx-2" />

          {/* Notifications */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>

          {/* Wallet & Top Up */}
          <div className="flex items-center gap-3 pl-2">
            <WalletBalance balance={12450.0} />
            <button
              onClick={onOpenTopUp}
              className="px-4 py-2 bg-foreground text-background dark:bg-primary dark:text-primary-foreground text-sm font-medium rounded-lg hover:bg-foreground/90 dark:hover:bg-primary/90 hover:shadow-lg hover:shadow-foreground/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Top Up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
