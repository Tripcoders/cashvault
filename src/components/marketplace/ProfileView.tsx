'use client'

import React from 'react'
import { useUserStore } from '@/stores/user-store'
import { User, Mail, Calendar, Wallet, ShoppingBag, ShieldCheck, Settings, KeyRound, MapPin, CreditCard, LogOut } from 'lucide-react'

export function ProfileView() {
  const { user } = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="md:col-span-1 animate-fade-in-up stagger-1">
          <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full overflow-hidden mb-6 shadow-lg shadow-blue-600/20">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-foreground">
              {user.username}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Premium Member
            </p>

            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/50 dark:bg-muted/30 rounded-xl">
                <Mail className="w-4 h-4 text-blue-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground p-3 bg-muted/50 dark:bg-muted/30 rounded-xl">
                <Calendar className="w-4 h-4 text-blue-500" />
                Member since {user.memberSince}
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Settings */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up stagger-2">
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground font-mono">
                $1,550.00
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground font-mono">
                2
              </p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in-up stagger-3">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Account Settings
            </h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Edit Profile</p>
                  <p className="text-xs text-muted-foreground">Update your personal information</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-4 h-4" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Payment Methods</p>
                  <p className="text-xs text-muted-foreground">Manage your payment options</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-4 h-4" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Shipping Address</p>
                  <p className="text-xs text-muted-foreground">Manage delivery addresses</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in-up stagger-4">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Security Settings
            </h3>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500/30 rounded-xl hover:border-green-500/50 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <span className="px-3 py-1.5 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  Enable
                </span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Active Sessions</p>
                  <p className="text-xs text-muted-foreground">Manage your logged-in devices</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all hover-lift group">
                <div>
                  <p className="font-medium text-foreground">Login History</p>
                  <p className="text-xs text-muted-foreground">View recent login activity</p>
                </div>
                <div className="p-2 bg-background rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
                  <User className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-6 py-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 hover:border-red-500/50 transition-all hover-lift animate-fade-in-up"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
