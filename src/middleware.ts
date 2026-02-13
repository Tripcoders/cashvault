import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedPaths = [
    "/marketplace",
    "/profile",
    "/purchases", 
    "/wallet",
    "/settings",
    "/api/user",
];

// Auth routes that should redirect to home if already logged in
const authPaths = [
    "/handler/sign-in",
    "/handler/sign-up",
    "/handler/forgot-password",
];

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(path => 
        pathname === path || pathname.startsWith(`${path}/`)
    );
    
    // Check if the path is an auth path
    const isAuthPath = authPaths.some(path => 
        pathname === path || pathname.startsWith(`${path}/`)
    );
    
    // Get the Stack Auth session cookie
    const stackSession = request.cookies.get("stack-session");
    const isAuthenticated = !!stackSession;
    
    // Redirect unauthenticated users from protected routes to sign-in
    if (isProtectedPath && !isAuthenticated) {
        const signInUrl = new URL("/handler/sign-in", request.url);
        signInUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(signInUrl);
    }
    
    // Redirect authenticated users from auth routes to home
    if (isAuthPath && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
