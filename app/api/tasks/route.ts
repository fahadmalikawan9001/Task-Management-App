import { auth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock data - replace with real database queries
  const tasks = [
    {
      id: "1",
      title: "Design dashboard mockups",
      description: "Create initial designs for the dashboard interface",
      priority: "high",
      status: "in-progress",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["design", "ui"],
      categoryId: "work",
    },
    {
      id: "2",
      title: "Review PR feedback",
      priority: "medium",
      status: "todo",
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["code-review"],
      categoryId: "work",
    },
    {
      id: "3",
      title: "Buy groceries",
      priority: "low",
      status: "todo",
      tags: ["shopping"],
      categoryId: "personal",
    },
  ]

  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, description, priority = "medium", categoryId } = await req.json()

  // Mock create - replace with real database
  const newTask = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    description,
    priority,
    status: "todo",
    categoryId,
    tags: [],
  }

  return NextResponse.json(newTask)
}
