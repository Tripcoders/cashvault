import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashVault - Premium Digital Assets Marketplace",
  description: "Secure marketplace for premium digital assets. Anonymous, secure, and instant delivery with 24/7 support.",
  keywords: ["Marketplace", "Digital Assets", "Crypto", "Premium", "Secure"],
  authors: [{ name: "CashVault" }],
  openGraph: {
    title: "CashVault - Premium Digital Assets",
    description: "Secure marketplace for premium digital assets",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stackTheme = {
    colors: {
      primary: '#2563eb', // Blue-600 matched
    },
    components: {
      button: {
        borderRadius: '9999px', // Pill buttons
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme theme={stackTheme}>
            {children}
            <Toaster />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
