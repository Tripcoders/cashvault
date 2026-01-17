
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // Clean up existing data to avoid duplicates (optional, use with caution in production)
    // await prisma.orderItem.deleteMany()
    // await prisma.order.deleteMany()
    // await prisma.product.deleteMany()
    // await prisma.user.deleteMany()

    const productsData = [
        {
            id: 'bl-1',
            title: 'Chase Bank - High Balance',
            category: 'bank-logs',
            price: 1200,
            grade: 'High',
            description: 'Verified Chase bank log with $15,000+ balance. Includes email access and cookies.',
            features: ['Balance: $15,000+', 'Email Access', 'Cookies Included', '2FA Disabled'],
            image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=800',
            stock: 12,
        },
        {
            id: 'bl-2',
            title: 'Wells Fargo - Medium Balance',
            category: 'bank-logs',
            price: 650,
            grade: 'Medium',
            description: 'Wells Fargo account with $6,500 balance. Good for quick cashouts.',
            features: ['Balance: $6,500', 'User Agent Included', 'Full Info'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
            stock: 28,
        },
        {
            id: 'bl-3',
            title: 'BOA - Low Balance',
            category: 'bank-logs',
            price: 350,
            grade: 'Low',
            description: 'Bank of America account with $2,000 balance. Perfect for beginners.',
            features: ['Balance: $2,000', 'Login Only'],
            image: 'https://images.unsplash.com/photo-1616803140344-6656a10d95c9?auto=format&fit=crop&q=80&w=800',
            stock: 45,
        },
        {
            id: 'bl-4',
            title: 'Citibank - Premium',
            category: 'bank-logs',
            price: 1800,
            grade: 'Premium',
            description: 'Premium Citibank account with $25,000+ balance. Full access with cookies and proxy.',
            features: ['Balance: $25k+', 'Cookies + Proxy', 'Email Access', 'VPN Recommended'],
            image: 'https://images.unsplash.com/photo-1554224311-beee460201f9?auto=format&fit=crop&q=80&w=800',
            stock: 6,
        },
        {
            id: 'bl-5',
            title: 'Capital One - Medium',
            category: 'bank-logs',
            price: 550,
            grade: 'Medium',
            description: 'Capital One account with $5,500 balance. Includes full login credentials.',
            features: ['Balance: $5,500', 'Login Credentials', 'Recent Activity'],
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
            stock: 18,
        },
        {
            id: 'off-1',
            title: 'Corporate Office 365 Leads',
            category: 'office-365',
            price: 8,
            grade: 'Verified',
            description: 'High-quality corporate leads verified within last 24 hours.',
            features: ['Corporate Domain', 'Active', 'Valid Login'],
            image: 'https://images.unsplash.com/photo-1633419461186-7d40a23933a7?auto=format&fit=crop&q=80&w=800',
            stock: 500,
        },
        {
            id: 'off-2',
            title: 'Bulk Mixed Leads (100x)',
            category: 'office-365',
            price: 350,
            grade: 'Bulk',
            description: 'Pack of 100 mixed Office 365 leads. 85% validity guarantee.',
            features: ['100 Accounts', 'Mixed Domains', 'Instant Delivery'],
            image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
            stock: 50,
        },
        {
            id: 'off-3',
            title: 'Enterprise Office 365 (500x)',
            category: 'office-365',
            price: 1500,
            grade: 'Enterprise',
            description: 'Large enterprise pack with Fortune 500 company leads.',
            features: ['500 Accounts', 'Enterprise Domains', 'Premium Quality'],
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
            stock: 10,
        },
        {
            id: 'co-1',
            title: 'Express Cashout Method 2024',
            category: 'cash-out',
            price: 85,
            grade: 'Premium',
            description: 'Latest working method for instant cashouts. Includes PDF guide and video tutorial.',
            features: ['Instant Cashout', 'Video Tutorial', 'Support Included'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
            stock: 15,
        },
        {
            id: 'co-2',
            title: 'Standard Cashout Guide',
            category: 'cash-out',
            price: 45,
            grade: 'Standard',
            description: 'Reliable method for standard transfers. 90% success rate.',
            features: ['Step-by-step PDF', 'List of BINs', 'Basic Support'],
            image: 'https://images.unsplash.com/photo-1620714223084-87bd6c2a3be4?auto=format&fit=crop&q=80&w=800',
            stock: 30,
        },
        {
            id: 'otp-1',
            title: 'Advanced OTP Interceptor',
            category: 'otp-bot',
            price: 250,
            grade: 'Advanced',
            description: 'Supports multiple providers (Chase, Wells, BOA, Paypal, etc). 99% success rate.',
            features: ['Multi-Bank Support', 'Voice/SMS Mode', 'Real-time Panel'],
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
            stock: 5,
        },
        {
            id: 'otp-2',
            title: 'Basic OTP Bot',
            category: 'otp-bot',
            price: 75,
            grade: 'Basic',
            description: 'Entry-level OTP bot for common banks. Easy setup.',
            features: ['Major Banks', 'SMS Only', 'Simple Interface'],
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
            stock: 12,
        },
        {
            id: 'cc-1',
            title: 'High-Limit CC Top Up',
            category: 'cc-topup',
            price: 80,
            grade: 'High-Limit',
            description: 'Top up method for high-limit credit cards. Works worldwide.',
            features: ['High Limits', 'Worldwide', 'Instant'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
            stock: 10,
        },
        {
            id: 'cc-2',
            title: 'Standard CC Top Up',
            category: 'cc-topup',
            price: 25,
            grade: 'Standard',
            description: 'Basic credit card top up method. Reliable and tested.',
            features: ['Standard Limits', 'US/UK/CA', 'Quick Process'],
            image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800',
            stock: 35,
        },
        {
            id: 'rat-1',
            title: 'Android RAT Ultimate',
            category: 'rat',
            price: 120,
            grade: 'Mobile',
            description: 'Full control over Android devices. Silent installation.',
            features: ['Screen Control', 'File Manager', 'GPS Tracking'],
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
            stock: 8,
        },
        {
            id: 'rat-2',
            title: 'Desktop RAT Pro',
            category: 'rat',
            price: 90,
            grade: 'Desktop',
            description: 'Windows RAT with advanced features. Undetectable by most AVs.',
            features: ['Keylogger', 'Screen Capture', 'File Transfer'],
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            stock: 15,
        },
        {
            id: 'rdp-1',
            title: 'Admin RDP - 32GB RAM',
            category: 'rdp',
            price: 65,
            grade: 'High-Speed',
            description: 'Powerful dedicated RDP with admin access. Clean IP, perfect for carding.',
            features: ['32GB RAM', 'Admin Access', 'Clean IP', '1Gbps Speed'],
            image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800',
            stock: 22,
        },
        {
            id: 'rdp-2',
            title: 'Standard RDP - 16GB',
            category: 'rdp',
            price: 35,
            grade: 'Standard',
            description: 'Reliable RDP for everyday tasks. Good speed and uptime.',
            features: ['16GB RAM', 'User Access', 'Shared IP', '500Mbps'],
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
            stock: 40,
        },
        {
            id: 'pp-1',
            title: 'Verified Business PayPal',
            category: 'paypal',
            price: 450,
            grade: 'Premium',
            description: 'Aged business account with transaction history. High limits.',
            features: ['Business Account', 'Aged 2+ Years', 'Docs Included'],
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
            stock: 8,
        },
        {
            id: 'pp-2',
            title: 'Verified Personal PayPal',
            category: 'paypal',
            price: 180,
            grade: 'Verified',
            description: 'Personal PayPal account with full verification. Ready to use.',
            features: ['Personal Account', 'Verified', 'Bank Linked'],
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800',
            stock: 25,
        },
    ]

    for (const product of productsData) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        })
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
