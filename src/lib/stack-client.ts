"use client";

import { StackClientApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";

// Client-side Stack Auth configuration
export const stackClientApp = new StackClientApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
    tokenStore: "cookie",
});

// Hook for auth operations with navigation
export function useStackAuth() {
    const router = useRouter();
    
    return {
        stackClientApp,
        redirectToSignIn: () => router.push("/handler/sign-in"),
        redirectToSignUp: () => router.push("/handler/sign-up"),
        redirectToHome: () => router.push("/"),
    };
}
