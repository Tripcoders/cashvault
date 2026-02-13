import { Product } from './data'

// Group products by their "family" - e.g., same bank, same card type, etc.
export type ProductFamilyType = 'bank' | 'card' | 'paypal' | 'otp-bot' | 'rat' | 'rdp' | 'office-365' | 'cash-out' | 'other'

export interface ProductFamily {
  type: ProductFamilyType
  name: string
  products: Product[]
}

// Get the family identifier for a product
export function getProductFamilyId(product: Product): string {
  switch (product.category) {
    case 'bank-logs':
      return product.bankName || 'unknown-bank'
    case 'cc-topup':
      return product.cardType || 'unknown-card'
    case 'paypal':
      return 'paypal'
    case 'otp-bot':
      return product.otpProvider || 'otp-bot'
    case 'rat':
      return product.ratType || 'rat'
    case 'rdp':
      return 'rdp'
    case 'office-365':
      return 'office-365'
    case 'cash-out':
      return 'cash-out'
    default:
      return product.id
  }
}

// Get the family type
export function getProductFamilyType(product: Product): ProductFamilyType {
  switch (product.category) {
    case 'bank-logs':
      return 'bank'
    case 'cc-topup':
      return 'card'
    case 'paypal':
      return 'paypal'
    case 'otp-bot':
      return 'otp-bot'
    case 'rat':
      return 'rat'
    case 'rdp':
      return 'rdp'
    case 'office-365':
      return 'office-365'
    case 'cash-out':
      return 'cash-out'
    default:
      return 'other'
  }
}

// Get display name for family
export function getProductFamilyName(product: Product): string {
  switch (product.category) {
    case 'bank-logs':
      return product.bankName || 'Bank Log'
    case 'cc-topup':
      return product.cardType || 'Credit Card'
    case 'paypal':
      return 'PayPal Account'
    case 'otp-bot':
      return `${product.otpProvider || 'OTP'} Bot`
    case 'rat':
      return `${product.ratType || 'Remote Access'} Tool`
    case 'rdp':
      return 'RDP Server'
    case 'office-365':
      return 'Office 365 Leads'
    case 'cash-out':
      return 'Cash Out Method'
    default:
      return product.title
  }
}

// Group all products by their families
export function groupProductsByFamily(products: Product[]): Map<string, ProductFamily> {
  const families = new Map<string, ProductFamily>()
  
  products.forEach(product => {
    const familyId = getProductFamilyId(product)
    const existing = families.get(familyId)
    
    if (existing) {
      existing.products.push(product)
    } else {
      families.set(familyId, {
        type: getProductFamilyType(product),
        name: getProductFamilyName(product),
        products: [product]
      })
    }
  })
  
  // Sort products within each family by price (ascending)
  families.forEach(family => {
    family.products.sort((a, b) => a.price - b.price)
  })
  
  return families
}

// Get variants for a specific product
export function getProductVariants(product: Product, allProducts: Product[]): Product[] {
  const familyId = getProductFamilyId(product)
  const familyType = getProductFamilyType(product)
  
  // Only show variants for product types that have meaningful variations
  if (familyType === 'other') {
    return [product]
  }
  
  return allProducts
    .filter(p => getProductFamilyId(p) === familyId)
    .sort((a, b) => a.price - b.price)
}

// Check if product has multiple variants
export function hasMultipleVariants(product: Product, allProducts: Product[]): boolean {
  const variants = getProductVariants(product, allProducts)
  return variants.length > 1
}

// Format variant label based on product type
export function getVariantLabel(product: Product): string {
  switch (product.category) {
    case 'bank-logs':
      return product.bankBalance || 'Unknown Balance'
    case 'cc-topup':
      // Extract limit from title
      const limitMatch = product.title.match(/\$([\d,]+)/)
      return limitMatch ? `$${limitMatch[1]} Limit` : 'Unknown Limit'
    case 'paypal':
      return product.paypalBalance || 'Unknown Balance'
    default:
      return product.title
  }
}

// Get variant subtitle
export function getVariantSubtitle(product: Product): string {
  switch (product.category) {
    case 'bank-logs':
      return `Price: $${product.price} • Stock: ${product.stock}`
    case 'cc-topup':
      return `$${product.price} • ${product.stock} available`
    case 'paypal':
      return `$${product.price} • ${product.stock} accounts`
    default:
      return `$${product.price}`
  }
}
