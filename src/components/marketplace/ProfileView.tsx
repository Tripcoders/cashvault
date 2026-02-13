'use client'

import React from 'react'
import { useUser } from "@stackframe/stack"
import { useUserStore } from '@/stores/user-store'
import { 
  Mail, 
  Calendar, 
  Wallet, 
  ShoppingBag, 
  ShieldCheck, 
  KeyRound, 
  LogOut,
  Pencil,
  Settings,
  Bell,
  Moon,
  User
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/lib/utils'

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

  const handleSettings = () => {
    router.push('/handler/settings')
  }

  // Get user's initial
  const userInitial = user?.displayName?.charAt(0).toUpperCase() || 
                      user?.primaryEmail?.charAt(0).toUpperCase() || 
                      'U'

  return (
    <div className="max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage your account settings and view your activity</p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
          {/* Avatar with Initial */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary flex items-center justify-center text-4xl sm:text-5xl font-bold text-primary-foreground shadow-lg border-4 border-border">
              {userInitial}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                  {user?.displayName || user?.primaryEmail || 'Anonymous User'}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Premium Member</p>
              </div>
              
              {/* Edit Profile Button - Single line on mobile */}
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium text-foreground transition-colors self-stretch sm:self-start whitespace-nowrap">
                <Pencil className="w-4 h-4 hidden sm:block" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Info Grid - 8pt spacing system */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">{user?.primaryEmail || 'No email'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Member Since</p>
                  <p className="text-sm font-medium text-foreground">
                    {dbUser?.memberSince || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Balance</p>
                  <p className="text-base sm:text-lg font-bold text-green-500">{formatCurrency(dbUser?.balance || 0)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Orders</p>
                  <p className="text-base sm:text-lg font-bold text-orange-500">{dbUser?.totalOrders || 0} orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Deposited</p>
              <p className="text-lg sm:text-xl font-bold text-foreground">$0.00</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Spent</p>
              <p className="text-lg sm:text-xl font-bold text-foreground">{formatCurrency(dbUser?.totalSpent || 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Account Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-lg sm:text-xl font-bold text-foreground">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        <div className="p-5 sm:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Settings</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-3">
          {/* Account Settings */}
          <button 
            onClick={handleSettings}
            className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">Account Settings</p>
                <p className="text-xs text-muted-foreground">Update your profile information</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>

          {/* Notifications */}
          <button className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">Notifications</p>
                <p className="text-xs text-muted-foreground">Manage notification preferences</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>

          {/* Appearance */}
          <button className="w-full flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Moon className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm sm:text-base">Appearance</p>
                <p className="text-xs text-muted-foreground">Dark mode and theme settings</p>
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </button>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Manage your account security preferences</p>
        </div>

        <div className="p-4 sm:p-6 space-y-3">
          {/* Change Password */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <KeyRound className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
              </div>
            </div>
            <button
              onClick={handleChangePassword}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Change
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Sign Out */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-red-500/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <LogOut className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm sm:text-base">Sign Out</p>
                <p className="text-xs text-muted-foreground">Sign out from all devices</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors whitespace-nowrap"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
