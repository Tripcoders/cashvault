'use client'

import React from 'react'
import { CATEGORIES, getIconComponent } from '@/lib/data'
import { useCartItemCount } from '@/stores/cart-store'
import { useUserStore } from '@/stores/user-store'
import {
  ShoppingBag,
  ShoppingCart,
  ClipboardList,
  Plus,
  MessageCircle,
  User,
  LogOut,
  LayoutDashboard,
  Vault,
} from 'lucide-react'

interface SidebarProps {
  activeCategory: string
  onSelectCategory: (id: string) => void
  currentView: string
  onChangeView: (view: string) => void
}

export function Sidebar({
  activeCategory,
  onSelectCategory,
  currentView,
  onChangeView,
}: SidebarProps) {
  const itemCount = useCartItemCount()
  const logout = useUserStore((state) => state.logout)

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col h-screen sticky top-0 transition-colors duration-300 animate-slide-in-left">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3 group cursor-pointer hover-lift">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-all duration-300">
            <Vault className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground leading-none group-hover:text-blue-600 transition-colors">
              CashVault
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar scrollbar-hide">
        {/* Main Menu */}
        <div className="mb-6 space-y-1 animate-fade-in-up">
          <button
            onClick={() => onChangeView('shop')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'shop'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Shop
          </button>

          <button
            onClick={() => onChangeView('cart')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'cart'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5" />
              Cart
            </div>
            {itemCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg shadow-blue-600/20 animate-pulse-glow">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onChangeView('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            My Orders
          </button>

          <button
            onClick={() => onChangeView('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>

          <button
            onClick={() => onChangeView('topup')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'topup'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <Plus className="w-5 h-5" />
            Add Funds
          </button>

          <button
            onClick={() => onChangeView('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
              currentView === 'support'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            Support
          </button>
        </div>

        <div className="h-px bg-border mb-4 animate-fade-in-up" />

        {/* Categories - Always Visible, Expand Upwards */}
        <div className="animate-fade-in-up flex-1">
          <p className="px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              All Products
            </button>

            {CATEGORIES.map((category, idx) => {
              const Icon = getIconComponent(category.iconName)
              const staggerClass = `stagger-${Math.min(idx + 1, 10)}`
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelectCategory(category.id)
                    setCurrentView('shop')
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all hover-lift group ${staggerClass} ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        activeCategory === category.id
                          ? 'text-white'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    />
                    {category.name}
                  </div>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      activeCategory === category.id
                        ? 'text-white'
                        : 'text-blue-500'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Logout - Fixed at Bottom */}
      <div className="p-4 border-t border-border flex-shrink-0 animate-fade-in-up">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover-lift"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
