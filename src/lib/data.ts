import {
  CreditCard,
  Database,
  Smartphone,
  Server,
  Globe,
  Shield,
  Wifi,
  ArrowLeftRight,
  Building2,
  Wallet,
  Bot,
  Monitor,
} from 'lucide-react'
import { generateBannerImage } from './product-images'

export type Category = {
  id: string
  name: string
  iconName: string
  count: number
}

export type Product = {
  id: string
  title: string
  category: string
  price: number
  description: string
  image: string
  grade?: string
  features?: string[]
  stock: number
  bankName?: string
  bankBalance?: string
  cardType?: string
  paypalBalance?: string
  otpProvider?: string
  ratType?: string
}

export const CATEGORIES: Category[] = [
  { id: 'bank-logs', name: 'Bank Logs', iconName: 'database', count: 342 },
  { id: 'office-365', name: 'Office 365 Leads', iconName: 'globe', count: 850 },
  { id: 'cash-out', name: 'Cash Out Methods', iconName: 'exchange', count: 30 },
  { id: 'otp-bot', name: 'OTP BOT', iconName: 'smartphone', count: 45 },
  { id: 'cc-topup', name: 'Credit Card Top Up', iconName: 'credit-card', count: 65 },
  { id: 'rat', name: 'RAT (Remote Access)', iconName: 'shield', count: 50 },
  { id: 'rdp', name: 'Powerful RDP', iconName: 'server', count: 35 },
  { id: 'paypal', name: 'PayPal Accounts', iconName: 'wifi', count: 58 },
]

// Banner image
export const BANNER_IMAGE = generateBannerImage()

// Bank Log Pricing Helper - $200 to $500 based on balance
const getBankLogPrice = (balance: number): number => {
  if (balance >= 50000) return 500
  if (balance >= 30000) return 450
  if (balance >= 20000) return 400
  if (balance >= 15000) return 350
  if (balance >= 10000) return 300
  if (balance >= 7000) return 280
  if (balance >= 5000) return 250
  if (balance >= 3000) return 220
  return 200
}

// US Banks (70%)
const USBanks = [
  { name: 'Chase', country: 'US' },
  { name: 'Wells Fargo', country: 'US' },
  { name: 'Bank of America', country: 'US' },
  { name: 'Citibank', country: 'US' },
  { name: 'Capital One', country: 'US' },
  { name: 'PNC Bank', country: 'US' },
  { name: 'US Bank', country: 'US' },
  { name: 'TD Bank', country: 'US' },
  { name: 'Truist', country: 'US' },
  { name: 'Goldman Sachs', country: 'US' },
  { name: 'Morgan Stanley', country: 'US' },
  { name: 'Charles Schwab', country: 'US' },
  { name: 'Fidelity', country: 'US' },
  { name: 'American Express Bank', country: 'US' },
]

// International Banks (30%)
const IntBanks = [
  { name: 'HSBC', country: 'UK' },
  { name: 'Barclays', country: 'UK' },
  { name: 'Lloyds Bank', country: 'UK' },
  { name: 'RBC', country: 'CA' },
  { name: 'TD Canada', country: 'CA' },
  { name: 'Scotiabank', country: 'CA' },
  { name: 'Deutsche Bank', country: 'DE' },
  { name: 'Commerzbank', country: 'DE' },
  { name: 'BNP Paribas', country: 'FR' },
  { name: 'Société Générale', country: 'FR' },
  { name: 'ING', country: 'NL' },
  { name: 'ANZ', country: 'AU' },
  { name: 'Commonwealth Bank', country: 'AU' },
  { name: 'Westpac', country: 'AU' },
  { name: 'Santander', country: 'ES' },
  { name: 'BBVA', country: 'ES' },
  { name: 'Itaú', country: 'BR' },
  { name: 'Bradesco', country: 'BR' },
  { name: 'UBS', country: 'CH' },
  { name: 'Credit Suisse', country: 'CH' },
]

