'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface VaultPreloaderProps {
  children: React.ReactNode
}

export function VaultPreloader({ children }: VaultPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [animationStage, setAnimationStage] = useState<'drawing' | 'filling' | 'revealing'>('drawing')

  useEffect(() => {
    // Stage 1: Drawing (2 seconds)
    const drawingTimer = setTimeout(() => {
      setAnimationStage('filling')
    }, 2000)

    // Stage 2: Filling (1 second)
    const fillingTimer = setTimeout(() => {
      setAnimationStage('revealing')
    }, 3000)

    // Stage 3: Reveal complete
    const completeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => {
      clearTimeout(drawingTimer)
      clearTimeout(fillingTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <div className="relative flex flex-col items-center">
              {/* Vault Animation Container */}
              <div className="relative w-48 h-48 mb-8">
                {/* SVG Vault */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Ring */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="95"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-primary"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />

                  {/* Inner Ring */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="75"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary/70"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.3, ease: 'easeInOut', delay: 0.2 }}
                  />

                  {/* Center Hub */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="25"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
                  />

                  {/* Spokes */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <motion.line
                      key={angle}
                      x1="100"
                      y1="100"
                      x2={100 + 50 * Math.cos((angle * Math.PI) / 180)}
                      y2={100 + 50 * Math.sin((angle * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-primary/80"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: 'easeInOut', 
                        delay: 0.8 + index * 0.1 
                      }}
                    />
                  ))}

                  {/* Fill Animation */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="95"
                    className="text-primary fill-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: animationStage === 'filling' || animationStage === 'revealing' ? 0.1 : 0,
                      scale: animationStage === 'filling' || animationStage === 'revealing' ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </svg>

                {/* Logo Overlay - Appears after drawing */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: animationStage === 'filling' ? 1 : 0,
                    scale: animationStage === 'filling' ? 1 : 0.5
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src="/logo.png"
                      alt="CashVault"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(var(--primary), 0.2)',
                      '0 0 40px rgba(var(--primary), 0.4)',
                      '0 0 20px rgba(var(--primary), 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>

              {/* Loading Text */}
              <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-bold text-foreground">
                  CashVault
                </h2>
                <p className="text-sm text-muted-foreground">
                  {animationStage === 'drawing' && 'Securing vault...'}
                  {animationStage === 'filling' && 'Accessing secure storage...'}
                  {animationStage === 'revealing' && 'Welcome to CashVault'}
                </p>
              </motion.div>

              {/* Progress Dots */}
              <div className="flex items-center gap-2 mt-6">
                {['drawing', 'filling', 'revealing'].map((stage, index) => (
                  <motion.div
                    key={stage}
                    className="w-2 h-2 rounded-full"
                    animate={{
                      backgroundColor: 
                        animationStage === stage || 
                        (stage === 'drawing' && animationStage !== 'drawing') ||
                        (stage === 'filling' && animationStage === 'revealing')
                          ? 'rgb(var(--primary))'
                          : 'rgb(var(--muted))',
                      scale: animationStage === stage ? 1.5 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  )
}
