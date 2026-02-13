'use client'

import React from 'react'
import { useUser } from "@stackframe/stack";
import { User } from 'lucide-react'
import Link from 'next/link'

export function UserAuthButton() {
  const user = useUser()

  if (user) {
    return null // User is authenticated, ProfileDropdown will be shown instead
  }

  return (
    <Link
      href="/handler/sign-in"
      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all duration-200"
    >
      <User className="w-4 h-4" />
      Sign In
    </Link>
  )
}