// Generate Bank Logs
const generateBankLogs = (): Product[] => {
  const logs: Product[] = []
  let id = 1

  // Generate 240 US bank logs (70%)
  for (let i = 0; i < 240; i++) {
    const bank = USBanks[Math.floor(Math.random() * USBanks.length)]
    const balance = Math.floor(Math.random() * 55000) + 3000
    const price = getBankLogPrice(balance)
    const grade = balance >= 20000 ? 'Premium' : balance >= 10000 ? 'High' : balance >= 5000 ? 'Medium' : 'Standard'
    
    const product: Product = {
      id: `bl-${id++}`,
      title: `${bank.name} - $${balance.toLocaleString()} Balance`,
      category: 'bank-logs',
      price,
      grade,
      description: `Verified ${bank.name} account with $${balance.toLocaleString()} balance. Full access with email, cookies, and device fingerprint.`,
      features: [
        `Balance: $${balance.toLocaleString()}`,
        'Email Access Included',
        'Cookies + Device FP',
        '2FA Bypass Ready',
        'Login Credentials',
        '24/7 Support'
      ],
      image: '',
      stock: Math.floor(Math.random() * 8) + 1,
      bankName: bank.name,
      bankBalance: `$${balance.toLocaleString()}`,
    }
    
    product.image = ''
    logs.push(product)
  }

  // Generate 102 International bank logs (30%)
  for (let i = 0; i < 102; i++) {
    const bank = IntBanks[Math.floor(Math.random() * IntBanks.length)]
    const balance = Math.floor(Math.random() * 45000) + 2000
    const price = getBankLogPrice(balance)
    const grade = balance >= 20000 ? 'Premium' : balance >= 10000 ? 'High' : balance >= 5000 ? 'Medium' : 'Standard'
    
    const product: Product = {
      id: `bl-${id++}`,
      title: `${bank.name} [${bank.country}] - $${balance.toLocaleString()} Balance`,
      category: 'bank-logs',
      price,
      grade,
      description: `Verified ${bank.name} (${bank.country}) account with $${balance.toLocaleString()} balance. International banking access.`,
      features: [
        `Balance: $${balance.toLocaleString()}`,
        'International Bank',
        'Email Access Included',
        'Cookies + Device FP',
        'Swift Transfer Ready',
        '24/7 Support'
      ],
      image: '',
      stock: Math.floor(Math.random() * 5) + 1,
      bankName: bank.name,
      bankBalance: `$${balance.toLocaleString()}`,
    }
    
    product.image = ''
    logs.push(product)
  }

  return logs
}

// Credit Cards - Amex, Chase, Wells Fargo
const generateCreditCards = (): Product[] => {
  const cards: Product[] = []
  const cardTypes = [
    { type: 'American Express', limits: [5000, 10000, 15000, 25000, 50000] },
    { type: 'Chase', limits: [3000, 5000, 10000, 20000, 35000] },
    { type: 'Wells Fargo', limits: [2500, 5000, 8000, 15000, 25000] },
  ]

  let id = 1
  cardTypes.forEach(({ type, limits }) => {
    limits.forEach((limit, idx) => {
      const price = Math.floor(limit * 0.015) + 50
      const grade = idx >= 3 ? 'Premium' : idx >= 2 ? 'High' : 'Standard'
      
      const product: Product = {
        id: `cc-${id++}`,
        title: `${type} Credit Card - $${limit.toLocaleString()} Limit`,
        category: 'cc-topup',
        price,
        grade,
        description: `Verified ${type} credit card with $${limit.toLocaleString()} available limit. Full card details with CVV and billing address.`,
        features: [
          `Credit Limit: $${limit.toLocaleString()}`,
          'Full Card Details',
          'CVV Included',
          'Billing Address',
          'Live & Verified',
          'Instant Delivery'
        ],
        image: '',
        stock: Math.floor(Math.random() * 10) + 3,
        cardType: type,
      }
      
      product.image = ''
      cards.push(product)
    })
  })

  return cards
}

