import { create } from 'zustand'
import { Product } from '@/lib/data'

type CartItem = Product & {
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  
  addItem: (product) => set((state) => {
    const existing = state.items.find((item) => item.id === product.id)
    if (existing) {
      return {
        items: state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    }
    return { items: [...state.items, { ...product, quantity: 1 }] }
  }),
  
  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.id !== productId),
  })),
  
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    ),
  })),
  
  clearCart: () => set({ items: [] }),
}))

// Computed values helpers
export const useCartTotal = () => {
  return useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )
}

export const useCartItemCount = () => {
  return useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )
}
