"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import ColoringPage from "@/components/coloring-page"
import TracingPage from "@/components/tracing-page"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"

type AppMode = "coloring" | "tracing"

// --- This inner component uses useSearchParams safely inside Suspense ---
function AppPageContent() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<AppMode>("coloring")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const modeParam = searchParams.get("mode")
    if (modeParam === "tracing" || modeParam === "coloring") {
      setMode(modeParam as AppMode)
    }
  }, [searchParams])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={toggleSidebar}
        isMenuOpen={isSidebarOpen}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="app"
      />

      {/* Main Content */}
      <div className="container max-w-md mx-auto px-4 py-6 pt-24">
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

        {/* Page Content */}
        <div className="animate-in fade-in-50 duration-500">
          {mode === "coloring" ? <ColoringPage /> : <TracingPage />}
        </div>
      </div>
    </div>
  )
}

// --- Export default wrapped in Suspense ---
export default function AppPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AppPageContent />
    </Suspense>
  )
}
