"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: "1", name: "Work", color: "#3b82f6" },
    { id: "2", name: "Personal", color: "#8b5cf6" },
    { id: "3", name: "Health", color: "#ec4899" },
  ])
  const [newCategory, setNewCategory] = useState("")
  const [newColor, setNewColor] = useState("#3b82f6")

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    setCategories([
      ...categories,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newCategory,
        color: newColor,
      },
    ])
    setNewCategory("")
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="" />
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Categories</h1>

        <Card className="p-6 bg-card border border-border mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Create New Category</h2>
          <div className="flex gap-3">
            <Input
              placeholder="Category name..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border-border bg-secondary"
            />
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <Button onClick={handleAddCategory} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus size={18} className="mr-2" />
              Add
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat.id} className="p-4 bg-card border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-foreground font-medium">{cat.name}</span>
              </div>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
              >
                <Trash2 size={18} />
              </button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
