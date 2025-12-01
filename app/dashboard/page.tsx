import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="User" />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Welcome to TaskFlow</h2>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="p-6 bg-card border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Today</p>
                  <p className="text-3xl font-bold text-foreground">0</p>
                </div>
                <span className="text-4xl">📅</span>
              </div>
            </Card>
            <Card className="p-6 bg-card border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-foreground">0</p>
                </div>
                <span className="text-4xl">✅</span>
              </div>
            </Card>
            <Card className="p-6 bg-card border border-border hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-3xl font-bold text-foreground">0</p>
                </div>
                <span className="text-4xl">⏳</span>
              </div>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>
              <p className="text-muted-foreground mb-4">Start managing your tasks by creating one below:</p>
              <Link
                href="/tasks"
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition"
              >
                Go to Tasks
              </Link>
            </Card>
            <Card className="p-6 bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>✓ Create and manage tasks</li>
                <li>✓ Organize with categories</li>
                <li>✓ Set priorities and due dates</li>
                <li>✓ Track your progress</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
