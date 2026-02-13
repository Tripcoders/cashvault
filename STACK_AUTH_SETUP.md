# Stack Auth Integration for CashVault

This document outlines the Stack Auth configuration for the CashVault marketplace.

## Configuration Files

### Environment Variables (`.env.local`)

```env
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=4805e0ce-fbfc-46b1-a3f1-34a3c1b585ac
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_jx344bb10ehydkj40jyq5eqvj2bd132trdv6z618vrj4r
STACK_SECRET_SERVER_KEY=ssk_1w8xf28q9x0z75cmq70ghjzd9c8zf35cnvytg6b82e4t8
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Server Configuration (`src/stack.ts`)

The server-side Stack Auth app is configured to use Next.js cookies for session storage:

```typescript
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
    tokenStore: "nextjs-cookie",
});
```

### Client Configuration (`src/lib/stack-client.ts`)

Client-side configuration for browser-based auth operations:

```typescript
"use client";

import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
    tokenStore: "cookie",
});
```

## Authentication Flow

### 1. Sign In / Sign Up

- Users navigate to `/handler/sign-in` or `/handler/sign-up`
- Stack Auth's built-in UI components handle the authentication
- After successful auth, users are redirected back to the app

### 2. Protected Routes

The middleware (`src/middleware.ts`) protects the following routes:
- `/marketplace`
- `/profile`
- `/purchases`
- `/wallet`
- `/settings`
- `/api/user/*`

Unauthenticated users are redirected to `/handler/sign-in`.

### 3. User Data Sync

When a user signs in, the app syncs their data to the local database via `/api/user/sync`:

```typescript
// Creates or updates the user in Prisma DB
const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: { email: user.primaryEmail, username: user.displayName },
    create: { id: user.id, email: user.primaryEmail, username: user.displayName, balance: 0.0 },
});
```

## Components

### Using Stack Auth in Components

```typescript
import { useUser } from "@stackframe/stack";

function MyComponent() {
  const user = useUser();
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome, {user.displayName}!</div>;
}
```

### Sign Out

```typescript
const user = useUser();
await user.signOut();
window.location.href = '/';
```

## API Route Protection

Server-side API routes are protected using `stackServerApp`:

```typescript
import { stackServerApp } from '@/stack';

export async function GET() {
    const user = await stackServerApp.getUser();
    
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Process authenticated request...
}
```

## Stack Auth Dashboard

Manage your project at: https://app.stack-auth.com

Project ID: `4805e0ce-fbfc-46b1-a3f1-34a3c1b585ac`

## Deployment Checklist

- [ ] Update `NEXT_PUBLIC_APP_URL` in `.env.local` to production URL
- [ ] Add production environment variables to hosting platform
- [ ] Configure callback URLs in Stack Auth dashboard
- [ ] Test authentication flow in production environment
- [ ] Verify protected routes are properly secured

## Security Notes

- `STACK_SECRET_SERVER_KEY` should never be exposed to the client
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` is safe to use in browser
- Session cookies are httpOnly and secure in production
- Middleware ensures protected routes cannot be bypassed
