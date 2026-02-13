import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stackServerApp } from '@/stack'

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// POST - Send OTP
export async function POST(request: Request) {
  const user = await stackServerApp.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { action } = await request.json()

    if (action === 'send') {
      const otp = generateOTP()
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry

      // Save OTP to user record
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailOtpCode: otp,
          emailOtpExpires: expiresAt,
        },
      })

      // Send OTP via email (using Stack Auth's email or custom SMTP)
      const isDev = process.env.NODE_ENV === 'development'
      
      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        // Only include OTP in development
        ...(isDev && { otp }),
      })
    }

    if (action === 'verify') {
      const { otp } = await request.json()

      if (!otp || otp.length !== 6) {
        return NextResponse.json(
          { error: 'Invalid OTP format' },
          { status: 400 }
        )
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          emailOtpCode: true,
          emailOtpExpires: true,
        },
      })

      if (!dbUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      if (!dbUser.emailOtpExpires || new Date() > dbUser.emailOtpExpires) {
        return NextResponse.json(
          { error: 'OTP has expired. Please request a new one.' },
          { status: 400 }
        )
      }

      if (dbUser.emailOtpCode !== otp) {
        return NextResponse.json(
          { error: 'Invalid OTP. Please try again.' },
          { status: 400 }
        )
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isEmailVerified: true,
          emailOtpCode: null,
          emailOtpExpires: null,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Email verified successfully',
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing OTP:', error)
    return NextResponse.json(
      { error: 'Failed to process OTP request' },
      { status: 500 }
    )
  }
}
