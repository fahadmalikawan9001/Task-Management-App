"use client"

import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

interface DashboardHeaderProps {
  userName: string
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-4 md:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">T</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">TaskFlow</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm text-foreground hover:text-primary transition">
            Dashboard
          </Link>
          <Link href="/tasks" className="text-sm text-foreground hover:text-primary transition">
            Tasks
          </Link>
          <Link href="/categories" className="text-sm text-foreground hover:text-primary transition">
            Categories
          </Link>
          <Link href="/settings" className="text-sm text-foreground hover:text-primary transition">
            Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <UserButton />
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-secondary border-t border-border p-4 space-y-2">
          <Link href="/dashboard" className="block py-2 text-foreground hover:text-primary">
            Dashboard
          </Link>
          <Link href="/tasks" className="block py-2 text-foreground hover:text-primary">
            Tasks
          </Link>
          <Link href="/categories" className="block py-2 text-foreground hover:text-primary">
            Categories
          </Link>
          <Link href="/settings" className="block py-2 text-foreground hover:text-primary">
            Settings
          </Link>
          <div className="pt-2 border-t border-border">
            <UserButton />
          </div>
        </nav>
      )}
    </header>
  )
}
