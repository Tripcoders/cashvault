import { create } from 'zustand'

type User = {
  id: string
  username: string
  email: string
  avatar?: string
  balance: number
  currency: string
  isBanned: boolean
  isEmailVerified: boolean
  lastLoginAt?: string
  lastActivityAt: string
  accountCreatedAt: string
  accountExpiresAt?: string
  hasMadeDeposit: boolean
  memberSince: string
  totalOrders?: number
  totalSpent?: number
}

type UserStore = {
  user: User | null
  isLoading: boolean
  login: (username: string, email: string) => void
  logout: () => void
  updateBalance: (amount: number) => void
  addFunds: (amount: number) => Promise<void>
  updateUsername: (username: string) => void
  syncUser: () => Promise<void>
  markDepositMade: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,

  login: (username: string, email: string) => {
    // This is handled by Stack Auth, we sync after login
  },

  logout: () => set({ user: null }),

  updateBalance: (amount: number) => {
    set((state) => ({
      user: state.user ? { ...state.user, balance: state.user.balance + amount } : null
    }))
  },

  addFunds: async (amount: number) => {
    try {
      const res = await fetch('/api/user/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      if (res.ok) {
        const updatedUser = await res.json()
        set({ user: { ...get().user, ...updatedUser, hasMadeDeposit: true } })
      } else {
        console.error("Topup failed", await res.text())
      }
    } catch (e) {
      console.error("Topup error", e)
    }
  },

  markDepositMade: () => {
    set((state) => ({
      user: state.user ? { ...state.user, hasMadeDeposit: true } : null
    }))
  },

  updateUsername: async (username: string) => {
    set((state) => ({ user: state.user ? { ...state.user, username } : null }))
  },

  syncUser: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch('/api/user/sync', { method: 'POST' })
      if (res.ok) {
        const userData = await res.json()
        set({ 
          user: {
            ...userData,
            memberSince: userData.accountCreatedAt 
              ? new Date(userData.accountCreatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
              : 'Recently',
            totalOrders: 0,
            totalSpent: 0,
          },
          isLoading: false 
        })
      } else {
        console.error("Sync failed", res.status)
        set({ isLoading: false })
      }
    } catch (e) {
      console.error("Sync error", e)
      set({ isLoading: false })
    }
  }
}))
