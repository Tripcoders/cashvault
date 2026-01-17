'use client'

import React from 'react'
import { ArrowUpRight, ShieldCheck, Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCartStore } from '@/stores/cart-store'
import { useToast } from '@/hooks/use-toast'

interface ProductCardProps {
  product: Product
  index?: number
  onClick?: () => void
}

export function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const staggerClass = `stagger-${Math.min(index + 1, 10)}`

  return (
    <div
      onClick={onClick}
      className={`group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover-lift flex flex-col h-full animate-face-in-up cursor-pointer ${staggerClass}`}
    >
      {/* Image Container */}
      <div className="aspect-[16/9] overflow-hidden bg-muted relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 animate-fade-in" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 animate-fade-in-up">
          {product.grade && (
            <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-lg">
              {product.grade}
            </span>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 animate-slide-in-right">
          <button className="p-2.5 bg-background/95 backdrop-blur-sm rounded-full shadow-lg text-foreground hover:text-blue-600 transition-all hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase animate-fade-in-up">
              {product.category.replace('-', ' ')}
            </p>
            <div className="flex items-center gap-1.5 text-amber-500 animate-fade-in-up stagger-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-muted-foreground">
                4.9
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-blue-600 transition-colors duration-300 animate-fade-in-up stagger-2">
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4 animate-fade-in-up stagger-3">
          {product.description}
        </p>

        {/* Features */}
        {product.features && (
          <div className="mb-4 space-y-2 animate-fade-in-up stagger-4">
            {product.features.slice(0, 2).map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                {feature}
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border animate-fade-in-up stagger-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium">Price</span>
            <span className="font-mono text-lg font-bold text-foreground">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              addItem(product)
              toast({
                title: "Added to Cart",
                description: `${product.title} has been added to your cart.`,
              })
            }}
            className="px-5 py-2.5 bg-foreground text-background dark:bg-blue-600 dark:text-white text-sm font-bold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2 hover-scale"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
