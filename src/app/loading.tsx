import React from 'react'

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center animate-pulse">
          <span className="text-primary-foreground font-bold text-3xl">C</span>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground text-sm">Loading...</p>
        
        {/* Spinner */}
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
