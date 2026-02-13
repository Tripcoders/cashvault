'use client'

import React from 'react'
import Image from 'next/image'
import { X, ShoppingBag, ShoppingCart, ClipboardList, Plus, MessageCircle, User, LogOut, LayoutDashboard, Home, Package } from 'lucide-react'
import { CATEGORIES, getIconComponent } from '@/lib/data'
import { useUser } from "@stackframe/stack";
import { useUserStore } from '@/stores/user-store'
import { useCartItemCount } from '@/stores/cart-store'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeCategory: string
  onSelectCategory: (id: string) => void
  currentView: string
  onChangeView: (view: string) => void
}

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Get color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-emerald-500', 
    'bg-amber-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-cyan-500',
    'bg-indigo-500'
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

export function MobileSidebar({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  currentView,
  onChangeView,
}: MobileSidebarProps) {
  const user = useUser()
  const { user: dbUser } = useUserStore()
  const itemCount = useCartItemCount()

  if (!isOpen) return null

  const displayName = user?.displayName || user?.primaryEmail?.split('@')[0] || 'User'
  const initials = getInitials(displayName)
  const avatarColor = getAvatarColor(displayName)

  const handleViewChange = (view: string) => {
    onChangeView(view)
    onClose()
  }

  const handleCategorySelect = (id: string) => {
    onSelectCategory(id)
    onChangeView('shop')
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar Drawer */}
      <aside className="fixed inset-y-0 left-0 w-[280px] bg-background border-r border-border z-50 lg:hidden flex flex-col animate-slide-in-left">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="CashVault"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-lg text-foreground">CashVault</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-lg border-2 border-border`}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.primaryEmail}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between p-3 bg-muted rounded-xl">
              <span className="text-sm text-muted-foreground">Balance</span>
              <span className="font-mono font-bold text-foreground">
                ${(dbUser?.balance || 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Navigation - Scrollable with proper padding for footer */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 pb-24">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Main Menu
            </p>
            
            <NavButton
              icon={<Home className="w-5 h-5" />}
              label="Shop"
              active={currentView === 'shop'}
              onClick={() => handleViewChange('shop')}
            />
            
            <NavButton
              icon={<ShoppingCart className="w-5 h-5" />}
              label="Cart"
              badge={itemCount}
              active={currentView === 'cart'}
              onClick={() => handleViewChange('cart')}
            />
            
            <NavButton
              icon={<Package className="w-5 h-5" />}
              label="My Orders"
              active={currentView === 'orders'}
              onClick={() => handleViewChange('orders')}
            />
            
            <NavButton
              icon={<User className="w-5 h-5" />}
              label="Profile"
              active={currentView === 'profile'}
              onClick={() => handleViewChange('profile')}
            />
            
            <NavButton
              icon={<Plus className="w-5 h-5" />}
              label="Add Funds"
              active={currentView === 'topup'}
              onClick={() => handleViewChange('topup')}
            />
            
            <NavButton
              icon={<MessageCircle className="w-5 h-5" />}
              label="Support"
              active={currentView === 'support'}
              onClick={() => handleViewChange('support')}
            />
          </div>

          {/* Categories */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Categories
            </p>
            
            <NavButton
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="All Products"
              active={activeCategory === 'all'}
              onClick={() => handleCategorySelect('all')}
            />
            
            {CATEGORIES.map((category) => {
              const Icon = getIconComponent(category.iconName)
              return (
                <NavButton
                  key={category.id}
                  icon={<Icon className="w-5 h-5" />}
                  label={category.name}
                  badge={category.count}
                  active={activeCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              )
            })}
          </div>
        </div>

        {/* Footer - Logout - Fixed at bottom */}
        {user && (
          <div className="p-4 border-t border-border bg-background flex-shrink-0">
            <button
              onClick={() => user.signOut()}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: number
  onClick: () => void
}

function NavButton({ icon, label, active = false, badge = 0, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="whitespace-nowrap">{label}</span>
      </div>
      {badge > 0 && (
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
          active 
            ? 'bg-white/20 text-white' 
            : 'bg-primary/10 text-primary'
        }`}>
          {badge}
        </span>
      )}
    </button>
  )
}
