'use client'

import React from 'react'
import { ShoppingCart, Eye, Building2, CreditCard, Wallet, Bot, Shield, Server, Globe, ArrowLeftRight } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCartStore } from '@/stores/cart-store'
import { useToast } from '@/hooks/use-toast'
import { getBrandColors, getLogoUrl } from '@/lib/product-images'

interface ProductCardProps {
  product: Product
  index: number
  onClick: () => void
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    toast({
      title: 'Added to Cart',
      description: `${product.title} has been added to your cart`,
    })
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bank-logs': return Building2
      case 'cc-topup': return CreditCard
      case 'paypal': return Wallet
      case 'otp-bot': return Bot
      case 'rat': return Shield
      case 'rdp': return Server
      case 'office-365': return Globe
      case 'cash-out': return ArrowLeftRight
      default: return ShoppingCart
    }
  }

  const Icon = getCategoryIcon(product.category)
  
  // Get brand-specific colors
  const colors = getBrandColors(product)
  
  // Get logo URL
  const logoUrl = getLogoUrl(product)

  // Get grade color
  const getGradeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'premium':
      case 'ultimate':
      case 'elite':
        return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
      case 'high':
      case 'advanced':
        return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
      case 'medium':
      case 'standard':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    }
  }

  const isLowStock = product.stock <= 3
  const isOutOfStock = product.stock === 0

  return (
    <div
      className="group relative bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer active:scale-[0.98] sm:active:scale-100"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* Image Container with Brand-Colored Background */}
      <div 
        className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden flex items-center justify-center"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)` 
        }}
      >
        {/* Gradient Overlay - Behind Quick View */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        
        {/* Category Badge */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full z-20">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            <span className="text-[10px] sm:text-xs font-semibold text-white capitalize">
              {product.category.replace(/-/g, ' ')}
            </span>
          </div>
        </div>

        {/* Grade Badge */}
        {product.grade && (
          <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold z-20 ${getGradeColor(product.grade)}`}>
            {product.grade}
          </div>
        )}

        {/* Stock Badge */}
        <div className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium z-20 ${
          isOutOfStock 
            ? 'bg-red-500/80 text-white' 
            : isLowStock 
              ? 'bg-amber-500/80 text-white'
              : 'bg-green-500/80 text-white'
        }`}>
          {isOutOfStock ? 'Out of Stock' : isLowStock ? `${product.stock} left` : `${product.stock} in stock`}
        </div>

        {/* Circular Logo Display - Behind Quick View */}
        <div className="relative z-10 flex items-center justify-center">
          {logoUrl ? (
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                borderRadius: '9999px'
              }}
            >
              <img
                src={logoUrl}
                alt={product.title}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
                style={{ borderRadius: '9999px' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          ) : (
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '9999px'
              }}
            >
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          )}
        </div>

        {/* Quick View Overlay - ON TOP of everything (z-30) */}
        <div className="hidden sm:flex absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center z-30">
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 space-y-2 sm:space-y-4">
        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description - Desktop Only */}
        <p className="hidden sm:block text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Product Specific Details */}
        <div className="space-y-1.5 sm:space-y-2">
          {product.category === 'bank-logs' && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: colors.primary }} />
              <span className="text-xs sm:text-sm text-muted-foreground truncate">
                {product.bankName} • {product.bankBalance}
              </span>
            </div>
          )}

          {product.category === 'cc-topup' && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
              <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: colors.primary }} />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {product.cardType}
              </span>
            </div>
          )}

          {product.category === 'paypal' && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
              <Wallet className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: colors.primary }} />
              <span className="text-xs sm:text-sm text-muted-foreground">
                Balance: {product.paypalBalance}
              </span>
            </div>
          )}

          {product.category === 'otp-bot' && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: colors.primary }} />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {product.otpProvider}
              </span>
            </div>
          )}

          {product.category === 'rat' && (
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-muted rounded-lg">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: colors.primary }} />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {product.ratType}
              </span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Price</span>
            <span className="text-base sm:text-xl font-bold text-foreground font-mono">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              isOutOfStock
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{isOutOfStock ? 'Unavailable' : 'Add'}</span>
            <span className="sm:hidden">{isOutOfStock ? 'N/A' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
