import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

// GET /api/admin/tickets - List all tickets
export async function GET(request: NextRequest) {
  try {
    const stackUser = await stackServerApp.getUser()
    if (!stackUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: stackUser.id },
      select: { role: true }
    })

    if (!dbUser || (dbUser.role !== 'ADMIN' && dbUser.role !== 'SUPPORT')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') as any
    const priority = searchParams.get('priority') as any

    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (priority) where.priority = priority

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        include: {
          user: {
            select: { id: true, email: true, username: true }
          },
          order: {
            select: { id: true, total: true, status: true }
          },
          _count: {
            select: { messages: true }
          }
        }
      }),
      prisma.ticket.count({ where })
    ])

    return NextResponse.json({
      tickets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Admin tickets API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
