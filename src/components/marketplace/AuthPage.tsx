'use client'

import React, { useState } from 'react'
import { useUserStore } from '@/stores/user-store'
import { ArrowRight, Eye, EyeOff, Github, Shield, Lock, KeyRound } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const login = useUserStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login for demo
    login('CryptoKing99', 'king@crypto.vault')
  }

  return (
    <div className="min-h-screen flex bg-foreground">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animate-slide-in-left">
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-blue-600/20 mix-blend-multiply z-10 animate-pulse-glow" />
        
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=1600"
          alt="Digital Security"
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent z-20" />

        {/* Content */}
        <div className="absolute bottom-12 left-12 z-30 max-w-md animate-face-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 border border-blue-400/40 rounded-lg mb-6 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-blue-200 animate-bounce-subtle" />
            <span className="text-blue-100 text-sm font-bold">
              Secure & Encrypted
            </span>
          </div>
          <h1 className="text-5xl font-bold text-background mb-4 leading-tight">
            Secure Access to Premium Assets
          </h1>
          <p className="text-xl text-background/80 leading-relaxed">
            Join to most trusted marketplace for digital goods. Anonymous,
            secure, and instant delivery.
          </p>
          
          {/* Features */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-background/80 animate-fade-in-up">
              <div className="p-2 bg-blue-600/30 rounded-lg">
                <Lock className="w-5 h-5 text-blue-200" />
              </div>
              <span className="text-sm font-medium">End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-3 text-background/80 animate-fade-in-up stagger-1">
              <div className="p-2 bg-blue-600/30 rounded-lg">
                <Shield className="w-5 h-5 text-blue-200" />
              </div>
              <span className="text-sm font-medium">Bank-level security</span>
            </div>
            <div className="flex items-center gap-3 text-background/80 animate-fade-in-up stagger-2">
              <div className="p-2 bg-blue-600/30 rounded-lg">
                <KeyRound className="w-5 h-5 text-blue-200" />
              </div>
              <span className="text-sm font-medium">Instant account activation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-foreground animate-slide-in-right">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="text-center animate-scale-in-bounce">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/30 hover-lift">
              <span className="text-white font-bold text-4xl">C</span>
            </div>
            <h2 className="text-3xl font-bold text-background tracking-tight">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-3 text-background/60 text-lg">
              {isLogin
                ? 'Enter your credentials to access your vault'
                : 'Start your journey with Cash Vault today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-face-in-up stagger-1">
            <div className="space-y-5">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-background font-medium">First name</Label>
                    <Input 
                      id="firstname" 
                      placeholder="John" 
                      type="text"
                      className="hover:shadow-lg hover:border-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2 animate-fade-in-up stagger-1">
                    <Label htmlFor="lastname" className="text-background font-medium">Last name</Label>
                    <Input 
                      id="lastname" 
                      placeholder="Doe" 
                      type="text"
                      className="hover:shadow-lg hover:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 animate-fade-in-up">
                <Label htmlFor="email" className="text-background font-medium">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com"
                  className="hover:shadow-lg hover:border-blue-500/50 transition-all"
                />
              </div>

              <div className="space-y-2 animate-fade-in-up stagger-1">
                <Label htmlFor="password" className="text-background font-medium">Password</Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="•••••••"
                    className="hover:shadow-lg hover:border-blue-500/50 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-background/50 hover:text-blue-400 hover:scale-110 transition-all z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 hover-lift-strong animate-fade-in-up stagger-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-8 animate-fade-in-up">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-background/40 to-transparent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-foreground text-background/60 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* GitHub Button */}
            <button
              type="button"
              className="relative w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-background/10 hover:bg-background/20 border border-background/20 hover:border-blue-500/30 rounded-xl text-background/80 font-medium transition-all group hover-lift animate-fade-in-up stagger-3"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center animate-fade-in-up">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-background/60 hover:text-blue-400 font-medium transition-colors hover:underline decoration-2 underline-offset-4"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Security Note */}
          <div className="pt-8 border-t border-background/10 text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 text-background/40 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Secured by enterprise-grade encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
