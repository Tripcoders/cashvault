'use client'

import React, { useState } from 'react'
import { SignIn, SignUp } from "@stackframe/stack";
import { Lock as LockIcon } from 'lucide-react'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animate-slide-in-left">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply z-10 animate-pulse-glow" />

        {/* Image */}
        <img
          src="/auth-bg.jpg"
          alt="Digital Security"
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />

      </div>

      {/* Right Column - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#0A0A0A] animate-slide-in-right relative overflow-hidden text-white">
        {/* Background glow for form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="flex justify-center animate-scale-in-bounce mb-8">
            <img
              src="/logo.png"
              alt="CashVault"
              className="h-6 w-auto object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            {isLogin ? (
              <SignIn fullPage={false} />
            ) : (
              <SignUp fullPage={false} />
            )}

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-400 hover:text-blue-400 font-medium transition-colors hover:underline decoration-2 underline-offset-4"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
            Account Access
          </h2>

          <div className="pt-8 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs text-white/40">
              <LockIcon className="w-3.5 h-3.5" />
              <span>Secured by enterprise-grade encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
