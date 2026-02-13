'use client'

import React from 'react'
import Image from 'next/image'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Error Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
              {/* Logo */}
              <div className="flex justify-center mb-6">
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
              <h1 className="text-2xl font-bold text-center text-white mb-2">
                Critical Error
              </h1>

              {/* Description */}
              <p className="text-center text-slate-400 mb-6">
                A critical error has occurred. Please refresh the page to continue.
              </p>

              {/* Error Code */}
              {error.digest && (
                <div className="bg-slate-800 rounded-lg p-3 mb-6 text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Error ID</p>
                  <p className="font-mono text-sm text-slate-300">{error.digest}</p>
                </div>
              )}

              {/* Action */}
              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Application
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-slate-500 mt-6">
              CashVault - Secure Marketplace
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
