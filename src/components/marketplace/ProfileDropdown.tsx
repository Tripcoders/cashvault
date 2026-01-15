'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useUserStore } from '@/stores/user-store'
import { User, Settings, ChevronDown } from 'lucide-react'

interface ProfileDropdownProps {
  onNavigateToProfile: () => void
}

export function ProfileDropdown({ onNavigateToProfile }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-border bg-background">
          <img
            src={avatarUrl}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-foreground leading-none">
            {user.username}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Premium Member
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-slide-in-right">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              {user.username}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user.email}
            </p>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                onNavigateToProfile()
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              My Profile
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
