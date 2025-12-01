"use client"

import { SignIn } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export default function SignInPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">TaskFlow</h1>
          <p className="text-muted-foreground">Stay organized. Get things done.</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}
