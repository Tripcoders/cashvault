'use client'

import React, { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MobileSidebar } from './MobileSidebar'
import { Header } from './Header'
import { ProductCard } from './ProductCard'
import { TopUpModal } from './TopUpModal'
import { AddFundsModal } from './AddFundsModal'
import { RecentSales } from './RecentSales'
import { CartView } from './CartView'
import { MyPurchasesView } from './MyPurchasesView'
import { ProfileView } from './ProfileView'
import { SupportView } from './SupportView'
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES, Product, BANNER_IMAGE } from '@/lib/data'
import { useUser } from "@stackframe/stack";
import { Search, ShieldCheck, Users, Clock, TrendingUp, ChevronRight, Wallet } from 'lucide-react'
import { ProductVariantModal } from './ProductVariantModal'
import { SettingsView } from './SettingsView'
import { SecurityView } from './SecurityView'
import { useUserStore } from '@/stores/user-store'

// Brand logos for hero section using Brandfetch API - transparent bg, rounded logos
const HERO_BRANDS = [
  { 
    name: 'Chase', 
    logo: 'https://cdn.brandfetch.io/chase.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Chase_logo_2007.svg/1200px-Chase_logo_2007.svg.png'
  },
  { 
    name: 'Wells Fargo', 
    logo: 'https://cdn.brandfetch.io/wellsfargo.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/1200px-Wells_Fargo_Bank.svg.png'
  },
  { 
    name: 'Amex', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png'
  },
  { 
    name: 'PayPal', 
    logo: 'https://cdn.brandfetch.io/paypal.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png'
  },
  { 
    name: 'CashApp', 
    logo: 'https://cdn.brandfetch.io/cash.app/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png'
  },
  { 
    name: 'Venmo', 
    logo: 'https://cdn.brandfetch.io/venmo.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Venmo_logo.svg/1200px-Venmo_logo.svg.png'
  },
  { 
    name: 'Zelle', 
    logo: 'https://cdn.brandfetch.io/zellepay.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Zelle_logo.svg/1200px-Zelle_logo.svg.png'
  },
  { 
    name: 'Bank of America', 
    logo: 'https://cdn.brandfetch.io/bankofamerica.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bank_of_America_logo.svg/1200px-Bank_of_America_logo.svg.png'
  },
  { 
    name: 'Citibank', 
    logo: 'https://cdn.brandfetch.io/citi.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Citi.svg/1200px-Citi.svg.png'
  },
  { 
    name: 'Capital One', 
    logo: 'https://cdn.brandfetch.io/capitalone.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Capital_One_logo.svg/1200px-Capital_One_logo.svg.png'
  },
  { 
    name: 'Wise', 
    logo: 'https://cdn.brandfetch.io/wise.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Wise_Logo_512x124.svg/1200px-Wise_Logo_512x124.svg.png'
  },
  { 
    name: 'Western Union', 
    logo: 'https://cdn.brandfetch.io/westernunion.com/fallback/transparent/theme/dark/h/128/w/128/icon',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Western_Union_logo.svg/1200px-Western_Union_logo.svg.png'
  },
]

export function Marketplace() {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false)
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentView, setCurrentView] = useState('shop')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const stackUser = useUser()

  const { user, syncUser } = useUserStore()

  useEffect(() => {
    if (stackUser) {
      syncUser()
    }
  }, [stackUser])

  useEffect(() => {
    setProducts(INITIAL_PRODUCTS)
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
      setIsAddFundsOpen(true)
    } else {
      setCurrentView(view)
    }
    setIsMobileMenuOpen(false)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <CartView onNavigateToShop={() => setCurrentView('shop')} />
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
            {/* Hero Section with Banner Image */}
            <div className="mb-6 sm:mb-10 relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-border">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-blue-900/80" />
              
              {/* Content */}
              <div className="relative z-10 p-4 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-4 max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-[10px] sm:text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                      Verified & Escrow Secured
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
                        Elite Financial Market
                      </h1>
                      <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-xl">
                        Premium cash out tools, bank logs, RATs, and financial instruments. Professional-grade resources for serious operators.
                      </p>
                    </div>

                    {/* Stats - Scrollable on Mobile */}
                    <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-hide">
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                        </div>
                        <div>
                          <span className="block font-bold text-white text-sm sm:text-base">12k+</span>
                          <span className="text-[10px] sm:text-xs text-white/60">Active Traders</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                        </div>
                        <div>
                          <span className="block font-bold text-white text-sm sm:text-base">Instant</span>
                          <span className="text-[10px] sm:text-xs text-white/60">Auto Delivery</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="p-1.5 sm:p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                        </div>
                        <div>
                          <span className="block font-bold text-white text-sm sm:text-base">$2.4M+</span>
                          <span className="text-[10px] sm:text-xs text-white/60">Volume</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Card - Hidden on Mobile */}
                  <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 min-w-[200px] sm:min-w-[260px]">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200" />
                      <p className="text-white/80 text-xs sm:text-sm font-medium">Total Cashed Out</p>
                    </div>
                    <p className="text-2xl sm:text-4xl font-mono font-bold text-white mb-3 sm:mb-4">
                      $2.4M+
                    </p>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-green-400 rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] sm:text-xs text-white/60">
                        <span>Success Rate</span>
                        <span>98.7%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Logo Circles with Brandfetch API */}
                <div className="mt-6 sm:mt-8">
                  <p className="text-white/50 text-xs sm:text-sm mb-3 uppercase tracking-wider font-medium">Supported Platforms & Tools</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {HERO_BRANDS.map((brand, idx) => (
                      <BrandLogoCircle
                        key={brand.name}
                        brand={brand}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Category Pills */}
            <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  All
                </button>
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setCurrentView('shop')
                    }}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground flex items-center gap-1"
                >
                  More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  {activeCategory === 'all'
                    ? 'All Products'
                    : CATEGORIES.find((c) => c.id === activeCategory)?.name}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {filteredProducts.length} items available
                </p>
              </div>
              
              {/* Desktop Search */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-64 bg-muted border border-border rounded-xl text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-24 lg:pb-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeCategory={activeCategory}
          onSelectCategory={(id) => {
            setActiveCategory(id)
            setCurrentView('shop')
          }}
          currentView={currentView}
          onChangeView={handleViewChange}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currentView={currentView}
        onChangeView={handleViewChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          onOpenTopUp={() => setIsAddFundsOpen(true)}
          onNavigateToProfile={() => setCurrentView('profile')}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          currentView={currentView}
          onChangeView={setCurrentView}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
      <AddFundsModal isOpen={isAddFundsOpen} onClose={() => setIsAddFundsOpen(false)} />
      <ProductVariantModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <RecentSales />
    </div>
  )
}

// Brand Logo Circle Component - Transparent background, rounded logos
interface BrandLogoCircleProps {
  brand: {
    name: string
    logo: string
    fallback: string
  }
  index: number
}

function BrandLogoCircle({ brand, index }: BrandLogoCircleProps) {
  const [imgSrc, setImgSrc] = useState(brand.logo)
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
      title={brand.name}
    >
      {/* Logo with rounded style and transparent background */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl p-2">
        <img
          src={imgSrc}
          alt={brand.name}
          className="w-full h-full object-contain rounded-xl"
          onError={() => {
            if (!hasError) {
              setImgSrc(brand.fallback)
              setHasError(true)
            }
          }}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none z-20">
        {brand.name}
      </div>
    </div>
  )
}
