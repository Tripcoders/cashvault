import { create } from 'zustand'

type User = {
  username: string
  email: string
  memberSince: string
  balance: number
  avatar?: string
}

type UserStore = {
  user: User | null
  login: (username: string, email: string) => void
  logout: () => void
  updateBalance: (amount: number) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    username: 'CryptoKing99',
    email: 'king@crypto.vault',
    memberSince: 'Oct 2023',
    balance: 12450.0,
  },
  
  login: (username: string, email: string) => set({
    user: {
      username,
      email,
      memberSince: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      balance: 0.0,
    },
  }),
  
  logout: () => set({ user: null }),
  
  updateBalance: (amount: number) => set((state) => ({
    user: state.user ? { ...state.user, balance: state.user.balance + amount } : null,
  })),
}))
