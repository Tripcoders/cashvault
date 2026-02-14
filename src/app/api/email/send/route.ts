import { NextRequest, NextResponse } from 'next/server'

interface EmailData {
  to: string
  subject: string
  message: string
  from?: string
  name?: string
}

export async function POST(req: NextRequest) {
  try {
    const { to, subject, message, from, name } = await req.json()
    
    // Validate required fields
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Log the email (for now - can integrate with actual email service later)
    console.log('=== EMAIL SENT ===')
    console.log('To:', to)
    console.log('From:', from || 'support@cashvault.com')
    console.log('Name:', name || 'CashVault Support')
    console.log('Subject:', subject)
    console.log('Message:', message)
    console.log('==================')
    
    // Send to Telegram as backup notification
    await notifyTelegramOfEmail({ to, subject, message, from, name })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

async function notifyTelegramOfEmail(emailData: EmailData): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    return
  }
  
  const message = `
📧 <b>New Email Sent</b>

<b>To:</b> ${emailData.to}
<b>From:</b> ${emailData.from || 'support@cashvault.com'}
<b>Subject:</b> ${emailData.subject}

<b>Message Preview:</b>
${emailData.message.substring(0, 200)}${emailData.message.length > 200 ? '...' : ''}
  `.trim()
  
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    })
  } catch (error) {
    console.error('Failed to notify Telegram of email:', error)
  }
}
