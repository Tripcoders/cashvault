'use client'

import React, { useState } from 'react'
import { CATEGORIES, getIconComponent } from '@/lib/data'
import { useCartItemCount } from '@/stores/cart-store'
import { useUser } from "@stackframe/stack";
import { useUserStore } from '@/stores/user-store'
import {
  ShoppingBag,
  ShoppingCart,
  ClipboardList,
  Plus,
  MessageCircle,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  ChevronRight,
  ChevronDown,
  Settings,
  CreditCard,
  Shield,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const itemCount = useCartItemCount()
  const user = useUser()
  const { user: dbUser } = useUserStore()

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-background border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out animate-slide-in-left z-50`}>
      {/* Logo & Toggle */}
      <div className={`h-20 flex items-center gap-4 px-6 border-b border-border flex-shrink-0 ${isCollapsed ? 'justify-center px-0' : ''}`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {!isCollapsed && (
          <div className="flex items-center gap-3 group cursor-pointer hover-lift overflow-hidden">
            <img
              src="/logo.png"
              alt="CashVault"
              className="h-12 w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation - Scrollable */}
      <div className={`flex-1 overflow-y-auto py-6 ${isCollapsed ? 'px-2' : 'px-4'} space-y-1 custom-scrollbar scrollbar-hide`}>
        {/* Main Menu */}
        <div className="mb-6 space-y-1 animate-fade-in-up">
          <button
            onClick={() => onChangeView('shop')}
            title={isCollapsed ? 'Shop' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'shop'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <ShoppingBag className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Shop</span>}
          </button>

          <button
            onClick={() => onChangeView('cart')}
            title={isCollapsed ? 'Cart' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'cart'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <ShoppingCart className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Cart</span>}
            </div>
            {!isCollapsed && itemCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg shadow-blue-600/20 animate-pulse-glow">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onChangeView('orders')}
            title={isCollapsed ? 'My Orders' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'orders'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <ClipboardList className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>My Orders</span>}
          </button>

          <button
            onClick={() => onChangeView('profile')}
            title={isCollapsed ? 'Profile' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <UserIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Profile</span>}
          </button>

          <button
            onClick={() => onChangeView('topup')}
            title={isCollapsed ? 'Add Funds' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'topup'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Add Funds</span>}
          </button>

          <button
            onClick={() => onChangeView('support')}
            title={isCollapsed ? 'Support' : ''}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${currentView === 'support'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Support</span>}
          </button>
        </div>

        <div className="h-px bg-border mb-4 animate-fade-in-up" />

        {/* Categories - Always Visible, Expand Upwards */}
        <div className="animate-fade-in-up flex-1">
          {!isCollapsed && (
            <p className="px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              Categories
            </p>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectCategory('all')}
              title={isCollapsed ? 'All Products' : ''}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift ${activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>All Products</span>}
            </button>

            {CATEGORIES.map((category, idx) => {
              const Icon = getIconComponent(category.iconName)
              const staggerClass = `stagger-${Math.min(idx + 1, 10)}`
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelectCategory(category.id)
                    onChangeView('shop')
                  }}
                  title={isCollapsed ? category.name : ''}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'} py-3 rounded-full text-sm font-medium transition-all hover-lift group ${staggerClass} ${activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${activeCategory === category.id
                        ? 'text-white'
                        : 'text-muted-foreground group-hover:text-foreground'
                        }`}
                    />
                    {!isCollapsed && <span>{category.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <span
                      className={`text-xs font-bold transition-colors ${activeCategory === category.id
                        ? 'text-white'
                        : 'text-blue-500'
                        }`}
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Profile Section - Fixed at Bottom */}
      <div className={`p-4 border-t border-border flex-shrink-0 animate-fade-in-up bg-background`}>
        <Popover>
          <PopoverTrigger asChild>
            <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 p-2'} rounded-full transition-all hover:bg-muted group`}>
              <Avatar className="w-10 h-10 border border-border shadow-sm group-hover:border-blue-500/50 transition-colors">
                <AvatarImage src={user?.profileImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'user'}`} />
                <AvatarFallback className="bg-blue-600 text-white">{user?.displayName?.[0] || 'U'}</AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${dbUser?.tier === 'Premium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                      {dbUser?.tier || 'Basic'} Tier
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent side={isCollapsed ? "right" : "bottom"} align={isCollapsed ? "center" : "end"} className="w-72 p-0 overflow-hidden rounded-2xl border-border shadow-2xl bg-card">
            <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-white/20">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback className="bg-white/10">{user?.displayName?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">{user?.displayName}</h3>
                  <p className="text-sm text-blue-100/80 truncate mb-2">{user?.primaryEmail}</p>
                  <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider">
                    {dbUser?.tier || 'Basic'} Member
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-full p-3">
                  <p className="text-[10px] text-blue-100/60 font-bold uppercase">Balance</p>
                  <p className="text-sm font-mono font-bold">${(dbUser?.balance || 0).toLocaleString()}</p>
                </div>
                <div className="bg-white/10 rounded-full p-3">
                  <p className="text-[10px] text-blue-100/60 font-bold uppercase">Orders</p>
                  <p className="text-sm font-bold">0 Total</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => onChangeView('settings')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-all"
              >
                <Settings className="w-4 h-4 text-blue-500" />
                Account Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-all">
                <CreditCard className="w-4 h-4 text-blue-500" />
                Billing Details
              </button>
              <button
                onClick={() => onChangeView('security')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-all"
              >
                <Shield className="w-4 h-4 text-blue-500" />
                Security
              </button>
              <div className="h-px bg-border my-2 mx-2" />
              <button
                onClick={() => user?.signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  )
}
