'use client'

import React from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log error to monitoring service (optional)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="CashVault"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-foreground mb-2">
            Something Went Wrong
          </h1>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-6">
            We apologize for the inconvenience. Our team has been notified of this issue.
          </p>

          {/* Error Code (if available) */}
          {error.digest && (
            <div className="bg-muted rounded-lg p-3 mb-6 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Error Reference</p>
              <p className="font-mono text-sm text-foreground">{error.digest}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>

              <button
                onClick={() => router.push('/')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          If the problem persists, please contact support
        </p>
      </div>
    </div>
  )
}
