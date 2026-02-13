import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

// GET /api/admin/stats - Get dashboard statistics
export async function GET() {
  try {
    const stackUser = await stackServerApp.getUser()
    if (!stackUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: stackUser.id },
      select: { role: true }
    })

    if (!dbUser || dbUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get various stats
    const [
      totalUsers,
      newUsersToday,
      totalOrders,
      ordersToday,
      totalRevenue,
      revenueToday,
      pendingDeposits,
      openTickets,
      usersByRole,
      recentTransactions,
      topProducts
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // New users today
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total orders
      prisma.order.count(),
      
      // Orders today
      prisma.order.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total revenue
      prisma.order.aggregate({
        _sum: { total: true }
      }),
      
      // Revenue today
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        },
        _sum: { total: true }
      }),
      
      // Pending deposits
      prisma.transaction.count({
        where: {
          type: 'DEPOSIT',
          status: 'PENDING'
        }
      }),
      
      // Open tickets
      prisma.ticket.count({
        where: {
          status: { in: ['OPEN', 'IN_PROGRESS'] }
        }
      }),
      
      // Users by role
      prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      }),
      
      // Recent transactions
      prisma.transaction.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { email: true, username: true }
          }
        }
      }),
      
      // Top products
      prisma.product.findMany({
        take: 5,
        orderBy: { salesCount: 'desc' },
        select: {
          id: true,
          title: true,
          salesCount: true,
          price: true
        }
      })
    ])

    return NextResponse.json({
      overview: {
        totalUsers,
        newUsersToday,
        totalOrders,
        ordersToday,
        totalRevenue: totalRevenue._sum.total || 0,
        revenueToday: revenueToday._sum.total || 0,
        pendingDeposits,
        openTickets
      },
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item.role] = item._count.role
        return acc
      }, {} as Record<string, number>),
      recentTransactions,
      topProducts
    })

  } catch (error) {
    console.error('Admin stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