// OTP Bots - Telegram and Twilio
const generateOTPBots = (): Product[] => {
  const bots: Product[] = []
  
  const botConfigs = [
    {
      id: 'otp-1',
      title: 'Telegram OTP Bot - Enterprise',
      price: 450,
      grade: 'Enterprise',
      description: 'Advanced Telegram OTP bot supporting all major banks and services. Real-time SMS interception via Telegram bot interface.',
      features: [
        'Telegram Bot Interface',
        'All Major Banks Supported',
        'Real-time Interception',
        'SMS + Voice Calls',
        'Customizable Scripts',
        '99.9% Success Rate'
      ],
      stock: 8,
      otpProvider: 'Telegram',
    },
    {
      id: 'otp-2',
      title: 'Telegram OTP Bot - Standard',
      price: 280,
      grade: 'Standard',
      description: 'Standard Telegram OTP bot for SMS interception. Easy setup via Telegram bot commands.',
      features: [
        'Telegram Bot Interface',
        'SMS Interception',
        'Major Banks Support',
        'Simple Commands',
        'Setup Guide Included'
      ],
      stock: 15,
      otpProvider: 'Telegram',
    },
    {
      id: 'otp-3',
      title: 'Twilio OTP Bot - Premium',
      price: 550,
      grade: 'Premium',
      description: 'Premium Twilio-powered OTP bot with voice synthesis and advanced spoofing capabilities.',
      features: [
        'Twilio API Integration',
        'Voice Call Spoofing',
        'Text-to-Speech',
        'All Banks + PayPal',
        'Custom Caller ID',
        'Analytics Dashboard'
      ],
      stock: 6,
      otpProvider: 'Twilio',
    },
    {
      id: 'otp-4',
      title: 'Twilio OTP Bot - Basic',
      price: 320,
      grade: 'Basic',
      description: 'Entry-level Twilio OTP bot for SMS and voice call interception. Reliable and affordable.',
      features: [
        'Twilio API',
        'SMS + Voice',
        'Major Services',
        'Easy Integration',
        '24/7 Operation'
      ],
      stock: 12,
      otpProvider: 'Twilio',
    },
    {
      id: 'otp-5',
      title: 'Dual OTP Bot (Telegram + Twilio)',
      price: 750,
      grade: 'Ultimate',
      description: 'Ultimate OTP solution combining both Telegram and Twilio bots for maximum coverage.',
      features: [
        'Telegram + Twilio',
        'SMS + Voice',
        'All Banks Supported',
        'Custom Scripts',
        'Priority Support',
        'Source Code Included'
      ],
      stock: 4,
      otpProvider: 'Dual',
    },
  ]
  
  botConfigs.forEach(config => {
    const product: Product = {
      ...config,
      category: 'otp-bot',
      image: '',
    }
    product.image = ''
    bots.push(product)
  })
  
  return bots
}

// RATs with PDF and Link Injection
const generateRATs = (): Product[] => {
  const rats: Product[] = []
  
  const ratConfigs = [
    {
      id: 'rat-1',
      title: 'Shadow RAT - Ultimate Edition',
      price: 650,
      grade: 'Ultimate',
      description: 'Most powerful RAT with PDF injection, link injection, full system control, and stealth mode.',
      features: [
        'PDF Injection',
        'Link Injection',
        'Full System Control',
        'Remote Desktop',
        'Keylogger',
        'File Manager',
        'Webcam Access',
        'Password Stealer',
        'Stealth Mode'
      ],
      stock: 5,
      ratType: 'Windows',
    },
    {
      id: 'rat-2',
      title: 'Ghost RAT - PDF Injection Pro',
      price: 450,
      grade: 'Premium',
      description: 'Specialized RAT with advanced PDF injection capabilities. Infect via malicious PDF documents.',
      features: [
        'Advanced PDF Injection',
        'Silent Installation',
        'Screen Capture',
        'File Transfer',
        'Process Manager',
        'Registry Editor'
      ],
      stock: 8,
      ratType: 'Windows',
    },
    {
      id: 'rat-3',
      title: 'Phantom RAT - Link Injection',
      price: 380,
      grade: 'Advanced',
      description: 'Link injection RAT for browser-based attacks. Control targets through malicious links.',
      features: [
        'Link Injection',
        'Browser Hijacking',
        'Form Grabber',
        'Cookie Stealer',
        'Session Hijacking',
        'Real-time Monitoring'
      ],
      stock: 10,
      ratType: 'Cross-Platform',
    },
    {
      id: 'rat-4',
      title: 'Android RAT - Mobile Control',
      price: 320,
      grade: 'Mobile',
      description: 'Full Android device control. SMS, calls, camera, location, and app access.',
      features: [
        'SMS Control',
        'Call Recording',
        'Camera Access',
        'GPS Tracking',
        'App Management',
        'Contact Stealer'
      ],
      stock: 12,
      ratType: 'Android',
    },
    {
      id: 'rat-5',
      title: 'iOS RAT - Zero Click',
      price: 850,
      grade: 'Elite',
      description: 'Zero-click iOS remote access tool. No user interaction required for installation.',
      features: [
        'Zero-Click Install',
        'iMessage Access',
        'Photo Gallery',
        'Location Tracking',
        'Call Logs',
        'Undetectable'
      ],
      stock: 3,
      ratType: 'iOS',
    },
  ]
  
  ratConfigs.forEach(config => {
    const product: Product = {
      ...config,
      category: 'rat',
      image: '',
    }
    product.image = ''
    rats.push(product)
  })
  
  return rats
}

