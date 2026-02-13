'use client'

import React from 'react'
import { MessageCircle, Send, Phone, Mail, Clock, HelpCircle, ArrowRight } from 'lucide-react'

export function SupportView() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 animate-face-in-up">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-600/30 animate-bounce-subtle">
          <MessageCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-[32px] font-bold text-foreground mb-4 animate-fade-in-up stagger-1">
          Support Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up stagger-2">
          Need help? Our support team is available 24/7 to assist you with
          any questions or issues.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in-up stagger-3">
        <button className="p-6 bg-card border-2 border-border rounded-2xl hover:shadow-xl hover:border-blue-500/30 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 hover-lift-strong group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Mail className="w-7 h-7" />
            </div>
            <span className="text-lg font-bold text-foreground">Email Us</span>
            <span className="text-sm text-muted-foreground">support@cashvault.com</span>
          </div>
        </button>

        <button className="p-6 bg-card border-2 border-border rounded-2xl hover:shadow-xl hover:border-blue-500/30 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 hover-lift-strong group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Phone className="w-7 h-7" />
            </div>
            <span className="text-lg font-bold text-foreground">Call Us</span>
            <span className="text-sm text-muted-foreground">+1 (800) 123-4567</span>
          </div>
        </button>

        <button className="p-6 bg-card border-2 border-border rounded-2xl hover:shadow-xl hover:border-blue-500/30 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 hover-lift-strong group">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <MessageCircle className="w-7 h-7" />
            </div>
            <span className="text-lg font-bold text-foreground">Live Chat</span>
            <span className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Open Ticket */}
        <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 animate-face-in-up stagger-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Open a New Ticket
              </h3>
              <p className="text-muted-foreground">
                Submit a support request and our team will get back to you within 24 hours.
              </p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 bg-background border-2 border-border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all hover:border-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Describe your issue in detail..."
                className="w-full px-4 py-3 bg-background border-2 border-border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl outline-none transition-all hover:border-blue-500/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Low', 'Medium', 'High'].map((priority, idx) => (
                  <button
                    key={priority}
                    type="button"
                    className={`px-4 py-3 border-2 border-border rounded-xl text-sm font-bold transition-all hover-lift ${
                      idx === 1
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                        : 'hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 hover-lift-strong animate-fade-in-up"
            >
              <Send className="w-5 h-5" />
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Recent Tickets */}
        <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 animate-face-in-up stagger-5">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-500" />
            Recent Tickets
          </h3>

          <div className="space-y-4">
            {[
              { id: 'TKT-001', subject: 'Unable to download files', status: 'Resolved', date: '2 hours ago' },
              { id: 'TKT-002', subject: 'Payment not processed', status: 'In Progress', date: '5 hours ago' },
              { id: 'TKT-003', subject: 'Account verification issue', status: 'Open', date: '1 day ago' },
            ].map((ticket, idx) => (
              <div
                key={ticket.id}
                className="p-4 bg-muted/30 dark:bg-muted/20 border border-border rounded-xl hover:border-blue-500/30 hover:bg-blue-50/10 dark:hover:bg-blue-900/10 transition-all hover-lift animate-face-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-foreground text-sm mb-1">
                      {ticket.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {ticket.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-lg ${
                        ticket.status === 'Open'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : ticket.status === 'In Progress'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {ticket.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-muted/50 dark:bg-muted/30 border border-border hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl text-sm font-medium transition-all hover-lift">
            View All Tickets
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10 animate-fade-in-up">
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { q: 'How do I download purchased files?', a: 'Files are available in your My Orders section immediately after purchase.' },
            { q: 'What payment methods do you accept?', a: 'We accept Bitcoin, Ethereum, and USDT via crypto transfers.' },
            { q: 'Is my purchase protected?', a: 'Yes, all purchases are protected by our escrow system with replacement guarantee.' },
            { q: 'How long does delivery take?', a: 'Most items are delivered instantly. Some manual items may take up to 24 hours.' },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-6 bg-card border border-border rounded-xl hover:border-blue-500/30 hover:shadow-md transition-all hover-lift animate-face-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className="font-bold text-foreground mb-2 text-sm">
                {faq.q}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
