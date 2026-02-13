'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@stackframe/stack'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  ShoppingBag, 
  Wallet, 
  Ticket, 
  TrendingUp, 
  DollarSign,
  Activity,
  Search,
  Filter,
  MoreHorizontal,
  Ban,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

type TabType = 'overview' | 'users' | 'orders' | 'transactions' | 'tickets'

interface Stats {
  overview: {
    totalUsers: number
    newUsersToday: number
    totalOrders: number
    ordersToday: number
    totalRevenue: number
    revenueToday: number
    pendingDeposits: number
    openTickets: number
  }
  usersByRole: Record<string, number>
  recentTransactions: any[]
  topProducts: any[]
}

export default function AdminDashboard() {
  const user = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Data states
  const [users, setUsers] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    checkAdmin()
  }, [user])

  useEffect(() => {
    if (isAdmin) {
      fetchStats()
    }
  }, [isAdmin])

  useEffect(() => {
    if (isAdmin) {
      fetchTabData()
    }
  }, [activeTab, currentPage])

  const checkAdmin = async () => {
    if (!user) return
    
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        setIsAdmin(true)
      } else {
        router.push('/')
      }
    } catch (error) {
      router.push('/')
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTabData = async () => {
    setLoading(true)
    try {
      let endpoint = ''
      switch (activeTab) {
        case 'users':
          endpoint = `/api/admin/users?page=${currentPage}&limit=20`
          break
        case 'orders':
          endpoint = `/api/admin/orders?page=${currentPage}&limit=20`
          break
        case 'transactions':
          endpoint = `/api/admin/transactions?page=${currentPage}&limit=20`
          break
        case 'tickets':
          endpoint = `/api/admin/tickets?page=${currentPage}&limit=20`
          break
        default:
          setLoading(false)
          return
      }

      const res = await fetch(endpoint)
      if (res.ok) {
        const data = await res.json()
        switch (activeTab) {
          case 'users':
            setUsers(data.users)
            setTotalPages(data.pagination.totalPages)
            break
          case 'orders':
            setOrders(data.orders)
            setTotalPages(data.pagination.totalPages)
            break
          case 'transactions':
            setTransactions(data.transactions)
            setTotalPages(data.pagination.totalPages)
            break
          case 'tickets':
            setTickets(data.tickets)
            setTotalPages(data.pagination.totalPages)
            break
        }
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const handleBanUser = async (userId: string, isBanned: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBanned: !isBanned })
      })
      if (res.ok) {
        fetchTabData()
      }
    } catch (error) {
      console.error('Error banning user:', error)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        fetchTabData()
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const handleUpdateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        fetchTabData()
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage your marketplace</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchStats}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600 font-medium">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'transactions', label: 'Transactions', icon: Wallet },
            { id: 'tickets', label: 'Support Tickets', icon: Ticket },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as TabType)
                setCurrentPage(1)
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Users"
                value={stats.overview.totalUsers.toLocaleString()}
                change={`+${stats.overview.newUsersToday} today`}
                icon={Users}
                color="blue"
              />
              <StatCard
                title="Total Orders"
                value={stats.overview.totalOrders.toLocaleString()}
                change={`+${stats.overview.ordersToday} today`}
                icon={ShoppingBag}
                color="purple"
              />
              <StatCard
                title="Total Revenue"
                value={formatCurrency(stats.overview.totalRevenue)}
                change={`+${formatCurrency(stats.overview.revenueToday)} today`}
                icon={DollarSign}
                color="green"
              />
              <StatCard
                title="Open Tickets"
                value={stats.overview.openTickets.toString()}
                subtitle={`${stats.overview.pendingDeposits} pending deposits`}
                icon={Ticket}
                color="orange"
              />
            </div>

            {/* User Roles & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Distribution */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">User Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(stats.usersByRole).map(([role, count]) => (
                    <div key={role} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                      <span className="font-medium capitalize">{role.toLowerCase()}s</span>
                      <span className="text-lg font-bold">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {stats.recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                      <div>
                        <p className="font-medium text-sm">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.user?.email || 'Unknown'}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.topProducts.map((product) => (
                  <div key={product.id} className="p-4 bg-muted rounded-xl">
                    <p className="font-medium text-sm truncate">{product.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{product.salesCount} sales</p>
                    <p className="text-sm font-bold text-primary mt-2">{formatCurrency(product.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">User Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{u.username || 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-500' :
                          u.role === 'SUPPORT' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(u.balance)}</td>
                      <td className="px-6 py-4">{u._count.orders}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 ${u.isBanned ? 'text-red-500' : 'text-green-500'}`}>
                          <span className={`w-2 h-2 rounded-full ${u.isBanned ? 'bg-red-500' : 'bg-green-500'}`} />
                          {u.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleBanUser(u.id, u.isBanned)}
                          className={`p-2 rounded-lg transition-colors ${
                            u.isBanned 
                              ? 'hover:bg-green-500/10 text-green-500' 
                              : 'hover:bg-red-500/10 text-red-500'
                          }`}
                          title={u.isBanned ? 'Unban user' : 'Ban user'}
                        >
                          {u.isBanned ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Order Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{order.user?.email}</p>
                      </td>
                      <td className="px-6 py-4 font-bold">{formatCurrency(order.total)}</td>
                      <td className="px-6 py-4">{order._count.items}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 bg-muted rounded-lg text-sm border border-border"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="REFUNDED">Refunded</option>
                          <option value="DISPUTED">Disputed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(new Date(order.createdAt))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Transaction History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-mono text-sm">{tx.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4">
                        <p className="text-sm">{tx.user?.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.type === 'DEPOSIT' ? 'bg-green-500/10 text-green-500' :
                          tx.type === 'PURCHASE' ? 'bg-blue-500/10 text-blue-500' :
                          tx.type === 'REFUND' ? 'bg-orange-500/10 text-orange-500' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 font-bold ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.amount >= 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' :
                          tx.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(new Date(tx.createdAt))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">Support Tickets</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Messages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{ticket.subject}</td>
                      <td className="px-6 py-4 text-sm">{ticket.user?.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'URGENT' ? 'bg-red-500/10 text-red-500' :
                          ticket.priority === 'HIGH' ? 'bg-orange-500/10 text-orange-500' :
                          ticket.priority === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleUpdateTicketStatus(ticket.id, e.target.value)}
                          className="px-3 py-1 bg-muted rounded-lg text-sm border border-border"
                        >
                          <option value="OPEN">Open</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">{ticket._count.messages}</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ title, value, change, subtitle, icon: Icon, color }: any) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    green: 'bg-green-500/10 text-green-500',
    orange: 'bg-orange-500/10 text-orange-500',
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {change && <p className="text-sm text-green-500 mt-1">{change}</p>}
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }: any) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