// PayPal Accounts - Different amounts for different balances
const generatePayPalAccounts = (): Product[] => {
  const accounts: Product[] = []
  const tiers = [
    { balance: 500, price: 180, age: 6 },
    { balance: 1000, price: 280, age: 12 },
    { balance: 2500, price: 450, age: 18 },
    { balance: 5000, price: 750, age: 24 },
    { balance: 10000, price: 1200, age: 36 },
    { balance: 25000, price: 2500, age: 48 },
  ]

  tiers.forEach((tier, idx) => {
    const grade = tier.balance >= 10000 ? 'Premium' : tier.balance >= 2500 ? 'Verified' : 'Standard'
    
    const product: Product = {
      id: `pp-${idx + 1}`,
      title: `PayPal Verified - $${tier.balance.toLocaleString()} Balance`,
      category: 'paypal',
      price: tier.price,
      grade,
      description: `Verified PayPal account with $${tier.balance.toLocaleString()} available balance. Aged ${tier.age}+ months with transaction history.`,
      features: [
        `Balance: $${tier.balance.toLocaleString()}`,
        `Aged: ${tier.age}+ Months`,
        'Verified Account',
        'Bank Linked',
        'Card Attached',
        'Send/Receive Enabled',
        'Full Access'
      ],
      image: '',
      stock: Math.floor(Math.random() * 8) + 2,
      paypalBalance: `$${tier.balance.toLocaleString()}`,
    }
    
    product.image = ''
    accounts.push(product)
  })

  return accounts
}

// Office 365 Leads
const generateOffice365Products = (): Product[] => {
  const products: Product[] = []
  
  const configs = [
    {
      id: 'off-1',
      title: 'Corporate Office 365 Leads (100x)',
      price: 45,
      grade: 'Verified',
      description: 'High-quality corporate leads verified within last 24 hours. Active and valid logins.',
      features: ['100 Accounts', 'Corporate Domains', 'Active Status', 'Valid Login'],
      stock: 250,
    },
    {
      id: 'off-2',
      title: 'Enterprise Office 365 Leads (500x)',
      price: 180,
      grade: 'Enterprise',
      description: 'Large pack of enterprise Office 365 leads. Fortune 500 company domains.',
      features: ['500 Accounts', 'Enterprise Domains', 'Premium Quality', 'Instant Delivery'],
      stock: 100,
    },
    {
      id: 'off-3',
      title: 'Bulk Mixed Leads (1000x)',
      price: 280,
      grade: 'Bulk',
      description: 'Pack of 1000 mixed Office 365 leads. 85% validity guarantee.',
      features: ['1000 Accounts', 'Mixed Domains', '85% Valid', 'Instant Delivery'],
      stock: 50,
    },
    {
      id: 'off-4',
      title: 'Educational (.edu) Leads (200x)',
      price: 120,
      grade: 'Premium',
      description: 'Educational institution Office 365 leads. High-value targets.',
      features: ['200 Accounts', '.edu Domains', 'Student/Staff Access', 'Research Access'],
      stock: 75,
    },
  ]
  
  configs.forEach(config => {
    const product: Product = {
      ...config,
      category: 'office-365',
      image: '',
    }
    product.image = ''
    products.push(product)
  })
  
  return products
}

