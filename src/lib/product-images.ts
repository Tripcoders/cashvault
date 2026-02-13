// Product Image Generation System using Brandfetch API

// Brand colors for each category - specific brand colors
const BRAND_COLORS: Record<string, { primary: string; secondary: string; accent: string }> = {
  // Bank colors
  'Chase': { primary: '#0b4a9c', secondary: '#0b3573', accent: '#1e5bb5' },
  'Wells Fargo': { primary: '#d71e28', secondary: '#a81820', accent: '#e94b54' },
  'Bank of America': { primary: '#e31837', secondary: '#b01229', accent: '#f04a65' },
  'BOA': { primary: '#e31837', secondary: '#b01229', accent: '#f04a65' },
  'Citibank': { primary: '#003b70', secondary: '#002a52', accent: '#005aa3' },
  'Capital One': { primary: '#d03027', secondary: '#a0251e', accent: '#e85a52' },
  'PNC Bank': { primary: '#f47b20', secondary: '#d46210', accent: '#ff9a4d' },
  'US Bank': { primary: '#005f9e', secondary: '#004570', accent: '#007bc7' },
  'TD Bank': { primary: '#00ae4d', secondary: '#008a3d', accent: '#2dd16f' },
  'Truist': { primary: '#5e2e91', secondary: '#45206d', accent: '#7c4db3' },
  'Goldman Sachs': { primary: '#7399c6', secondary: '#5579a5', accent: '#91b5db' },
  'Morgan Stanley': { primary: '#003087', secondary: '#002266', accent: '#0047c2' },
  'Charles Schwab': { primary: '#0072ce', secondary: '#005aa3', accent: '#0091ff' },
  'Fidelity': { primary: '#00843d', secondary: '#00662f', accent: '#00a84f' },
  'American Express Bank': { primary: '#016fd0', secondary: '#0159a8', accent: '#2a9cff' },
  'HSBC': { primary: '#db0011', secondary: '#a8000d', accent: '#ff3344' },
  'Barclays': { primary: '#00aeef', secondary: '#0088bb', accent: '#4dcfff' },
  'Lloyds Bank': { primary: '#006a4d', secondary: '#00523c', accent: '#008f69' },
  'RBC': { primary: '#005daa', secondary: '#004885', accent: '#007bd4' },
  'Scotiabank': { primary: '#ed0722', secondary: '#bb051b', accent: '#ff3d52' },
  'Deutsche Bank': { primary: '#0018a8', secondary: '#001280', accent: '#0029e0' },
  'BNP Paribas': { primary: '#00915a', secondary: '#007045', accent: '#00c478' },
  'ING': { primary: '#ff6200', secondary: '#cc4e00', accent: '#ff8a40' },
  'ANZ': { primary: '#0072c6', secondary: '#005a9e', accent: '#0091f0' },
  'Commonwealth Bank': { primary: '#fedd00', secondary: '#ccb100', accent: '#ffeb4d' },
  'Westpac': { primary: '#d5002a', secondary: '#a80021', accent: '#ff3355' },
  'Santander': { primary: '#ec0000', secondary: '#b80000', accent: '#ff3333' },
  'BBVA': { primary: '#004481', secondary: '#003366', accent: '#0066cc' },
  'Itaú': { primary: '#ff7f00', secondary: '#cc6600', accent: '#ffa340' },
  'Bradesco': { primary: '#cc092f', secondary: '#a00725', accent: '#f04063' },
  'UBS': { primary: '#a30836', secondary: '#7a0628', accent: '#d40b4a' },
  'Credit Suisse': { primary: '#002d72', secondary: '#002259', accent: '#0043a8' },
  
  // Default bank colors
  'bank-logs': { primary: '#10B981', secondary: '#059669', accent: '#34D399' },
  
  // Credit card colors
  'cc-topup': { primary: '#3B82F6', secondary: '#2563EB', accent: '#60A5FA' },
  'American Express': { primary: '#016fd0', secondary: '#0159a8', accent: '#2a9cff' },
  
  // PayPal
  'paypal': { primary: '#003087', secondary: '#002266', accent: '#0070ba' },
  
  // OTP Bot
  'otp-bot': { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' },
  
  // RAT
  'rat': { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' },
  
  // RDP
  'rdp': { primary: '#06B6D4', secondary: '#0891B2', accent: '#22D3EE' },
  
  // Office 365
  'office-365': { primary: '#D83B01', secondary: '#a82e00', accent: '#ff632e' },
  
  // Cash out
  'cash-out': { primary: '#EC4899', secondary: '#DB2777', accent: '#F472B6' },
}

// Brandfetch logo URLs
const getBrandfetchUrl = (domain: string): string => {
  return `https://cdn.brandfetch.io/${domain}/fallback/transparent/theme/dark/h/128/w/128/icon`
}

// Direct logo URLs for specific brands
const DIRECT_LOGOS: Record<string, string> = {
  // American Express logomark (centurion icon) - using Wikimedia which has the icon
  'American Express': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png',
  'Amex': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png',
  // CashApp
  'CashApp': 'https://cdn.brandfetch.io/cash.app/fallback/transparent/theme/dark/h/128/w/128/icon',
  'Cash App': 'https://cdn.brandfetch.io/cash.app/fallback/transparent/theme/dark/h/128/w/128/icon',
  // Venmo
  'Venmo': 'https://cdn.brandfetch.io/venmo.com/fallback/transparent/theme/dark/h/128/w/128/icon',
  // Zelle
  'Zelle': 'https://cdn.brandfetch.io/zellepay.com/fallback/transparent/theme/dark/h/128/w/128/icon',
  // Wise
  'Wise': 'https://cdn.brandfetch.io/wise.com/fallback/transparent/theme/dark/h/128/w/128/icon',
  // Western Union
  'Western Union': 'https://cdn.brandfetch.io/westernunion.com/fallback/transparent/theme/dark/h/128/w/128/icon',
  // MoneyGram
  'MoneyGram': 'https://cdn.brandfetch.io/moneygram.com/fallback/transparent/theme/dark/h/128/w/128/icon',
}

// Bank logos
const BANK_LOGOS: Record<string, string> = {
  'Chase': getBrandfetchUrl('chase.com'),
  'Wells Fargo': getBrandfetchUrl('wellsfargo.com'),
  'Bank of America': getBrandfetchUrl('bankofamerica.com'),
  'BOA': getBrandfetchUrl('bankofamerica.com'),
  'Citibank': getBrandfetchUrl('citi.com'),
  'Capital One': getBrandfetchUrl('capitalone.com'),
  'PNC Bank': getBrandfetchUrl('pnc.com'),
  'US Bank': getBrandfetchUrl('usbank.com'),
  'TD Bank': getBrandfetchUrl('td.com'),
  'Truist': getBrandfetchUrl('truist.com'),
  'Goldman Sachs': getBrandfetchUrl('goldmansachs.com'),
  'Morgan Stanley': getBrandfetchUrl('morganstanley.com'),
  'Charles Schwab': getBrandfetchUrl('schwab.com'),
  'Fidelity': getBrandfetchUrl('fidelity.com'),
  'American Express Bank': getBrandfetchUrl('americanexpress.com'),
  'HSBC': getBrandfetchUrl('hsbc.com'),
  'Barclays': getBrandfetchUrl('barclays.co.uk'),
  'Lloyds Bank': getBrandfetchUrl('lloydsbank.com'),
  'RBC': getBrandfetchUrl('rbc.com'),
  'TD Canada': getBrandfetchUrl('td.com'),
  'Scotiabank': getBrandfetchUrl('scotiabank.com'),
  'Deutsche Bank': getBrandfetchUrl('db.com'),
  'Commerzbank': getBrandfetchUrl('commerzbank.com'),
  'BNP Paribas': getBrandfetchUrl('bnpparibas.com'),
  'Société Générale': getBrandfetchUrl('societegenerale.com'),
  'ING': getBrandfetchUrl('ing.com'),
  'ANZ': getBrandfetchUrl('anz.com'),
  'Commonwealth Bank': getBrandfetchUrl('commbank.com.au'),
  'Westpac': getBrandfetchUrl('westpac.com.au'),
  'Santander': getBrandfetchUrl('santander.com'),
  'BBVA': getBrandfetchUrl('bbva.com'),
  'Itaú': getBrandfetchUrl('itau.com.br'),
  'Bradesco': getBrandfetchUrl('bradesco.com.br'),
  'UBS': getBrandfetchUrl('ubs.com'),
  'Credit Suisse': getBrandfetchUrl('credit-suisse.com'),
}

// Get brand colors for product
export function getBrandColors(product: { category: string; bankName?: string; cardType?: string }): { primary: string; secondary: string; accent: string } {
  const { category, bankName, cardType } = product
  
  // Bank logs - use specific bank colors
  if (category === 'bank-logs' && bankName) {
    const bankKey = Object.keys(BRAND_COLORS).find(key => 
      bankName.toLowerCase().includes(key.toLowerCase())
    )
    if (bankKey && BRAND_COLORS[bankKey]) {
      return BRAND_COLORS[bankKey]
    }
  }
  
  // Credit cards
  if (category === 'cc-topup' && cardType) {
    if (cardType.toLowerCase().includes('american express')) {
      return BRAND_COLORS['American Express']
    }
    if (cardType.toLowerCase().includes('chase')) {
      return BRAND_COLORS['Chase']
    }
    if (cardType.toLowerCase().includes('wells fargo')) {
      return BRAND_COLORS['Wells Fargo']
    }
  }
  
  // Other categories
  if (category === 'paypal') return BRAND_COLORS['paypal']
  if (category === 'otp-bot') return BRAND_COLORS['otp-bot']
  if (category === 'rat') return BRAND_COLORS['rat']
  if (category === 'rdp') return BRAND_COLORS['rdp']
  if (category === 'office-365') return BRAND_COLORS['office-365']
  if (category === 'cash-out') return BRAND_COLORS['cash-out']
  
  return BRAND_COLORS['bank-logs']
}

// Get logo URL
export function getLogoUrl(product: { category: string; bankName?: string; cardType?: string; title: string }): string | null {
  const { category, bankName, cardType, title } = product
  
  if (category === 'bank-logs' && bankName) {
    const bankKey = Object.keys(BANK_LOGOS).find(key => 
      bankName.toLowerCase().includes(key.toLowerCase())
    )
    if (bankKey) return BANK_LOGOS[bankKey]
  }
  
  if (category === 'cc-topup' && cardType) {
    if (cardType.toLowerCase().includes('american express')) return DIRECT_LOGOS['American Express']
    if (cardType.toLowerCase().includes('amex')) return DIRECT_LOGOS['Amex']
    if (cardType.toLowerCase().includes('chase')) return getBrandfetchUrl('chase.com')
    if (cardType.toLowerCase().includes('wells fargo')) return getBrandfetchUrl('wellsfargo.com')
    if (cardType.toLowerCase().includes('cashapp') || cardType.toLowerCase().includes('cash app')) return DIRECT_LOGOS['CashApp']
    return getBrandfetchUrl('visa.com')
  }
  
  if (category === 'paypal') return getBrandfetchUrl('paypal.com')
  if (category === 'office-365') return getBrandfetchUrl('microsoft.com')
  
  if (category === 'otp-bot') {
    if (title.toLowerCase().includes('telegram')) return getBrandfetchUrl('telegram.org')
    if (title.toLowerCase().includes('twilio')) return getBrandfetchUrl('twilio.com')
  }
  
  if (category === 'rat') {
    if (title.toLowerCase().includes('android')) return getBrandfetchUrl('android.com')
    if (title.toLowerCase().includes('ios')) return getBrandfetchUrl('apple.com')
    return getBrandfetchUrl('microsoft.com')
  }
  
  if (category === 'rdp') return getBrandfetchUrl('microsoft.com')
  if (category === 'cash-out') {
    if (title.toLowerCase().includes('cashapp') || title.toLowerCase().includes('cash app')) return DIRECT_LOGOS['CashApp']
    if (title.toLowerCase().includes('venmo')) return DIRECT_LOGOS['Venmo']
    if (title.toLowerCase().includes('zelle')) return DIRECT_LOGOS['Zelle']
    if (title.toLowerCase().includes('wise')) return DIRECT_LOGOS['Wise']
    if (title.toLowerCase().includes('western')) return DIRECT_LOGOS['Western Union']
    if (title.toLowerCase().includes('moneygram')) return DIRECT_LOGOS['MoneyGram']
    return DIRECT_LOGOS['CashApp']
  }
  
  return null
}

// Generate banner image
export function generateBannerImage(): string {
  const svg = `
    <svg width="1200" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1e40af;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1.5" fill="white" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bannerGrad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <circle cx="85%" cy="15%" r="180" fill="white" opacity="0.03"/>
      <circle cx="10%" cy="85%" r="120" fill="white" opacity="0.03"/>
      <text x="50" y="100" font-size="48" fill="white" opacity="0.15">🏦</text>
      <text x="200" y="150" font-size="36" fill="white" opacity="0.15">💳</text>
      <text x="1000" y="250" font-size="48" fill="white" opacity="0.15">💰</text>
      <text x="1100" y="100" font-size="36" fill="white" opacity="0.15">🤖</text>
      <text x="50" y="320" font-size="36" fill="white" opacity="0.15">🎯</text>
      <text x="1050" y="350" font-size="42" fill="white" opacity="0.15">💻</text>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}
