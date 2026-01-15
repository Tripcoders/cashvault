'use client'

import React from 'react'
import { Download, FileText, Calendar, Package, ExternalLink, RefreshCw } from 'lucide-react'

// Mock purchases data
const PURCHASES = [
  {
    id: 'ord-123',
    date: 'Oct 24, 2023',
    item: 'Chase Bank - High Balance',
    price: 1200,
    status: 'Completed',
    files: ['log_details.txt', 'cookies.json', 'guide.pdf'],
  },
  {
    id: 'ord-124',
    date: 'Oct 20, 2023',
    item: 'Office 365 Leads (100x)',
    price: 350,
    status: 'Completed',
    files: ['leads_list.csv'],
  },
  {
    id: 'ord-125',
    date: 'Oct 15, 2023',
    item: 'Standard Cashout Guide',
    price: 45,
    status: 'Completed',
    files: ['cashout_method.pdf', 'bonus_bins.txt'],
  },
]

export function MyPurchasesView() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            My Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            View and download your purchased assets
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all hover-lift">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="space-y-6">
        {PURCHASES.map((order, idx) => (
          <div
            key={order.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/20 transition-all duration-300 animate-face-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Order Header */}
            <div className="bg-muted/50 dark:bg-muted/30 px-6 py-4 border-b border-border flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Order Placed
                  </p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Total
                  </p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    ${order.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Order ID
                  </p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    #{order.id}
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase tracking-wide shadow-sm">
                {order.status}
              </div>
            </div>

            {/* Order Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {order.item}
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Downloads ({order.files.length})
                </p>
                {order.files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/30 border border-border rounded-lg group hover:border-blue-500/30 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 transition-all hover-lift"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {file}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all hover:scale-110">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all hover:scale-110" title="Open in new tab">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
