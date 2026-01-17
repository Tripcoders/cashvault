'use client'

import React, { useState } from 'react'
import { X, Copy, CheckCircle, ArrowRight, Wallet, ShieldCheck, CreditCard, Bitcoin, DollarSign, Lock } from 'lucide-react'


import { useUserStore } from '@/stores/user-store'

interface TopUpModalProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 1 | 2 | 3

export function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const [step, setStep] = useState<Step>(1)
  const [amount, setAmount] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState('BTC')

  const addFunds = useUserStore((state) => state.addFunds)
  const user = useUserStore((state) => state.user)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as Step)

      // When explicitly moving to step 3 (Confirmation), process the top-up
      if (step === 2) {
        const value = parseFloat(amount)
        if (!isNaN(value) && value > 0) {
          addFunds(value)
        }
      }
    }
  }

  const prevStep = () => {
    if (step > 1) setStep((s) => (s - 1) as Step)
  }

  const isUpgrade = (parseFloat(amount) >= 700) && user?.tier === 'Basic'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-background border border-border shadow-2xl rounded-2xl overflow-hidden animate-scale-in-up glass-strong">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Wallet className="w-6 h-6 text-blue-600 animate-bounce-subtle" />
            </div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Top Up Balance
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all hover:scale-110 hover-lift"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-8 py-6 bg-muted/50 animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-px bg-border -z-10" />

            {[
              { num: 1, label: 'Amount', icon: DollarSign },
              { num: 2, label: 'Payment', icon: CreditCard },
              { num: 3, label: 'Confirm', icon: ShieldCheck },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2 bg-muted/50 px-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.num
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 scale-110'
                    : 'bg-background border-border text-muted-foreground'
                    }`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-bold tracking-wide transition-colors ${step >= s.num ? 'text-blue-600' : 'text-muted-foreground'
                    }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-face-in-up">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">
                  Enter Amount (USD)
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xl font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-5 bg-background border-2 border-border focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 rounded-full outline-none transition-all font-mono text-3xl font-bold text-foreground hover:border-blue-400"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
                {parseFloat(amount) >= 700 && (
                  <p className="text-sm text-green-600 font-bold flex items-center gap-2 animate-pulse">
                    <ShieldCheck className="w-4 h-4" />
                    Qualifies for Premium Tier Upgrade!
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['100', '500', '700', '1000'].map((val, idx) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 px-4 text-sm font-bold text-muted-foreground bg-muted/50 border-2 border-border rounded-full hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift ${amount === val ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''
                      }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-3 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-full border border-blue-200 dark:border-blue-900/30 animate-fade-in-up stagger-1">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-xs text-muted-foreground">
                  All transactions are encrypted and secure
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-face-in-up">
              {/* Crypto Selection */}
              <div className="flex gap-3 p-1.5 bg-muted rounded-full animate-fade-in-up">
                {['BTC', 'ETH', 'USDT', 'LTC', 'TON'].map((crypto, idx) => (
                  <button
                    key={crypto}
                    onClick={() => setSelectedCrypto(crypto)}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all hover-lift ${selectedCrypto === crypto
                      ? 'bg-background text-foreground shadow-md scale-105 border border-blue-600'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {crypto}
                  </button>
                ))}
              </div>

              <div className="p-5 bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-900/30 rounded-full animate-fade-in-up stagger-1 hover:border-blue-300 dark:hover:border-blue-800/40 transition-colors">
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 font-bold flex items-center gap-2">
                  <Bitcoin className="w-4 h-4 animate-bounce-subtle" />
                  Send {selectedCrypto} Only
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80 leading-relaxed">
                  Send only {selectedCrypto} to this address. Sending other
                  assets may result in permanent loss.
                </p>
              </div>

              <div className="space-y-3 animate-fade-in-up stagger-2">
                <label className="text-sm font-bold text-foreground">
                  Deposit Address
                </label>
                <div className="flex items-center gap-3 p-4 bg-muted/50 border-2 border-border rounded-full group hover:border-blue-500/30 transition-all hover-lift">
                  <code className="flex-1 font-mono text-sm text-foreground break-all">
                    bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2.5 text-muted-foreground hover:text-blue-600 hover:bg-background rounded-lg transition-all hover:scale-110 hover:shadow-md"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center py-6 animate-fade-in-up stagger-3">
                <div className="w-44 h-44 bg-background p-4 rounded-full border-2 border-border shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-shadow">
                  {/* Mock QR Code */}
                  <div className="w-full h-full bg-blue-900/90 pattern-grid-lg opacity-90 rounded-lg animate-pulse-glow" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 animate-scale-in-bounce py-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle shadow-lg shadow-green-500/20">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  Deposit Initiated
                </h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Your deposit of{' '}
                  <span className="font-mono font-bold text-foreground text-lg">
                    ${amount || '0.00'}
                  </span>{' '}
                  is being processed. Funds will appear after 1 confirmation.
                </p>
                {isUpgrade && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-500/50 rounded-full animate-pulse">
                    <p className="font-bold text-yellow-700 dark:text-yellow-400">
                      🎉 UPGRADE UNLOCKED!
                    </p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300">
                      You are now a Premium Member! Enjoy discounted rates and free OTP bot access.
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Transaction pending</span>
                  <span>~10-15 min</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-muted/50 border-t border-border flex justify-between items-center animate-fade-in-up">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={step === 3 ? onClose : nextStep}
            disabled={step === 1 && !amount}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all shadow-lg ${step === 1 && !amount
              ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/20 hover:-translate-y-0.5 hover-lift'
              }`}
          >
            {step === 3 ? 'Done' : 'Continue'}
            {step !== 3 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
