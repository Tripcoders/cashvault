'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, Clock, Wallet, ArrowRight, CheckCircle } from 'lucide-react'
import { useUserStore } from '@/stores/user-store'
import { useRouter } from 'next/navigation'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const router = useRouter()
  const { user } = useUserStore()
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    if (!isOpen || !user?.accountCreatedAt) return

    const calculateTimeLeft = () => {
      const created = new Date(user.accountCreatedAt).getTime()
      const expirationTime = created + (4 * 24 * 60 * 60 * 1000) // 4 days
      const now = new Date().getTime()
      const remaining = Math.max(0, expirationTime - now)

      return {
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remaining % (1000 * 60)) / 1000)
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, user])

  const handleTopUp = () => {
    onClose()
    // Navigate to wallet/add funds
    router.push('/handler/wallet')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header with Gradient */}
            <div className="relative h-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>
              
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative w-20 h-20"
              >
                <Image
                  src="/logo.png"
                  alt="CashVault"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-blue-400/30 blur-3xl rounded-full" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Welcome Title */}
              <div className="text-center space-y-2">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-foreground"
                >
                  Welcome to CashVault!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-sm"
                >
                  Your account has been created successfully
                </motion.p>
              </div>

              {/* Urgent Notice */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Action Required</p>
                    <p className="text-xs text-muted-foreground">Complete your first deposit to keep your account active</p>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-background/50 rounded-xl p-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Time Remaining</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-xl font-bold text-foreground">{String(timeLeft.days).padStart(2, '0')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Days</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-xl font-bold text-foreground">{String(timeLeft.hours).padStart(2, '0')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Hours</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-xl font-bold text-foreground">{String(timeLeft.minutes).padStart(2, '0')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Mins</p>
                    </div>
                    <div className="bg-background rounded-lg p-2">
                      <p className="text-xl font-bold text-foreground">{String(timeLeft.seconds).padStart(2, '0')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">Secs</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-amber-700 dark:text-amber-400 text-center font-medium">
                  Your account will be deactivated if you don&apos;t top up within 4 days
                </p>
              </motion.div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">What you get:</p>
                <div className="space-y-2">
                  {[
                    'Access to premium bank logs & financial tools',
                    'Instant delivery on all digital products',
                    '24/7 customer support',
                    'Secure escrow protection'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3 pt-2"
              >
                <button
                  onClick={handleTopUp}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Top Up Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
                >
                  I&apos;ll do it later
                </button>
              </motion.div>

              {/* Minimum Notice */}
              <p className="text-xs text-center text-muted-foreground">
                Minimum top-up amount: <span className="font-bold text-foreground">$150</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
