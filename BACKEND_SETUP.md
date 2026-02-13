# CashVault Backend Setup Guide

## Overview

**Yes, Neon PostgreSQL will handle your entire backend!** It's a powerful serverless PostgreSQL database that scales automatically.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                         │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router                                         │
│  ├── API Routes (/api/*)                                    │
│  ├── Server Components                                      │
│  └── Admin Panel (/admin)                                   │
├─────────────────────────────────────────────────────────────┤
│  Prisma ORM                                                 │
│  ├── Schema Definition                                      │
│  ├── Connection Pooling                                     │
│  └── Type-safe Queries                                      │
├─────────────────────────────────────────────────────────────┤
│  Neon Serverless PostgreSQL                                 │
│  ├── Auto-scaling                                           │
│  ├── Branching (dev/prod)                                   │
│  └── Point-in-time Recovery                                 │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Entities

1. **Users** - All registered users with roles (USER/ADMIN/SUPPORT)
2. **LoginHistory** - Track user login activity
3. **CryptoWallets** - Generated addresses for deposits
4. **Transactions** - Financial ledger (deposits, purchases, refunds)
5. **Products** - Your marketplace inventory
6. **Orders** - Customer purchases
7. **Reviews** - Product ratings
8. **Tickets** - Support system

### User Roles

- **USER** - Regular customers
- **ADMIN** - Full access to admin panel
- **SUPPORT** - Can view and respond to tickets

## Setup Instructions

### 1. Get Neon Database

1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection strings

### 2. Configure Environment

Update `.env.local`:

```env
# Neon Serverless PostgreSQL
# Connection pooling (for serverless)
DATABASE_URL="postgresql://[user]:[password]@[host].neon.tech/[dbname]?sslmode=require&pgbouncer=true"
# Direct connection (for migrations)
DIRECT_URL="postgresql://[user]:[password]@[host].neon.tech/[dbname]?sslmode=require"
```

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed with test data
npx prisma db seed
```

### 4. Create First Admin

1. Sign up/in to your app normally
2. Visit: `POST /api/admin/setup` (or run the curl command)
3. You'll be promoted to admin automatically

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -b "your_session_cookie"
```

### 5. Access Admin Panel

Navigate to `/admin` after becoming an admin.

## API Endpoints

### Admin APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Dashboard statistics |
| `/api/admin/users` | GET | List users with pagination |
| `/api/admin/users/[id]` | GET/PATCH/DELETE | User management |
| `/api/admin/orders` | GET | List all orders |
| `/api/admin/orders/[id]` | GET/PATCH | Order management |
| `/api/admin/transactions` | GET/POST | View/create transactions |
| `/api/admin/tickets` | GET | List support tickets |
| `/api/admin/tickets/[id]` | GET/PATCH/POST | Ticket management |

### User APIs

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/user/sync` | POST | Sync Stack Auth user to DB |
| `/api/user/topup` | POST | Add funds to account |
| `/api/products` | GET | List products |
| `/api/otp` | POST | Send OTP codes |

## Admin Features

### Dashboard
- Real-time statistics
- Revenue tracking
- User growth charts
- Top products
- Recent activity

### User Management
- View all users
- Search and filter
- Ban/unban users
- Adjust balances
- Change user roles
- View user activity

### Order Management
- View all orders
- Update order status
- Process refunds
- Order details

### Transaction History
- View all transactions
- Manual adjustments
- Deposit tracking
- Refund processing

### Support Tickets
- View all tickets
- Priority management
- Respond to users
- Status updates

## Why Neon?

✅ **Serverless** - Scales to zero when not in use  
✅ **Auto-scaling** - Handles traffic spikes automatically  
✅ **Branching** - Create dev/staging branches instantly  
✅ **Connection Pooling** - Built-in PgBouncer support  
✅ **Type-safe** - Works perfectly with Prisma  
✅ **Generous Free Tier** - 500MB storage, 190 compute hours  

## Monitoring Your Users

The admin panel gives you complete visibility:

1. **User Signups** - See new registrations in real-time
2. **Login Activity** - Track IP addresses and timestamps
3. **Purchase History** - View every order
4. **Balance Changes** - Monitor all transactions
5. **Support Requests** - Handle tickets efficiently

## Production Checklist

- [ ] Use separate Neon branch for production
- [ ] Enable connection pooling
- [ ] Set up backups (automatic with Neon)
- [ ] Configure monitoring/alerts
- [ ] Set up proper admin users
- [ ] Remove setup endpoint after first admin
- [ ] Enable Row Level Security (optional)

## Security Notes

1. All admin routes check for ADMIN role
2. Stack Auth handles authentication
3. Database connections use SSL
4. API routes validate all inputs
5. No sensitive data exposed in responses
