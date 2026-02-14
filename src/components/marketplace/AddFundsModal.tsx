'use client'

import React, { useState, useEffect } from 'react'
import { X, Copy, CheckCircle, Wallet, Bitcoin, Coins, Hexagon, RefreshCw, Loader2, Clock, AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@stackframe/stack'

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
}

type CryptoCurrency = 'BTC' | 'ETH' | 'USDT_TRON' | 'USDT_ETH'

interface CryptoOption {
  id: CryptoCurrency
  name: string
  icon: React.ReactNode
  symbol: string
  address: string
  network: string
  color: string
  bgColor: string
}

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: <Bitcoin className="w-6 h-6" />,
    address: 'bc1qz9way2wvfpsj0rffuq7e3jgvt478fs5pmufz9g',
    network: 'BTC',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: <Coins className="w-6 h-6" />,
    address: '0xEB20C75fB9D9E771F470baFF8F3fb8994c192b45',
    network: 'ERC20',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    id: 'USDT_TRON',
    name: 'USDT (TRON)',
    symbol: 'USDT',
    icon: <Hexagon className="w-6 h-6" />,
    address: 'TRTxb3b51irxBeihkAzzNPFCm2GQzQgiqc',
    network: 'TRC20',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 'USDT_ETH',
    name: 'USDT (ETH)',
    symbol: 'USDT',
    icon: <Hexagon className="w-6 h-6" />,
    address: '0xEB20C75fB9D9E771F470baFF8F3fb8994c192b45',
    network: 'ERC20',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
]

// 10 minutes in seconds
const PAYMENT_WINDOW = 10 * 60

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [step, setStep] = useState<'select' | 'generating' | 'payment'>('select')
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency | null>(null)
  const [amount, setAmount] = useState('')
  const [copied, setCopied] = useState(false)
  const [paymentId, setPaymentId] = useState('')
  const [timeLeft, setTimeLeft] = useState(PAYMENT_WINDOW)
  const { toast } = useToast()
  const user = useUser()

  const selectedOption = CRYPTO_OPTIONS.find(c => c.id === selectedCrypto)

  // Generate unique payment ID
  useEffect(() => {
    if (selectedCrypto && amount && step === 'payment') {
      const userId = user?.id?.slice(0, 8) || 'USER'
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 6).toUpperCase()
      setPaymentId(`CV-${userId}-${timestamp}-${random}`)
      setTimeLeft(PAYMENT_WINDOW)
    }
  }, [selectedCrypto, amount, step, user?.id])

  // Countdown timer
  useEffect(() => {
    if (step === 'payment' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time expired
            toast({
              title: 'Payment Window Expired',
              description: 'Please generate a new payment address.',
              variant: 'destructive',
            })
            setStep('select')
            return PAYMENT_WINDOW
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleCopyAddress = () => {
    if (selectedOption?.address) {
      navigator.clipboard.writeText(selectedOption.address)
      setCopied(true)
      toast({
        title: 'Address Copied',
        description: `${selectedOption.name} address copied to clipboard`,
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGenerateAddress = () => {
    if (!selectedCrypto || !amount) {
      toast({
        title: 'Missing Information',
        description: 'Please select a cryptocurrency and enter an amount',
        variant: 'destructive',
      })
      return
    }
    
    if (parseFloat(amount) < 150) {
      toast({
        title: 'Minimum Deposit',
        description: 'Minimum deposit amount is $150',
        variant: 'destructive',
      })
      return
    }

    // Show generating spinner
    setStep('generating')
    
    // Simulate generation delay (2 seconds)
    setTimeout(() => {
      setStep('payment')
    }, 2000)
  }

  const handleBack = () => {
    setStep('select')
    setPaymentId('')
    setTimeLeft(PAYMENT_WINDOW)
  }

  const handleClose = () => {
    setStep('select')
    setSelectedCrypto(null)
    setAmount('')
    setPaymentId('')
    setTimeLeft(PAYMENT_WINDOW)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            {step === 'select' ? 'Add Funds' : step === 'generating' ? 'Generating...' : 'Payment Details'}
          </DialogTitle>
        </DialogHeader>

        {step === 'select' ? (
          <div className="space-y-6 py-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount (min $150)"
                  min="50"
                  className="w-full pl-8 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum deposit: $150. Funds will be credited after network confirmation.
              </p>
            </div>

            {/* Crypto Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Select Cryptocurrency
              </label>
              <div className="grid grid-cols-2 gap-3">
                {CRYPTO_OPTIONS.map((crypto) => (
                  <button
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedCrypto === crypto.id
                        ? `border-primary ${crypto.bgColor}`
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    <div className={crypto.color}>{crypto.icon}</div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm">{crypto.name}</p>
                      <p className="text-xs text-muted-foreground">{crypto.network}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {selectedCrypto && amount && (
              <div className="p-4 bg-muted rounded-xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold">${amount} USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Currency:</span>
                  <span className="font-semibold">{selectedOption?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-semibold">{selectedOption?.network}</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleGenerateAddress}
              disabled={!selectedCrypto || !amount || parseFloat(amount) < 150}
              className="w-full"
            >
              Generate Payment Address
            </Button>
          </div>
        ) : step === 'generating' ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg font-semibold text-foreground">Generating Address...</p>
            <p className="text-sm text-muted-foreground mt-2">Please wait while we create your unique payment address</p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              ← Back to selection
            </button>

            {/* Payment ID - Display Only (Not Copiable) */}
            <div className="p-4 bg-primary/10 border-2 border-primary/30 rounded-xl">
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <span className="text-primary">⚠</span> Payment ID (Required)
              </label>
              <p className="text-xs text-muted-foreground mb-2">
                You MUST include this ID in the transaction memo/tag or your payment may not be credited.
              </p>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="font-mono text-sm text-foreground break-all select-text">{paymentId}</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="p-4 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Payment Window</p>
                  <p className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-amber-500'}`}>
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete payment within 10 minutes
                  </p>
                </div>
              </div>
              {timeLeft < 60 && (
                <div className="mt-3 flex items-center gap-2 text-xs text-red-500 bg-red-500/10 p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Hurry! Payment window closing soon</span>
                </div>
              )}
            </div>

            {/* Address Display */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Send {selectedOption?.symbol} to this address
              </label>
              <div className="p-4 bg-muted rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${selectedOption?.bgColor}`}>
                    {selectedOption?.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{selectedOption?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedOption?.network}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="p-3 bg-background rounded-lg border border-border">
                    <p className="font-mono text-sm text-foreground break-all pr-10">
                      {selectedOption?.address}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  Important: Only send {selectedOption?.symbol} on {selectedOption?.network} network!
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-muted/50 rounded-xl space-y-3">
              <h4 className="font-semibold text-foreground text-sm">How to complete your deposit:</h4>
              <ol className="text-xs text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Note the <strong>Payment ID</strong> above (very important!)</li>
                <li>Copy the wallet address for {selectedOption?.name}</li>
                <li>Open your crypto wallet app</li>
                <li>Send exactly <strong>${amount} USD worth</strong> of {selectedOption?.symbol}</li>
                <li>Include the <strong>Payment ID</strong> in the memo/tag field</li>
                <li>Complete within <strong>10 minutes</strong> or generate new address</li>
                <li>Your balance will be automatically updated after confirmation</li>
              </ol>
            </div>

            {/* Close Button */}
            <Button onClick={handleClose} className="w-full" variant="outline">
              I've Sent the Payment
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
