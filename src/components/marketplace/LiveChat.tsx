'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Send, MessageCircle, Bot, User, ExternalLink, Minimize2 } from 'lucide-react'
import { useChatStore } from '@/stores/chat-store'
import { useUser } from '@stackframe/stack'

export function LiveChat() {
  const { 
    isOpen, 
    messages, 
    isTyping, 
    unreadCount, 
    toggleChat, 
    closeChat, 
    sendMessage,
    clearMessages
  } = useChatStore()
  
  const [inputValue, setInputValue] = useState('')
  const [showHelpline, setShowHelpline] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const user = useUser()
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])
  
  const handleSend = () => {
    if (!inputValue.trim()) return
    sendMessage(inputValue.trim())
    setInputValue('')
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleChat}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="CashVault"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">CashVault AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowHelpline(true)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Human Support"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-primary' 
                      : 'bg-blue-600'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-card border border-border rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {['Pricing', 'Deposit', 'Bank Logs', 'Human Support'].map((action) => (
                  <button
                    key={action}
                    onClick={() => {
                      if (action === 'Human Support') {
                        setShowHelpline(true)
                      } else {
                        sendMessage(action)
                      }
                    }}
                    className="px-3 py-1.5 bg-muted hover:bg-muted/80 border border-border rounded-full text-xs font-medium text-foreground whitespace-nowrap transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Helpline Modal */}
      <AnimatePresence>
        {showHelpline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowHelpline(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Human Support</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Our support team is available 24/7 to assist you
                </p>
              </div>
              
              <div className="space-y-3">
                {/* Telegram */}
                <a
                  href="https://t.me/CashVaultSupport"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#0088cc]/10 border border-[#0088cc]/20 rounded-xl hover:bg-[#0088cc]/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-[#0088cc] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Telegram Helpline</p>
                    <p className="text-xs text-muted-foreground">@CashVaultSupport</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
                
                {/* Email */}
                <a
                  href="mailto:support@cashvault.com"
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@cashvault.com</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
                
                {/* Phone */}
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Phone Support</p>
                    <p className="text-xs text-muted-foreground">+1 (800) 123-4567</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
              
              <button
                onClick={() => setShowHelpline(false)}
                className="w-full mt-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-xl transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
