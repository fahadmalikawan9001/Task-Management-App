"use client"

import type React from "react"

import { useState } from "react"
import TaskCard from "./task-card"
import { GripVertical } from "lucide-react"

interface Task {
  id: string
  title: string
  description?: string
  priority: string
  status: string
  dueDate?: string
  tags?: string[]
}

interface KanbanBoardProps {
  tasks: Task[]
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const [tasksByStatus, setTasksByStatus] = useState({
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  })

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("task", JSON.stringify(task))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    const task = JSON.parse(e.dataTransfer.getData("task"))

    if (task.status === newStatus) return

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setTasksByStatus((prev) => ({
          ...prev,
          [task.status]: prev[task.status as keyof typeof prev].filter((t) => t.id !== task.id),
          [newStatus]: [...(prev[newStatus as keyof typeof prev] || []), { ...task, status: newStatus }],
        }))
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const statuses = [
    { key: "todo", label: "To Do", color: "bg-blue-100 dark:bg-blue-900" },
    { key: "in-progress", label: "In Progress", color: "bg-yellow-100 dark:bg-yellow-900" },
    { key: "done", label: "Done", color: "bg-green-100 dark:bg-green-900" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statuses.map(({ key, label, color }) => (
        <div
          key={key}
          className={`${color} rounded-lg p-4 min-h-96`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, key)}
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <GripVertical size={16} />
            {label}
            <span className="ml-auto bg-background/50 px-2 py-1 rounded text-sm">
              {tasksByStatus[key as keyof typeof tasksByStatus].length}
            </span>
          </h3>
          <div className="space-y-3">
            {tasksByStatus[key as keyof typeof tasksByStatus].map((task) => (
              <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)}>
                <TaskCard task={task} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
