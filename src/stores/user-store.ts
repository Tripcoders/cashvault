import { create } from 'zustand'


type UserTier = 'Basic' | 'Premium'

type User = {
  username: string
  email: string
  memberSince: string
  balance: number
  tier: UserTier
  avatar?: string
}

type UserStore = {
  user: User | null
  login: (username: string, email: string) => void
  logout: () => void
  updateBalance: (amount: number) => void
  addFunds: (amount: number) => void
  updateUsername: (username: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  login: (username: string, email: string) => { },

  logout: () => set({ user: null }),

  updateBalance: (amount: number) => { },

  addFunds: async (amount: number) => {
    try {
      const res = await fetch('/api/user/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      if (res.ok) {
        const updatedUser = await res.json()
        set({ user: updatedUser })
      } else {
        console.error("Topup failed", await res.text())
      }
    } catch (e) {
      console.error("Topup error", e)
    }
  },

  updateUsername: async (username: string) => {
    // Optimistic update
    set((state) => ({ user: state.user ? { ...state.user, username } : null }))

    // In a real app we would call an API here too to save the name
    // fetch('/api/user/update', ...)
  },

  syncUser: async () => {
    try {
      const res = await fetch('/api/user/sync', { method: 'POST' })
      if (res.ok) {
        const userData = await res.json()
        set({ user: userData })
      } else {
        console.error("Sync failed", res.status)
      }
    } catch (e) {
      console.error("Sync error", e)
    }
  }
}))
