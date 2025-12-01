"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function QuickAddTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        setTitle("")
        setDescription("")
        window.location.reload()
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Add Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-border bg-background"
        />
        <Textarea
          placeholder="Add description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-border bg-background resize-none"
          rows={3}
        />
        <Button
          type="submit"
          disabled={loading || !title.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? "Creating..." : "Add Task"}
        </Button>
      </form>
    </Card>
  )
}
