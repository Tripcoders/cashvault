import React from 'react'
import Image from 'next/image'

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* CashVault Logo */}
        <div className="relative w-16 h-16 animate-pulse">
          <Image
            src="/logo.png"
            alt="CashVault"
            fill
            className="object-contain"
            priority
          />
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground text-sm font-medium">Loading CashVault...</p>
        
        {/* Spinner */}
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
