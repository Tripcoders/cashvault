'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Product, PRODUCTS } from '@/lib/data'
import { useCartStore } from '@/stores/cart-store'
import { Badge } from "@/components/ui/badge"
import { 
    ShieldCheck, 
    ShoppingCart, 
    Clock, 
    Trophy, 
    CheckCircle2, 
    X, 
    MessageCircle,
    ChevronDown,
    Wallet,
    Building2,
    CreditCard,
    Package,
    ArrowUpDown
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { 
    getProductVariants, 
    hasMultipleVariants, 
    getVariantLabel, 
    getVariantSubtitle,
    getProductFamilyName 
} from '@/lib/product-variants'

interface ProductVariantModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

type SortOption = 'price-high-low' | 'price-low-high' | 'balance-high-low' | 'balance-low-high'

export function ProductVariantModal({ product, isOpen, onClose }: ProductVariantModalProps) {
    const addItem = useCartStore((state) => state.addItem)
    const { toast } = useToast()
    const [imageError, setImageError] = useState(false)
    const [showContactSupport, setShowContactSupport] = useState(false)
    const [showVariantSelector, setShowVariantSelector] = useState(false)
    const [sortOption, setSortOption] = useState<SortOption>('price-high-low')
    
    // Get all variants for this product
    const variants = useMemo(() => {
        if (!product) return []
        let vars = getProductVariants(product, PRODUCTS)
        
        // Sort variants based on selected option
        switch (sortOption) {
            case 'price-high-low':
                vars = [...vars].sort((a, b) => b.price - a.price)
                break
            case 'price-low-high':
                vars = [...vars].sort((a, b) => a.price - b.price)
                break
            case 'balance-high-low':
                vars = [...vars].sort((a, b) => {
                    const balanceA = parseInt(a.bankBalance?.replace(/[^0-9]/g, '') || '0')
                    const balanceB = parseInt(b.bankBalance?.replace(/[^0-9]/g, '') || '0')
                    return balanceB - balanceA
                })
                break
            case 'balance-low-high':
                vars = [...vars].sort((a, b) => {
                    const balanceA = parseInt(a.bankBalance?.replace(/[^0-9]/g, '') || '0')
                    const balanceB = parseInt(b.bankBalance?.replace(/[^0-9]/g, '') || '0')
                    return balanceA - balanceB
                })
                break
        }
        return vars
    }, [product, sortOption])
    
    // Selected variant (defaults to the clicked product)
    const [selectedVariant, setSelectedVariant] = useState<Product | null>(product)
    
    // Update selected variant when product changes
    React.useEffect(() => {
        setSelectedVariant(product)
        setShowVariantSelector(false)
        setImageError(false)
    }, [product])

    if (!product || !selectedVariant) return null

    const hasVariants = hasMultipleVariants(product, PRODUCTS)
    const familyName = getProductFamilyName(product)

    const handleAddToCart = () => {
        addItem(selectedVariant)
        toast({
            title: "Added to Cart",
            description: `${selectedVariant.title} has been added to your cart.`,
        })
        onClose()
    }

    const handleVariantSelect = (variant: Product) => {
        setSelectedVariant(variant)
        setShowVariantSelector(false)
    }

    // Get appropriate icon based on category
    const getCategoryIcon = () => {
        switch (product.category) {
            case 'bank-logs':
                return <Building2 className="w-5 h-5" />
            case 'cc-topup':
                return <CreditCard className="w-5 h-5" />
            case 'paypal':
                return <Wallet className="w-5 h-5" />
            default:
                return <Package className="w-5 h-5" />
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-0 overflow-hidden bg-card border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Single Column Layout */}
                <div className="flex flex-col">
                    {/* Header Image with Logo Fallback - NO TEXT, ONLY LOGO */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-blue-600/10 to-blue-900/10 flex items-center justify-center">
                        {/* Logo Only - No CashVault Text */}
                        <div className="relative w-32 h-32">
                            <Image
                                src="/logo.png"
                                alt="CashVault"
                                fill
                                className="object-contain opacity-80"
                            />
                        </div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Badge variant="secondary" className="bg-blue-600/90 text-white font-bold border-none">
                                {selectedVariant.grade || 'Standard'}
                            </Badge>
                            {hasVariants && (
                                <Badge variant="secondary" className="bg-amber-500/90 text-white font-bold border-none">
                                    {variants.length} Options
                                </Badge>
                            )}
                        </div>

                        {/* Close Button - ONLY ONE */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Verified Badge at Bottom */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" />
                                Verified Asset
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <h2 className="text-xl font-bold text-foreground tracking-tight">
                                {familyName}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                                {selectedVariant.description}
                            </p>
                        </div>

                        {/* Variant Selector - Only show if multiple variants exist */}
                        {hasVariants && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        {getCategoryIcon()}
                                        Select {product.category === 'bank-logs' ? 'Balance' : 'Option'}
                                    </h4>
                                    
                                    {/* Sort Dropdown */}
                                    <div className="relative">
                                        <select
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                                            className="appearance-none bg-muted border border-border rounded-lg px-3 py-1.5 pr-8 text-xs font-medium text-foreground focus:outline-none focus:border-primary cursor-pointer"
                                        >
                                            <option value="price-high-low">Price: High → Low</option>
                                            <option value="price-low-high">Price: Low → High</option>
                                            <option value="balance-high-low">Balance: High → Low</option>
                                            <option value="balance-low-high">Balance: Low → High</option>
                                        </select>
                                        <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                                    </div>
                                </div>

                                {/* Selected Variant Display */}
                                <button
                                    onClick={() => setShowVariantSelector(!showVariantSelector)}
                                    className="w-full p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500/30 rounded-xl text-left hover:border-blue-500 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground">
                                                {getVariantLabel(selectedVariant)}
                                            </p>
                                            <p className="text-sm text-muted-foreground mt-0.5">
                                                {getVariantSubtitle(selectedVariant)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-mono font-bold text-blue-600">
                                                ${selectedVariant.price.toLocaleString()}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showVariantSelector ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </button>

                                {/* Variant Options Dropdown */}
                                {showVariantSelector && (
                                    <div className="border border-border rounded-xl overflow-hidden divide-y divide-border animate-fade-in-up max-h-64 overflow-y-auto">
                                        {variants.map((variant) => (
                                            <button
                                                key={variant.id}
                                                onClick={() => handleVariantSelect(variant)}
                                                className={`w-full p-4 text-left hover:bg-muted transition-colors flex items-center justify-between ${
                                                    selectedVariant.id === variant.id ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {selectedVariant.id === variant.id && (
                                                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                                    )}
                                                    <div>
                                                        <p className={`font-medium ${selectedVariant.id === variant.id ? 'text-blue-600' : 'text-foreground'}`}>
                                                            {getVariantLabel(variant)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Stock: {variant.stock} units
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-mono font-bold text-foreground">
                                                    ${variant.price.toLocaleString()}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Features List */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">Features</h4>
                            <div className="space-y-2">
                                {selectedVariant.features?.slice(0, 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
                            <div className="text-center space-y-1">
                                <Clock className="w-5 h-5 text-blue-500 mx-auto" />
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Delivery</p>
                                <p className="text-sm font-bold">Instant</p>
                            </div>
                            <div className="text-center space-y-1 border-x border-border">
                                <Trophy className="w-5 h-5 text-blue-500 mx-auto" />
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Guarantee</p>
                                <p className="text-sm font-bold">24h Replace</p>
                            </div>
                            <div className="text-center space-y-1">
                                <ShoppingCart className="w-5 h-5 text-blue-500 mx-auto" />
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">Stock</p>
                                <p className="text-sm font-bold">{selectedVariant.stock} Units</p>
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="space-y-4">
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Price</p>
                                    <p className="text-3xl font-mono font-bold text-foreground">
                                        ${selectedVariant.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                
                                <button
                                    onClick={() => setShowContactSupport(true)}
                                    className="w-full px-6 py-3 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 border border-border/50 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Contact Support
                                </button>
                            </div>

                            <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-tighter">
                                By purchasing, you agree to our Terms of Service & Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Support Modal */}
                {showContactSupport && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm animate-scale-in-up">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-blue-500" />
                                    Contact Support
                                </h3>
                                <button
                                    onClick={() => setShowContactSupport(false)}
                                    className="p-1 hover:bg-muted rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-4">
                                Have questions about <span className="font-semibold text-foreground">{selectedVariant.title}</span>?
                            </p>

                            <div className="space-y-3">
                                <a
                                    href={`mailto:support@cashvault.com?subject=Question about ${encodeURIComponent(selectedVariant.title)}`}
                                    className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Email Support</p>
                                        <p className="text-xs text-muted-foreground">support@cashvault.com</p>
                                    </div>
                                </a>

                                <a
                                    href="tel:+18001234567"
                                    className="flex items-center gap-3 p-3 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                                        <Wallet className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Phone Support</p>
                                        <p className="text-xs text-muted-foreground">+1 (800) 123-4567</p>
                                    </div>
                                </a>
                            </div>

                            <button
                                onClick={() => setShowContactSupport(false)}
                                className="w-full mt-4 py-3 bg-muted text-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
