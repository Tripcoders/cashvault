import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

export const metadata: Metadata = {
  title: "CashVault - Elite Financial Market",
  description: "Premium cash out tools, bank logs, RATs, and financial instruments. Professional-grade resources for serious operators.",
  keywords: ["Marketplace", "Financial Tools", "Cash Out", "Bank Logs", "RATs", "Secure"],
  authors: [{ name: "CashVault" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "CashVault - Elite Financial Market",
    description: "Premium cash out tools and financial instruments",
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
      primary: '#2563eb',
    },
    components: {
      button: {
        borderRadius: '9999px',
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/codec-pro" rel="stylesheet" />
      </head>
      <body className="antialiased bg-background text-foreground font-codec">
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
