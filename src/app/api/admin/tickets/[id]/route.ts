import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

// GET /api/admin/tickets/[id] - Get ticket details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { id: true, email: true, username: true }
        },
        order: {
          include: {
            items: {
              include: { product: true }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            ticket: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    return NextResponse.json(ticket)

  } catch (error) {
    console.error('Admin ticket detail API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/admin/tickets/[id] - Update ticket
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json()
    const { status, priority } = body

    const updateData: any = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority

    const updatedTicket = await prisma.ticket.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json(updatedTicket)

  } catch (error) {
    console.error('Admin ticket update API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/tickets/[id] - Add message to ticket
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const body = await request.json()
    const { content } = body

    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: params.id,
        senderId: stackUser.id,
        content,
        isAdmin: true
      }
    })

    // Update ticket status to IN_PROGRESS if it was OPEN
    await prisma.ticket.update({
      where: { id: params.id },
      data: { 
        status: 'IN_PROGRESS',
        updatedAt: new Date()
      }
    })

    return NextResponse.json(message)

  } catch (error) {
    console.error('Admin ticket message API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
