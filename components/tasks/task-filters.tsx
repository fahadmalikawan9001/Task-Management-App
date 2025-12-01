"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface TaskFiltersProps {
  filters: {
    priority: string
    status: string
    category: string
    search: string
  }
  onChange: (filters: any) => void
}

export default function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  return (
    <Card className="p-4 bg-card border border-border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="pl-10 border-border bg-secondary"
          />
        </div>
        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          className="px-3 py-2 border border-border rounded-lg bg-secondary text-foreground"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          className="px-3 py-2 border border-border rounded-lg bg-secondary text-foreground"
        >
          <option value="all">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="px-3 py-2 border border-border rounded-lg bg-secondary text-foreground"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="health">Health</option>
        </select>
      </div>
    </Card>
  )
}
