'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search, Menu, X, Wallet, Plus, ShoppingCart, Home, Package, User, MoreHorizontal } from 'lucide-react'
import { WalletBalance } from './WalletBalance'
import { ProfileDropdown } from './ProfileDropdown'
import { UserAuthButton } from './UserAuthButton'
import { HeaderCountdown } from './HeaderCountdown'
import { NotificationsDropdown } from './NotificationsDropdown'
import { useUser } from "@stackframe/stack";
import { useUserStore } from '@/stores/user-store'
import { useCartItemCount } from '@/stores/cart-store'

interface HeaderProps {
  onOpenTopUp: () => void
  onNavigateToProfile: () => void
  onToggleMobileMenu: () => void
  isMobileMenuOpen: boolean
  currentView?: string
  onChangeView?: (view: string) => void
}

export function Header({ 
  onOpenTopUp, 
  onNavigateToProfile, 
  onToggleMobileMenu,
  isMobileMenuOpen,
  currentView = 'shop',
  onChangeView
}: HeaderProps) {
  const user = useUser()
  const { user: dbUser } = useUserStore()
  const cartCount = useCartItemCount()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="h-16 lg:h-20 px-4 lg:px-6 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle & Search */}
          <div className="flex items-center gap-3 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
            
            {/* Search - Desktop & Tablet */}
            <div className="hidden sm:flex flex-1 max-w-md">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent hover:border-border focus:border-primary focus:bg-background rounded-full text-sm transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Center: Countdown (when logged in) */}
          <div className="flex items-center justify-center">
            {user && (
              <HeaderCountdown
                accountCreatedAt={dbUser?.accountCreatedAt ? new Date(dbUser.accountCreatedAt) : new Date()}
                hasMadeDeposit={dbUser?.hasMadeDeposit || false}
              />
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 lg:gap-4 justify-end">
            {/* Notifications */}
            <NotificationsDropdown />

            {/* Divider - Desktop */}
            <div className="hidden lg:block w-px h-6 bg-border" />

            {/* Wallet & Add Funds - Desktop */}
            {user && (
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                <WalletBalance balance={dbUser?.balance || 0} />
                <button
                  onClick={onOpenTopUp}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Funds</span>
                </button>
              </div>
            )}

            {/* Mobile: Add Funds Icon */}
            {user && (
              <button
                onClick={onOpenTopUp}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
              >
                <Wallet className="w-5 h-5 text-muted-foreground" />
              </button>
            )}

            {/* Profile - Desktop */}
            {user && (
              <div className="hidden sm:block flex-shrink-0">
                <ProfileDropdown onNavigateToProfile={onNavigateToProfile} />
              </div>
            )}

            {/* Mobile: User Avatar */}
            {user && (
              <button 
                onClick={onNavigateToProfile}
                className="sm:hidden w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              >
                {(user.displayName || 'U').charAt(0).toUpperCase()}
              </button>
            )}

            {!user && <UserAuthButton />}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - 5 Icons */}
      {user && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border pb-safe">
          <div className="flex items-center justify-around py-2">
            <BottomNavItem 
              icon={<Home className="w-5 h-5" />}
              label="Shop"
              active={currentView === 'shop'}
              onClick={() => onChangeView?.('shop')}
            />
            <BottomNavItem 
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Cart"
              badge={cartCount}
              active={currentView === 'cart'}
              onClick={() => onChangeView?.('cart')}
            />
            <BottomNavItem 
              icon={<Package className="w-5 h-5" />}
              label="Orders"
              active={currentView === 'orders'}
              onClick={() => onChangeView?.('orders')}
            />
            <BottomNavItem 
              icon={<User className="w-5 h-5" />}
              label="Profile"
              active={currentView === 'profile'}
              onClick={() => onChangeView?.('profile')}
            />
            <BottomNavItem 
              icon={<MoreHorizontal className="w-5 h-5" />}
              label="More"
              active={isMobileMenuOpen}
              onClick={onToggleMobileMenu}
            />
          </div>
        </nav>
      )}
    </>
  )
}

interface BottomNavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
  onClick: () => void
}

function BottomNavItem({ icon, label, active = false, badge = 0, onClick }: BottomNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 py-1 px-3 min-w-[60px] rounded-lg transition-colors ${
        active 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <span className="relative">
        {icon}
        {badge > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </span>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  )
}
