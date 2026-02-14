'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { Product } from '@/lib/data'
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
    Wallet,
    Building2,
    CreditCard,
    Package
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProductDetailModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const addItem = useCartStore((state) => state.addItem)
    const { toast } = useToast()
    const [showContactSupport, setShowContactSupport] = useState(false)

    if (!product) return null

    const handleAddToCart = () => {
        addItem(product)
        toast({
            title: "Added to Cart",
            description: `${product.title} has been added to your cart.`,
        })
        onClose()
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

    // Extract bank name from title for display
    const getDisplayTitle = () => {
        if (product.category === 'bank-logs' && product.bankName) {
            return product.bankName
        }
        return product.title
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-0 overflow-hidden bg-card border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header with Logo Background */}
                <div className="relative w-full h-40 bg-gradient-to-br from-blue-600/10 to-blue-900/10 flex items-center justify-center">
                    {/* Logo */}
                    <div className="relative w-28 h-28">
                        <Image
                            src="/logo.png"
                            alt="CashVault"
                            fill
                            className="object-contain opacity-70"
                        />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-blue-600/90 text-white font-bold border-none">
                            {product.grade || 'Standard'}
                        </Badge>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors z-10"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Verified Badge */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                            <ShieldCheck className="w-4 h-4" />
                            Verified Asset
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    {/* Title & Category */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                            {getCategoryIcon()}
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {product.category.replace(/-/g, ' ')}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-foreground tracking-tight">
                            {getDisplayTitle()}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Details Card */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                        {product.bankBalance && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Balance</span>
                                <span className="text-lg font-bold text-foreground">{product.bankBalance}</span>
                            </div>
                        )}
                        {product.cardType && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Card Type</span>
                                <span className="text-sm font-bold text-foreground">{product.cardType}</span>
                            </div>
                        )}
                        {product.paypalBalance && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">PayPal Balance</span>
                                <span className="text-lg font-bold text-foreground">{product.paypalBalance}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">Stock Available</span>
                            <span className="text-sm font-bold text-green-500">{product.stock} units</span>
                        </div>
                    </div>

                    {/* Features List */}
                    {product.features && product.features.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-foreground">Features</h4>
                            <div className="space-y-2">
                                {product.features.slice(0, 5).map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

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
                            <p className="text-sm font-bold">{product.stock}</p>
                        </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="space-y-4">
                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</p>
                                <p className="text-3xl font-mono font-bold text-foreground">
                                    ${product.price.toLocaleString()}
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
                                Have questions about <span className="font-semibold text-foreground">{product.title}</span>?
                            </p>

                            <div className="space-y-3">
                                <a
                                    href={`mailto:support@cashvault.com?subject=Question about ${encodeURIComponent(product.title)}`}
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
