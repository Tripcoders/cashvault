'use client'

import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { ProductCard } from './ProductCard'
import { TopUpModal } from './TopUpModal'
import { WalletBalance } from './WalletBalance'
import { ThemeToggle } from './ThemeToggle'
import { RecentSales } from './RecentSales'
import { CartView } from './CartView'
import { MyPurchasesView } from './MyPurchasesView'
import { ProfileView } from './ProfileView'
import { SupportView } from './SupportView'
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, Product } from '@/lib/data'
import { useUser } from "@stackframe/stack";
import { Search, Bell, ShieldCheck, Users, Clock, TrendingUp } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductDetailModal } from './ProductDetailModal'
import { SettingsView } from './SettingsView'
import { SecurityView } from './SecurityView'
import { useUserStore } from '@/stores/user-store'

export function Marketplace() {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentView, setCurrentView] = useState('shop')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const stackUser = useUser()

  const { user, syncUser } = useUserStore()

  useEffect(() => {
    // Sync user with DB
    if (stackUser) {
      syncUser()
    }
  }, [stackUser])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          // Default to initial products if DB is empty or fails, but DB should have data now
          setProducts(data.length > 0 ? data : INITIAL_PRODUCTS)
        }
      } catch (e) {
        setProducts(INITIAL_PRODUCTS)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleViewChange = (view: string) => {
    if (view === 'topup') {
      setIsTopUpOpen(true)
    } else {
      setCurrentView(view)
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <CartView />
      case 'orders':
        return <MyPurchasesView />
      case 'profile':
        return <ProfileView />
      case 'support':
        return <SupportView />
      case 'settings':
        return <SettingsView />
      case 'security':
        return <SecurityView />
      default:
        return (
          <>
            {/* Hero / Trust Section */}
            <div className="mb-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl border border-border animate-face-in-up">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-float" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '1s' }} />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-6 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wide animate-fade-in-up hover-glow">
                    <ShieldCheck className="w-4 h-4 animate-pulse-glow" />
                    Verified & Escrow Secured
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight animate-fade-in-up stagger-1">
                    Premium Digital Assets Marketplace
                  </h1>
                  <p className="text-white/80 text-lg max-w-xl animate-fade-in-up stagger-2">
                    Access high-quality digital assets. Instant
                    delivery with 24/7 support and replacement guarantee.
                  </p>
                  <div className="flex items-center gap-8 pt-2 animate-fade-in-up stagger-3">
                    <div className="flex items-center gap-3 text-sm text-white/80 font-medium hover-lift">
                      <div className="p-2 bg-white/10 rounded-full">
                        <Users className="w-5 h-5 text-blue-200" />
                      </div>
                      <div>
                        <span className="block font-bold">12k+</span>
                        <span className="text-xs text-white/60">Users</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/80 font-medium hover-lift">
                      <div className="p-2 bg-white/10 rounded-full">
                        <Clock className="w-5 h-5 text-blue-200" />
                      </div>
                      <div>
                        <span className="block font-bold">Instant</span>
                        <span className="text-xs text-white/60">Delivery</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/80 font-medium hover-lift">
                      <div className="p-2 bg-white/10 rounded-full">
                        <TrendingUp className="w-5 h-5 text-blue-200" />
                      </div>
                      <div>
                        <span className="block font-bold">99.9%</span>
                        <span className="text-xs text-white/60">Uptime</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[260px] animate-scale-in-up stagger-4 hover-lift-strong glass-strong">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-200 animate-bounce-subtle" />
                    <p className="text-white/80 text-sm font-medium">
                      Total Volume
                    </p>
                  </div>
                  <p className="text-4xl font-mono font-bold text-white mb-4">
                    $2.4M+
                  </p>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-400 rounded-full animate-pulse-glow" />
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Volume</span>
                      <span>+24% this month</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Updated live
                  </p>
                </div>
              </div>
            </div>

            {/* Page Header */}
            <div className="flex items-end justify-between gap-6 mb-8 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">
                  {activeCategory === 'all'
                    ? 'Featured Products'
                    : CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </h2>
                <p className="text-muted-foreground mt-2 font-medium">
                  Showing {filteredProducts.length} available items
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onClick={() => setSelectedProduct(product)} // Added onClick
                />
              ))}
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 font-sans selection:bg-blue-500/20 selection:text-blue-900 flex transition-colors duration-300">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={(id) => {
          setActiveCategory(id)
          setCurrentView('shop')
        }}
        currentView={currentView}
        onChangeView={handleViewChange}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl animate-slide-down">
          <div className="px-8 h-20 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl animate-fade-in-left">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <input
                  type="text"
                  placeholder="Search products, logs, leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-transparent hover:border-blue-500 focus:border-blue-500 focus:bg-background rounded-full text-sm transition-all outline-none text-foreground placeholder:text-muted-foreground hover:shadow-lg focus:shadow-xl"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-4 animate-fade-in-right">
              <ThemeToggle />

              <div className="h-6 w-px bg-border mx-1" />

              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all relative hover-lift">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse-glow" />
              </button>

              <div className="flex items-center gap-3 pl-2">
                <WalletBalance balance={user?.balance || 0} />
                <button
                  onClick={() => setIsTopUpOpen(true)}
                  className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 transition-all duration-300 hover-lift-strong"
                >
                  Top Up
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">{renderContent()}</main>
      </div>

      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <RecentSales />
    </div>
  )
}
