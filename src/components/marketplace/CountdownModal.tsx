'use client'

import React from 'react'
import { X, Clock, AlertTriangle, Wallet, Info } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface CountdownModalProps {
  isOpen: boolean
  onClose: () => void
  hoursLeft: number
  minutesLeft: number
}

export function CountdownModal({ isOpen, onClose, hoursLeft, minutesLeft }: CountdownModalProps) {
  const isCritical = hoursLeft <= 24
  const isWarning = hoursLeft <= 48 && hoursLeft > 24

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <Clock className="w-5 h-5 text-primary" />
            Account Activation Required
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Countdown Display */}
          <div className={`text-center p-6 rounded-2xl ${
            isCritical 
              ? 'bg-red-500/10 border-2 border-red-500/30' 
              : isWarning 
                ? 'bg-amber-500/10 border-2 border-amber-500/30'
                : 'bg-emerald-500/10 border-2 border-emerald-500/30'
          }`}>
            <div className={`text-5xl font-mono font-bold mb-2 ${
              isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'
            }`}>
              {String(hoursLeft).padStart(2, '0')}:{String(minutesLeft).padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground">
              Time remaining to make your first deposit
            </p>
          </div>

          {/* Alert Box */}
          <div className={`p-4 rounded-xl flex gap-3 ${
            isCritical 
              ? 'bg-red-500/10 border border-red-500/20' 
              : 'bg-amber-500/10 border border-amber-500/20'
          }`}>
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
              isCritical ? 'text-red-500' : 'text-amber-500'
            }`} />
            <div>
              <p className={`font-semibold text-sm ${
                isCritical ? 'text-red-500' : 'text-amber-500'
              }`}>
                {isCritical ? 'Critical: Account will be deleted soon!' : 'Warning: Limited time remaining'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                New accounts must make a deposit within 96 hours (4 days) of registration.
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Info className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Why do I need to deposit?</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  To ensure serious buyers and maintain platform quality, all new accounts must make a minimum deposit of $50 within 4 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">What happens after I deposit?</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your account will be permanently activated with no time restrictions. You can then purchase any products available on the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            I Understand - Make a Deposit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
