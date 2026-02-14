import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  id: string
  role: 'user' | 'bot' | 'system'
  content: string
  timestamp: string
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }
    
    // Format the conversation summary
    const userMessages = messages.filter((m: ChatMessage) => m.role === 'user')
    const botMessages = messages.filter((m: ChatMessage) => m.role === 'bot')
    
    const lastUserMessage = userMessages[userMessages.length - 1]
    const lastBotMessage = botMessages[botMessages.length - 1]
    
    // Check if user is asking for human support
    const needsHumanSupport = lastUserMessage?.content.toLowerCase().includes('human') ||
                              lastUserMessage?.content.toLowerCase().includes('agent') ||
                              lastUserMessage?.content.toLowerCase().includes('support')
    
    // Format message for Telegram
    const telegramMessage = formatTelegramMessage(messages, needsHumanSupport)
    
    // Send to Telegram
    await sendToTelegram(telegramMessage)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Conversation sent to support team',
      needsHumanSupport 
    })
    
  } catch (error) {
    console.error('Error in chat telegram API:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}

function formatTelegramMessage(messages: ChatMessage[], needsHumanSupport: boolean): string {
  const timestamp = new Date().toISOString()
  const userMessages = messages.filter(m => m.role === 'user')
  const lastUserMessage = userMessages[userMessages.length - 1]
  
  let message = `🤖 <b>CashVault AI Chat Summary</b>\n`
  message += `⏰ ${timestamp}\n`
  message += `💬 Total Messages: ${messages.length}\n\n`
  
  if (needsHumanSupport) {
    message += `🚨 <b>HUMAN SUPPORT REQUESTED</b>\n\n`
  }
  
  message += `<b>Last User Message:</b>\n`
  message += `"${lastUserMessage?.content || 'N/A'}"\n\n`
  
  message += `<b>Conversation History:</b>\n`
  
  // Show last 5 messages
  const recentMessages = messages.slice(-5)
  recentMessages.forEach((msg, idx) => {
    const icon = msg.role === 'user' ? '👤' : msg.role === 'bot' ? '🤖' : '⚙️'
    const preview = msg.content.length > 100 
      ? msg.content.substring(0, 100) + '...' 
      : msg.content
    message += `${icon} ${preview}\n`
  })
  
  message += `\n🔗 <a href="https://t.me/CashVaultSupport">Open Telegram Support</a>`
  
  return message
}

async function sendToTelegram(message: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!botToken || !chatId) {
    console.warn('Telegram credentials not configured. Message not sent.')
    console.log('Message that would be sent:', message)
    return
  }
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Telegram API error: ${error.description}`)
    }
    
    console.log('Chat summary sent to Telegram successfully')
  } catch (error) {
    console.error('Failed to send to Telegram:', error)
    // Don't throw - we don't want to break the chat experience
  }
}
