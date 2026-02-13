# Neon Database Setup Guide

## Is Neon Good? YES!

**Neon Serverless PostgreSQL is EXCELLENT:**
- ✅ **Serverless** - Auto-scales from zero to infinity
- ✅ **Generous Free Tier** - 500MB storage, 190 compute hours/month
- ✅ **Connection Pooling** - Built-in PgBouncer (perfect for serverless apps)
- ✅ **Branching** - Create dev/prod branches instantly
- ✅ **Fast** - Cold start ~100ms, hot queries <10ms
- ✅ **Reliable** - 99.95% uptime SLA on paid plans
- ✅ **Prisma Compatible** - Works perfectly with Prisma ORM

## Step-by-Step Setup

### 1. Create Neon Account (2 minutes)

1. Go to https://neon.tech
2. Sign up with GitHub or email
3. Verify your email

### 2. Create Project (2 minutes)

1. Click "New Project"
2. Name it: `cashvault`
3. Choose region: Pick closest to your users (e.g., `US East`)
4. Click "Create Project"

### 3. Get Connection String (1 minute)

1. In your project dashboard, click "Connection Details"
2. Copy the **Prisma** connection string (it looks like this):

```
postgresql://user:password@host.neon.tech/db?sslmode=require&pgbouncer=true&connect_timeout=10
```

### 4. Update Your .env.local

Open `cashvault/.env.local` and replace the placeholder with your real credentials:

```env
# Neon Serverless PostgreSQL
DATABASE_URL="postgresql://your-actual-user:your-actual-password@your-host.neon.tech/cashvault?sslmode=require&pgbouncer=true&connect_timeout=10"
DIRECT_URL="postgresql://your-actual-user:your-actual-password@your-host.neon.tech/cashvault?sslmode=require&connect_timeout=10"
```

**IMPORTANT:** Keep the `?sslmode=require` part!

### 5. Initialize Database (3 minutes)

Run these commands in your terminal:

```bash
# Navigate to your project
cd c:\Users\Buddy Love\Proper-Market-Live\cashvault

# Install Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Verify connection
npx prisma db pull
```

If you see: "✅ Database schema is in sync" - you're done!

### 6. Test the Database

Create a test file:

```bash
npx ts-node -e "
import { prisma } from './src/lib/prisma';
async function test() {
  const result = await prisma.user.count();
  console.log('✅ Database connected! Users:', result);
}
test();
"
```

## Common Issues

### "Connection refused"
- Make sure you copied the full connection string
- Check that `sslmode=require` is included
- Verify your internet connection

### "Authentication failed"
- The password might have special characters
- Make sure you're using the **Prisma** connection string (not the generic one)

### "Database does not exist"
- Neon creates the database automatically
- If not, run: `npx prisma migrate dev`

## Production Checklist

Before going live:

- [ ] Database connected and migrations run
- [ ] At least 1 admin user created via `/api/admin/setup`
- [ ] Crypto wallet addresses updated (not placeholders)
- [ ] Test user signup/login flow
- [ ] Test deposit flow
- [ ] Test purchase flow
- [ ] Test admin panel access

## Neon Pricing (Optional)

**Free Tier (Perfect to start):**
- 500 MB storage
- 190 compute hours/month
- Unlimited databases
- Community support

**Paid Plans:**
- Pro: $19/month - 10GB, 300 compute hours
- Scale: Custom pricing

You can run a marketplace with thousands of users on the free tier!

## Next Steps

After database is connected:
1. Test the app locally
2. Deploy to Vercel
3. Set environment variables in Vercel
4. You're live! 🚀
