'use client'

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Product } from '@/lib/data'
import { useCartStore } from '@/stores/cart-store'
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShoppingCart, Star, Clock, Trophy, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProductDetailModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
    const addItem = useCartStore((state) => state.addItem)
    const { toast } = useToast()

    if (!product) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-border rounded-2xl shadow-2xl">
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                    {/* Left: Image & Quick Stats */}
                    <div className="w-full md:w-[45%] bg-muted relative overflow-hidden flex flex-col">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 md:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6 space-y-4">
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-blue-600/90 text-white font-bold border-none">
                                    {product.grade || 'Standard'}
                                </Badge>
                                <div className="flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white text-xs font-bold border border-white/20">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    4.9 Rating
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Details & Purchase */}
                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col">
                        <DialogHeader className="mb-6">
                            <div className="flex items-center gap-2 mb-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" />
                                Verified Asset
                            </div>
                            <DialogTitle className="text-3xl font-bold tracking-tight mb-2">
                                {product.title}
                            </DialogTitle>
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </DialogHeader>

                        <div className="space-y-8 flex-1">
                            {/* Features List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/50 group hover:border-blue-500/30 transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Indicators */}
                            <div className="grid grid-cols-3 gap-4 border-y border-border py-6">
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
                                    <p className="text-sm font-bold">{product.stock} Units</p>
                                </div>
                            </div>

                            {/* Action Section */}
                            <div className="mt-auto space-y-4">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</p>
                                        <p className="text-4xl font-mono font-bold text-foreground">
                                            ${product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => {
                                            addItem(product)
                                            toast({
                                                title: "Added to Cart",
                                                description: `${product.title} has been added to your cart.`,
                                            })
                                            onClose()
                                        }}
                                        className="flex-1 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>
                                    <button
                                        className="flex-1 px-8 py-4 bg-muted text-foreground font-bold rounded-xl hover:bg-muted/80 border border-border/50 transition-all active:scale-95"
                                    >
                                        Contact Support
                                    </button>
                                </div>

                                <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-tighter">
                                    By purchasing, you agree to our Terms of Service & Privacy Policy
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
