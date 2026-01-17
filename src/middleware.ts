import { stackServerApp } from "@/stack";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    // Stack Auth handles its own middleware routing internally or via specific handlers
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
