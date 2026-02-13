import { StackServerApp } from "@stackframe/stack";

// Server-side Stack Auth configuration
// These environment variables are automatically picked up by StackServerApp
// when prefixed with NEXT_PUBLIC_STACK_ and STACK_
export const stackServerApp = new StackServerApp({
    tokenStore: "nextjs-cookie",
    // The project ID, publishable client key, and secret server key
    // are automatically read from environment variables:
    // - NEXT_PUBLIC_STACK_PROJECT_ID
    // - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY  
    // - STACK_SECRET_SERVER_KEY
});
