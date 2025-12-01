"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"

export default function SettingsPage() {
  const { user } = useUser()
  const [theme, setTheme] = useState("light")
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(false)

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

        <div className="mt-8">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Settings</Button>
        </div>
      </main>
    </div>
  )
}
