import { create } from 'zustand'

export type MessageRole = 'user' | 'bot' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  startedAt: string
  userId?: string
  userEmail?: string
}

type ChatStore = {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  sessionId: string | null
  unreadCount: number
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  sendMessage: (content: string) => void
  addBotMessage: (content: string) => void
  clearMessages: () => void
  markAsRead: () => void
}

// AI Response patterns
const getAIResponse = (userMessage: string): string => {
  const lowerMsg = userMessage.toLowerCase()
  
  // Greeting patterns
  if (lowerMsg.match(/^(hi|hello|hey|greetings|howdy)/)) {
    return "Hello! Welcome to CashVault Support. I'm your AI assistant. How can I help you today? You can ask me about:\n\n• Bank logs and pricing\n• How to make a deposit\n• Account issues\n• Order status\n• Or type 'human' to speak with our support team"
  }
  
  // Bank logs questions
  if (lowerMsg.includes('bank log') || lowerMsg.includes('bank') || lowerMsg.includes('balance')) {
    return "Our bank logs are verified accounts with various balances. Each log includes:\n\n✓ Full email access\n✓ Cookies & device fingerprint\n✓ Login credentials\n✓ 24/7 support\n✓ 24-hour replacement guarantee\n\nPrices vary based on the bank and balance. Would you like to browse our available bank logs?"
  }
  
  // Pricing questions
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
    return "Our pricing varies by product:\n\n🏦 Bank Logs: $200 - $500+ (based on balance)\n💳 Credit Cards: $50 - $500+ (based on limit)\n🔐 OTP Bots: $280 - $750\n🖥️ RAT Tools: $320 - $850\n💰 PayPal: $180 - $2,500\n\nAll purchases include instant delivery and our 24-hour replacement guarantee."
  }
  
  // Deposit questions
  if (lowerMsg.includes('deposit') || lowerMsg.includes('top up') || lowerMsg.includes('add fund') || lowerMsg.includes('payment')) {
    return "To add funds to your account:\n\n1. Click the '+ Add Funds' button\n2. Select your preferred cryptocurrency (BTC, ETH, USDT)\n3. Enter the amount (minimum $150)\n4. Send payment to the provided address\n5. Funds will be credited after network confirmation\n\n⚠️ Minimum deposit: $150\n⚠️ Your account must be topped up within 4 days of registration"
  }
  
  // Account questions
  if (lowerMsg.includes('account') || lowerMsg.includes('register') || lowerMsg.includes('sign up')) {
    return "Account Information:\n\n✓ Free registration\n✓ 4-day grace period to make first deposit\n✓ Account deactivation if no deposit is made\n✓ Premium features available after first purchase\n\nNeed help with your account? Type 'human' to speak with our support team."
  }
  
  // Order questions
  if (lowerMsg.includes('order') || lowerMsg.includes('purchase') || lowerMsg.includes('buy')) {
    return "How to place an order:\n\n1. Browse our products and select an item\n2. Click 'Add to Cart'\n3. Review your cart and click 'Checkout'\n4. Ensure you have sufficient balance\n5. Confirm your purchase\n\nAll orders are processed instantly after payment confirmation. You'll receive your product details immediately after purchase."
  }
  
  // Support/Human request
  if (lowerMsg.includes('human') || lowerMsg.includes('agent') || lowerMsg.includes('support') || lowerMsg.includes('help')) {
    return "I'll connect you with our human support team. They typically respond within 15-30 minutes during business hours.\n\n📱 Telegram Helpline: @CashVaultSupport\n📧 Email: support@cashvault.com\n📞 Phone: +1 (800) 123-4567\n\nYour conversation has been logged and our team will review it. Is there anything specific I should pass along to them?"
  }
  
  // Crypto questions
  if (lowerMsg.includes('crypto') || lowerMsg.includes('bitcoin') || lowerMsg.includes('btc') || lowerMsg.includes('usdt')) {
    return "We accept the following cryptocurrencies:\n\n₿ Bitcoin (BTC)\nΞ Ethereum (ETH)\n💎 USDT (TRC20 & ERC20)\n\nAll payments are secure and encrypted. After sending payment, please allow 10-30 minutes for network confirmations."
  }
  
  // Delivery questions
  if (lowerMsg.includes('delivery') || lowerMsg.includes('instant') || lowerMsg.includes('receive')) {
    return "All our digital products are delivered INSTANTLY after purchase confirmation.\n\n📦 Bank Logs: Instant\n📦 Credit Cards: Instant\n📦 Software Tools: Instant\n📦 OTP Bots: Instant\n\nYou can access your purchased items in the 'My Orders' section immediately after payment."
  }
  
  // Refund/Replacement
  if (lowerMsg.includes('refund') || lowerMsg.includes('replace') || lowerMsg.includes('not working') || lowerMsg.includes('bad')) {
    return "We offer a 24-hour replacement guarantee on all products:\n\n✓ If a log doesn't work, we replace it FREE\n✓ If credentials are invalid, we replace it FREE\n✓ If you can't access the account, we replace it FREE\n\nSimply open a support ticket within 24 hours of purchase. Type 'human' to speak with support about replacements."
  }
  
  // Scam/Trust questions
  if (lowerMsg.includes('scam') || lowerMsg.includes('legit') || lowerMsg.includes('trust') || lowerMsg.includes('safe')) {
    return "CashVault is a trusted marketplace with:\n\n✓ 12,000+ active traders\n✓ $2.4M+ in transaction volume\n✓ 98.7% success rate\n✓ 24/7 customer support\n✓ 24-hour replacement guarantee\n✓ Escrow protection on all purchases\n\nWe've been serving the community since 2020. Your security and satisfaction are our top priorities."
  }
  
  // Default response
  return "I understand you're asking about: \"" + userMessage + "\"\n\nI can help with:\n• Product information and pricing\n• How to deposit and purchase\n• Account questions\n• Order status\n• Technical support\n\nFor more specific help, type 'human' to speak with our support team, or rephrase your question and I'll do my best to assist!"
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  messages: [
    {
      id: 'welcome',
      role: 'bot',
      content: "👋 Welcome to CashVault! I'm your AI assistant.\n\nI can help you with:\n• Product information\n• Pricing questions\n• How to deposit/purchase\n• Account support\n\nType 'human' anytime to speak with our support team.",
      timestamp: new Date().toISOString()
    }
  ],
  isTyping: false,
  sessionId: null,
  unreadCount: 0,
  
  openChat: () => {
    set({ isOpen: true })
    // Send conversation summary to Telegram when chat opens
    const state = get()
    if (state.messages.length > 1) {
      sendToTelegram(state.messages)
    }
  },
  
  closeChat: () => {
    set({ isOpen: false })
  },
  
  toggleChat: () => {
    const newState = !get().isOpen
    set({ isOpen: newState })
    if (newState) {
      set({ unreadCount: 0 })
    }
  },
  
  sendMessage: (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }
    
    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true
    }))
    
    // Simulate AI typing delay
    setTimeout(() => {
      const botResponse = getAIResponse(content)
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: botResponse,
        timestamp: new Date().toISOString()
      }
      
      set((state) => ({
        messages: [...state.messages, botMessage],
        isTyping: false,
        unreadCount: state.isOpen ? 0 : state.unreadCount + 1
      }))
      
      // Send to Telegram if user asks for human support
      if (content.toLowerCase().includes('human') || 
          content.toLowerCase().includes('agent') ||
          content.toLowerCase().includes('support')) {
        sendToTelegram([...get().messages, botMessage])
      }
    }, 1000 + Math.random() * 1000)
  },
  
  addBotMessage: (content: string) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'bot',
      content,
      timestamp: new Date().toISOString()
    }
    
    set((state) => ({
      messages: [...state.messages, botMessage]
    }))
  },
  
  clearMessages: () => {
    set({
      messages: [{
        id: 'welcome',
        role: 'bot',
        content: "👋 Welcome to CashVault! I'm your AI assistant.\n\nHow can I help you today?",
        timestamp: new Date().toISOString()
      }]
    })
  },
  
  markAsRead: () => {
    set({ unreadCount: 0 })
  }
}))

// Send conversation to Telegram
async function sendToTelegram(messages: ChatMessage[]) {
  try {
    const response = await fetch('/api/chat/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    })
    
    if (!response.ok) {
      console.error('Failed to send to Telegram')
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error)
  }
}
