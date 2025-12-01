"use client"

import { useEffect, useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import KanbanBoard from "@/components/tasks/kanban-board"
import TaskFilters from "@/components/tasks/task-filters"
import { Card } from "@/components/ui/card"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priority: "all",
    status: "all",
    category: "all",
    search: "",
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks")
        const data = await response.json()
        setTasks(data)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  useEffect(() => {
    let filtered = tasks

    if (filters.priority !== "all") {
      filtered = filtered.filter((t) => t.priority === filters.priority)
    }
    if (filters.status !== "all") {
      filtered = filtered.filter((t) => t.status === filters.status)
    }
    if (filters.category !== "all") {
      filtered = filtered.filter((t) => t.categoryId === filters.category)
    }
    if (filters.search) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.tags?.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

    setFilteredTasks(filtered)
  }, [tasks, filters])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="" />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Tasks</h1>
          <p className="text-muted-foreground">Manage and organize your tasks with filters</p>
        </div>

        <TaskFilters filters={filters} onChange={setFilters} />

        {loading ? (
          <Card className="p-8 text-center bg-card border border-border">
            <p className="text-muted-foreground">Loading tasks...</p>
          </Card>
        ) : (
          <KanbanBoard tasks={filteredTasks} />
        )}
      </main>
    </div>
  )
}
