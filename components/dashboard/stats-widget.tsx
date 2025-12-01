"use client"

import { Card } from "@/components/ui/card"

interface StatsWidgetProps {
  label: string
  value: number
  icon: string
}

export default function StatsWidget({ label, value, icon }: StatsWidgetProps) {
  return (
    <Card className="p-6 bg-card border border-border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </Card>
  )
}
