
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

export async function POST(req: Request) {
    const user = await stackServerApp.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { amount } = await req.json()

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
        }

        // Wrap in transaction to ensure consistency
        const updatedUser = await prisma.$transaction(async (tx) => {
            const currentUser = await tx.user.findUnique({ where: { id: user.id } })
            if (!currentUser) throw new Error('User not found')

            const newBalance = currentUser.balance + amount

            // Tier upgrade logic
            let newTier = currentUser.tier
            if (amount >= 700 || newBalance >= 2000) { // Example rule: upgrade on big topup OR accumulated balance
                newTier = 'Premium'
            }

            // Create Ledger Transaction (Double Entry Principle)
            await tx.transaction.create({
                data: {
                    userId: user.id,
                    amount: amount,
                    type: 'DEPOSIT',
                    status: 'COMPLETED',
                    description: `Wallet top-up via Crypto`,
                    balanceSnapshot: newBalance,
                }
            })

            return await tx.user.update({
                where: { id: user.id },
                data: {
                    balance: newBalance,
                    tier: newTier as "Basic" | "Premium" | "VIP"
                }
            })
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.error('Error topping up:', error)
        return NextResponse.json({ error: 'Failed to process topup' }, { status: 500 })
    }
}
