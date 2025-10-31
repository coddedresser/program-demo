"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ColoringPage from "@/components/coloring-page"
import TracingPage from "@/components/tracing-page"

type AppMode = "coloring" | "tracing"

export default function MainApp() {
  const [mode, setMode] = useState<AppMode>("coloring")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setMode("coloring")}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform ${
              mode === "coloring"
                ? "bg-primary text-primary-foreground shadow-lg scale-105 animate-pulse-glow"
                : "bg-card text-card-foreground hover:bg-primary/10 hover:scale-102"
            }`}
          >
            Coloring
          </Button>
          <Button
            onClick={() => setMode("tracing")}
            className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform ${
              mode === "tracing"
                ? "bg-secondary text-secondary-foreground shadow-lg scale-105 animate-pulse-glow"
                : "bg-card text-card-foreground hover:bg-secondary/10 hover:scale-102"
            }`}
          >
            Tracing
          </Button>
        </div>

        {/* Main Content */}
        <div className="animate-in fade-in-50 duration-500">
          {mode === "coloring" ? <ColoringPage /> : <TracingPage />}
        </div>
      </div>
    </div>
  )
}
