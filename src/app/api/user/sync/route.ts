
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

export async function POST() {
    const user = await stackServerApp.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Upsert user to ensure they exist in our DB
        const dbUser = await prisma.user.upsert({
            where: { id: user.id },
            update: {
                email: user.primaryEmail || '',
                username: user.displayName || user.username || 'User',
            },
            create: {
                id: user.id,
                email: user.primaryEmail || '',
                username: user.displayName || user.username || 'User',
                balance: 0.0,
                tier: 'Basic', // Enum defaults handled by string mapping if consistent, otherwise 'Basic'
            },
        })

        return NextResponse.json(dbUser)
    } catch (error) {
        console.error('Error syncing user:', error)
        return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 })
    }
}
