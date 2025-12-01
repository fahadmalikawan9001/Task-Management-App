"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Task {
  id: string
  title: string
  status: string
  priority: string
}

interface RecentTasksProps {
  tasks: Task[]
}

export default function RecentTasks({ tasks }: RecentTasksProps) {
  return (
    <Card className="p-6 bg-card border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Tasks</h2>
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks yet. Create one to get started.</p>
          <Link href="/tasks/new" className="text-primary hover:underline mt-2 inline-block">
            Create a task
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="block p-3 rounded-lg bg-secondary hover:bg-muted transition"
            >
              <p className="text-foreground font-medium">{task.title}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded bg-background text-muted-foreground">{task.status}</span>
                <span className="text-xs px-2 py-1 rounded bg-background text-muted-foreground">{task.priority}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
