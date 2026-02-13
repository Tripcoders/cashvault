'use client'

import React from 'react'
import { useUser } from "@stackframe/stack"
import { useUserStore } from '@/stores/user-store'
import { 
  User, 
  Mail, 
  Calendar, 
  Wallet, 
  ShoppingBag, 
  ShieldCheck, 
  KeyRound, 
  LogOut,
  Pencil
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatCurrency, formatDate } from '@/lib/utils'

export function ProfileView() {
  const user = useUser()
  const { user: dbUser, logout } = useUserStore()
  const router = useRouter()

  const handleSignOut = async () => {
    await logout()
  }

  const handleChangePassword = () => {
    router.push('/handler/change-password')
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and view your activity</p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-card border border-border rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar with "M" - Large */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center text-5xl font-bold text-primary-foreground shadow-lg">
              M
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {user?.displayName || user?.primaryEmail || 'Anonymous User'}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Premium Member</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors self-start">
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-foreground">{user?.primaryEmail || 'No email'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Member Since</p>
                  <p className="text-sm font-medium text-foreground">
                    {dbUser?.memberSince || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Balance</p>
                  <p className="text-lg font-bold text-green-500">{formatCurrency(dbUser?.balance || 0)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Orders</p>
                  <p className="text-lg font-bold text-orange-500">{dbUser?.totalOrders || 0} orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Deposited</p>
              <p className="text-xl font-bold text-foreground">$0.00</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(dbUser?.totalSpent || 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-xl font-bold text-foreground">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">Manage your account security preferences</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Change Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Change
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Sign Out */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-red-500/5 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Sign Out</p>
                <p className="text-sm text-muted-foreground">Sign out from all devices</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors whitespace-nowrap"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