// Cash Out Methods
const generateCashOutProducts = (): Product[] => {
  const products: Product[] = []
  
  const configs = [
    {
      id: 'co-1',
      title: 'Express Cashout Method 2024',
      price: 150,
      grade: 'Premium',
      description: 'Latest working method for instant cashouts. Includes PDF guide and video tutorial.',
      features: ['Instant Cashout', 'Video Tutorial', 'Support Included', 'Updated Weekly'],
      stock: 20,
    },
    {
      id: 'co-2',
      title: 'Standard Cashout Guide',
      price: 75,
      grade: 'Standard',
      description: 'Reliable method for standard transfers. 90% success rate.',
      features: ['Step-by-step PDF', 'List of BINs', 'Basic Support', 'Beginner Friendly'],
      stock: 35,
    },
    {
      id: 'co-3',
      title: 'Advanced Drop Method',
      price: 280,
      grade: 'Advanced',
      description: 'Advanced drop method for high-volume cashouts. Multiple drop locations.',
      features: ['Multiple Drops', 'High Volume', 'Stealth Guide', 'Premium Support'],
      stock: 12,
    },
  ]
  
  configs.forEach(config => {
    const product: Product = {
      ...config,
      category: 'cash-out',
      image: '',
    }
    product.image = ''
    products.push(product)
  })
  
  return products
}

// RDP Products
const generateRDPProducts = (): Product[] => {
  const products: Product[] = []
  
  const configs = [
    {
      id: 'rdp-1',
      title: 'Admin RDP - 64GB RAM, 16 Cores',
      price: 120,
      grade: 'Ultimate',
      description: 'Ultimate dedicated RDP with admin access. Clean residential IP, perfect for any operation.',
      features: ['64GB RAM', '16 Cores', 'Admin Access', 'Clean Residential IP', '10Gbps Speed'],
      stock: 15,
    },
    {
      id: 'rdp-2',
      title: 'Admin RDP - 32GB RAM, 8 Cores',
      price: 75,
      grade: 'High-Speed',
      description: 'Powerful dedicated RDP with admin access. Clean IP, perfect for carding.',
      features: ['32GB RAM', '8 Cores', 'Admin Access', 'Clean IP', '1Gbps Speed'],
      stock: 25,
    },
    {
      id: 'rdp-3',
      title: 'Standard RDP - 16GB RAM, 4 Cores',
      price: 45,
      grade: 'Standard',
      description: 'Reliable RDP for everyday tasks. Good speed and uptime.',
      features: ['16GB RAM', '4 Cores', 'User Access', 'Shared IP', '500Mbps'],
      stock: 40,
    },
  ]
  
  configs.forEach(config => {
    const product: Product = {
      ...config,
      category: 'rdp',
      image: '',
    }
    product.image = ''
    products.push(product)
  })
  
  return products
}

// Combine all products
export const PRODUCTS: Product[] = [
  ...generateBankLogs(),
  ...generateOffice365Products(),
  ...generateCashOutProducts(),
  ...generateOTPBots(),
  ...generateCreditCards(),
  ...generateRATs(),
  ...generateRDPProducts(),
  ...generatePayPalAccounts(),
]

export const getIconComponent = (name: string) => {
  switch (name) {
    case 'database': return Database
    case 'globe': return Globe
    case 'exchange': return ArrowLeftRight
    case 'smartphone': return Smartphone
    case 'credit-card': return CreditCard
    case 'shield': return Shield
    case 'server': return Server
    case 'wifi': return Wifi
    case 'building': return Building2
    case 'wallet': return Wallet
    case 'bot': return Bot
    case 'monitor': return Monitor
    default: return Database
  }
}
