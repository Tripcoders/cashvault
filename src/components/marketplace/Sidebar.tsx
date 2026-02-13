'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
  LayoutDashboard,
  PanelLeft,
  ChevronRight,
  AlertTriangle,
  Clock,
  X,
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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isWarningClosed, setIsWarningClosed] = useState(false)
  const itemCount = useCartItemCount()
  const user = useUser()
  const { user: dbUser } = useUserStore()

  const hasMadeDeposit = dbUser?.hasMadeDeposit || false
  const showWarning = user && !hasMadeDeposit && !isWarningClosed

  return (
    <aside 
      className={`${isCollapsed ? 'w-16' : 'w-64'} bg-background border-r border-border flex flex-col h-screen sticky top-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-50`}
    >
      {/* Logo & Toggle */}
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'} border-b border-border flex-shrink-0 transition-all duration-500`}>
        {/* Logo - Image + Text when expanded, "C" when collapsed */}
        {!isCollapsed ? (
          <div className="flex items-center gap-2 transition-all duration-500 animate-in fade-in slide-in-from-left-2">
            <div className="relative w-8 h-8">
              <Image
                src="/logo.png"
                alt="CashVault"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
            C
          </div>
        )}

        {/* Collapse Button - Only show when expanded */}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-2 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground hover:rotate-180"
            title="Collapse sidebar"
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* EXPAND BUTTON - Positioned under C logo when collapsed */}
      {isCollapsed && (
        <div className="px-2 py-3 border-b border-border flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 hover:bg-primary border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5 text-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none border border-border shadow-lg translate-x-[-10px] group-hover:translate-x-0">
              Expand
            </span>
          </button>
        </div>
      )}

      {/* Navigation - Scrollable */}
      <div className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? 'px-2' : 'px-3'} space-y-1 custom-scrollbar scrollbar-hide transition-all duration-500`}>
        {/* Main Menu */}
        <div className="mb-6 space-y-1">
          <NavButton
            icon={<ShoppingBag className="w-5 h-5" />}
            label="Shop"
            isCollapsed={isCollapsed}
            active={currentView === 'shop'}
            onClick={() => onChangeView('shop')}
          />

          <NavButton
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Cart"
            isCollapsed={isCollapsed}
            badge={itemCount}
            active={currentView === 'cart'}
            onClick={() => onChangeView('cart')}
          />

          <NavButton
            icon={<ClipboardList className="w-5 h-5" />}
            label="My Orders"
            isCollapsed={isCollapsed}
            active={currentView === 'orders'}
            onClick={() => onChangeView('orders')}
          />

          <NavButton
            icon={<UserIcon className="w-5 h-5" />}
            label="Profile"
            isCollapsed={isCollapsed}
            active={currentView === 'profile'}
            onClick={() => onChangeView('profile')}
          />

          <NavButton
            icon={<Plus className="w-5 h-5" />}
            label="Add Funds"
            isCollapsed={isCollapsed}
            active={currentView === 'topup'}
            onClick={() => onChangeView('topup')}
          />

          <NavButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Support"
            isCollapsed={isCollapsed}
            active={currentView === 'support'}
            onClick={() => onChangeView('support')}
          />
        </div>

        <div className="h-px bg-border mb-4 mx-2" />

        {/* Categories */}
        <div className="flex-1">
          {!isCollapsed && (
            <p className="px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in">
              Categories
            </p>
          )}
          <div className="space-y-1">
            <NavButton
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="All Products"
              isCollapsed={isCollapsed}
              active={activeCategory === 'all'}
              onClick={() => onSelectCategory('all')}
            />

            {CATEGORIES.map((category) => {
              const Icon = getIconComponent(category.iconName)
              return (
                <NavButton
                  key={category.id}
                  icon={<Icon className="w-5 h-5" />}
                  label={category.name}
                  isCollapsed={isCollapsed}
                  badge={!isCollapsed ? category.count : undefined}
                  active={activeCategory === category.id}
                  onClick={() => {
                    onSelectCategory(category.id)
                    onChangeView('shop')
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Account Warning Box - At Bottom - PURPLE THEME - CENTERED - CLOSABLE */}
      {showWarning && !isCollapsed && (
        <div className="p-4 border-t border-border flex-shrink-0 animate-in slide-in-from-bottom-2">
          <div className="p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/40 rounded-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setIsWarningClosed(true)}
              className="absolute top-2 right-2 p-1 rounded-lg hover:bg-purple-500/20 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Icon - Centered */}
            <div className="flex justify-center mb-3">
              <div className="p-2.5 bg-purple-500/30 rounded-full">
                <AlertTriangle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            
            {/* Title - Centered */}
            <p className="font-bold text-base text-center text-foreground mb-2">
              Top Up Required
            </p>
            
            {/* Message - Centered */}
            <p className="text-sm text-center text-muted-foreground leading-relaxed mb-3">
              Dormant accounts waste resources and will be <span className="text-purple-400 font-semibold">deleted after 4 days</span>.
            </p>
            
            {/* Clock note - Centered */}
            <div className="flex items-center justify-center gap-2 text-xs text-purple-400/80 mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>See countdown in header</span>
            </div>
            
            {/* Button - Full width */}
            <button
              onClick={() => onChangeView('topup')}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              Add Funds Now
            </button>
          </div>
        </div>
      )}

      {/* Collapsed: Warning Icon */}
      {showWarning && isCollapsed && (
        <div className="p-2 border-t border-border flex-shrink-0">
          <div className="w-10 h-10 mx-auto bg-purple-500/30 rounded-full flex items-center justify-center border border-purple-500/40 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      )}
    </aside>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  isCollapsed: boolean
  active?: boolean
  badge?: number
  onClick: () => void
}

function NavButton({ icon, label, isCollapsed, active = false, badge, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:scale-[1.02]'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      } ${isCollapsed ? 'hover:scale-110' : ''}`}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} transition-all duration-300`}>
        {icon}
        {!isCollapsed && <span className="animate-in fade-in slide-in-from-left-1 duration-300">{label}</span>}
      </div>
      {!isCollapsed && badge !== undefined && badge > 0 && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
          active ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
        }`}>
          {badge}
        </span>
      )}
    </button>
  )
}
