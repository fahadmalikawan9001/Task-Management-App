"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Flag, Calendar } from "lucide-react"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description?: string
    priority: string
    dueDate?: string
    tags?: string[]
  }
}

export default function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  }

  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className="p-4 bg-card border border-border hover:shadow-md transition cursor-grab active:cursor-grabbing">
        <h4 className="font-medium text-foreground mb-2 line-clamp-2">{task.title}</h4>
        {task.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>}
        <div className="flex gap-2 flex-wrap">
          <span
            className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${priorityColors[task.priority as keyof typeof priorityColors]}`}
          >
            <Flag size={12} />
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
              <Calendar size={12} />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        {task.tags && task.tags.length > 0 && (
          <div className="mt-2 flex gap-1 flex-wrap">
            {task.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </Link>
  )
}
