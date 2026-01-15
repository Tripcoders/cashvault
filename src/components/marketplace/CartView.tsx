'use client'

import React from 'react'
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck, CreditCard, Package } from 'lucide-react'
import { useCartStore } from '@/stores/cart-store'

export function CartView() {
  const { items, removeItem, clearCart, total, itemCount } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-24 h-24 bg-muted dark:bg-muted/50 rounded-full flex items-center justify-center mb-8 animate-fade-in-up">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3 animate-fade-in-up stagger-1">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground max-w-md mb-8 animate-fade-in-up stagger-2">
          Looks like you haven't added any items yet. Browse our marketplace to
          find premium digital assets.
        </p>
        <button 
          onClick={() => (window as any).router?.push?.('/')}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300 hover-lift animate-fade-in-up stagger-3"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground tracking-tight mb-8 animate-fade-in-up">
        Shopping Cart
        <span className="text-muted-foreground text-lg font-normal ml-3">
          ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-up stagger-1">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-4 flex gap-4 items-center hover-lift hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 animate-face-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.category.replace('-', ' ')}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded font-bold`}>
                    {item.grade || 'Standard'}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-xs text-muted-foreground">
                      x{item.quantity}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-mono font-bold text-lg text-foreground mb-2">
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-red-500 hover:text-red-600 mt-1 flex items-center justify-end gap-1 hover:scale-105 transition-all"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1 animate-fade-in-up stagger-2">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-lg hover-lift">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-foreground">
                  ${total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Processing Fee</span>
                <span className="font-mono font-medium text-green-600">
                  Free
                </span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="font-mono font-bold text-blue-600">
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 hover-lift-strong">
              Checkout Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-900/20">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure Encrypted Transaction</span>
            </div>

            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded-lg transition-all"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
