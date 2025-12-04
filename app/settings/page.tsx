import { auth } from "@clerk/nextjs/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { theme, notifications, emailDigest } = body

    // Store settings in memory (in production, save to database)
    const settings = {
      userId,
      theme,
      notifications,
      emailDigest,
      savedAt: new Date().toISOString(),
    }

    console.log("[v0] Settings saved:", settings)

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
      settings,
    })
  } catch (error) {
    console.error("[v0] Error saving settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
