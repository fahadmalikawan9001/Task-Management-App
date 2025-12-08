"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useUser } from "@clerk/nextjs"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"

export default function SettingsPage() {
  const { user } = useUser()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme,
          notifications,
          emailDigest,
        }),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } else {
        console.error("[v0] Failed to save settings")
      }
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={user?.firstName || "User"} />
      <main className="p-4 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

        <Card className="p-6 bg-card border border-border mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <Input
                type="email"
                value={user?.emailAddresses?.[0]?.emailAddress || ""}
                disabled
                className="border-border bg-secondary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">First Name</label>
                <Input type="text" value={user?.firstName || ""} disabled className="border-border bg-secondary" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Last Name</label>
                <Input type="text" value={user?.lastName || ""} disabled className="border-border bg-secondary" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-foreground">Theme</label>
              <div className="flex gap-2">
                <Toggle
                  pressed={theme === "light"}
                  onPressedChange={() => setTheme("light")}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <Sun size={18} />
                </Toggle>
                <Toggle
                  pressed={theme === "dark"}
                  onPressedChange={() => setTheme("dark")}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <Moon size={18} />
                </Toggle>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-foreground">Enable notifications</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-foreground">Daily email digest</label>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
            </div>
          </div>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button
            onClick={handleSaveSettings}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Saving..." : saved ? "Saved!" : "Save Settings"}
          </Button>
          {saved && <span className="text-green-600 text-sm flex items-center">Settings saved successfully</span>}
        </div>
      </main>
    </div>
  )
}
