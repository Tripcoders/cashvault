import React from 'react'
import Link from 'next/link'
import { Search, Home, ArrowLeft, Package } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 404 Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">C</span>
            </div>
          </div>

          {/* 404 Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold text-center text-foreground mb-2">
            404
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl font-semibold text-center text-foreground mb-2">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Suggestions */}
          <div className="bg-muted rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-foreground mb-3">Popular Pages:</p>
            <div className="space-y-2">
              <Link 
                href="/" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors"
              >
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm">Browse Marketplace</span>
              </Link>
              <Link 
                href="/handler/profile" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors"
              >
                <Home className="w-4 h-4 text-primary" />
                <span className="text-sm">My Account</span>
              </Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help? <Link href="/handler/support" className="text-primary hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  )
}
