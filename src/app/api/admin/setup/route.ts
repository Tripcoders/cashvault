import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

// POST /api/admin/setup - Make current user an admin (run once)
export async function POST() {
  try {
    const stackUser = await stackServerApp.getUser()
    
    if (!stackUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      return NextResponse.json({ 
        error: 'Admin already exists',
        message: 'An admin user already exists. Contact them to promote your account.'
      }, { status: 403 })
    }

    // Make current user admin
    const user = await prisma.user.upsert({
      where: { id: stackUser.id },
      update: { role: 'ADMIN' },
      create: {
        id: stackUser.id,
        email: stackUser.primaryEmail || '',
        username: stackUser.displayName || 'Admin',
        role: 'ADMIN',
        balance: 0,
        tier: 'VIP'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'You are now an admin!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.error('Admin setup error:', error)
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 })
  }
}
