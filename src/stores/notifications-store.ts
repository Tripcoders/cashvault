import { create } from 'zustand'

export type NotificationType = 'system' | 'order' | 'deposit' | 'support' | 'security'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

type NotificationsStore = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [
    {
      id: '1',
      type: 'system',
      title: 'Welcome to CashVault',
      message: 'Your account has been created successfully. Make your first deposit to start shopping!',
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/handler/wallet'
    },
    {
      id: '2',
      type: 'security',
      title: 'Security Reminder',
      message: 'Enable two-factor authentication to secure your account.',
      read: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      actionUrl: '/handler/settings'
    }
  ],
  unreadCount: 2,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      read: false,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }))
  },

  markAsRead: (id) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === id)
      if (notification && !notification.read) {
        return {
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }
      }
      return state
    })
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0
    }))
  },

  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === id)
      return {
        notifications: state.notifications.filter(n => n.id !== id),
        unreadCount: notification && !notification.read 
          ? Math.max(0, state.unreadCount - 1) 
          : state.unreadCount
      }
    })
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 })
  }
}))
