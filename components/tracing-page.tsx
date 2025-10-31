"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Printer, Mic, BookOpen } from "lucide-react"
import TracingCanvas from "@/components/tracing-canvas"
import { printContent } from "@/lib/download-utils"
import AuthGate from "@/components/auth-gate"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { useUserDataCollection } from "@/hooks/use-user-data-collection"
import { getTracingPrompts, getLetterPrompts } from "@/lib/prompts-complete"

const SUGGESTED_PROMPTS = getTracingPrompts()
const LETTER_PROMPTS = getLetterPrompts(8)

interface TracingContent {
  type: "letter" | "number" | "word"
  content: string
  style: "uppercase" | "lowercase" | "cursive"
  description: string
}

export default function TracingPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [tracingContent, setTracingContent] = useState<TracingContent | null>(null)
  
  const {
    isAuthGateOpen,
    closeAuthGate,
    executeWithAuth,
    handleAuthSuccess,
    actionType,
    contentTitle
  } = useAuthGate()
  
  const { trackActivity } = useUserDataCollection()

  const generateTracing = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-tracing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate tracing content")
      }

      const data = await response.json()
      setTracingContent(data)
      
      // Track user activity
      trackActivity('generate_tracing', inputPrompt)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate tracing content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateTracing(prompt)
  }

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt)
    generateTracing(suggestedPrompt)
  }

  const handleDownload = () => {
    if (!tracingContent) return

    executeWithAuth(
      () => {
        // Create a downloadable tracing worksheet
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 800
        canvas.height = 600

        // White background
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw title
        ctx.font = "32px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(tracingContent.description, canvas.width / 2, 60)

        // Draw tracing content
        ctx.font = "200px Arial"
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = 4
        ctx.strokeText(tracingContent.content, canvas.width / 2, 250)

        // Add practice lines
        ctx.strokeStyle = "#ccc"
        ctx.lineWidth = 2
        ctx.setLineDash([10, 10])
        for (let i = 0; i < 3; i++) {
          const y = 350 + i * 80
          ctx.beginPath()
          ctx.moveTo(50, y)
          ctx.lineTo(canvas.width - 50, y)
          ctx.stroke()
        }

        // Download as JPG
        const link = document.createElement("a")
        link.download = `tracing-${tracingContent.content.toLowerCase()}.jpg`
        link.href = canvas.toDataURL('image/jpeg', 0.9)
        link.click()
        
        // Track user activity
        trackActivity('download_tracing', tracingContent.description)
      },
      "download",
      `Tracing Worksheet: ${tracingContent.description}`
    )
  }

  const handlePrint = () => {
    if (tracingContent) {
      executeWithAuth(
        () => {
          printContent(tracingContent.content, tracingContent.description)
          trackActivity('print_tracing', tracingContent.description)
        },
        "print",
        `Tracing Worksheet: ${tracingContent.description}`
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Auth Gate Modal */}
      <AuthGate
        isOpen={isAuthGateOpen}
        onClose={closeAuthGate}
        onSuccess={handleAuthSuccess}
        actionType={actionType}
        contentTitle={contentTitle}
      />

      {!tracingContent && (
        <>
          {/* How to use section */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4 text-center flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5" />
              How to use?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-2xl">✏️</span>
                <span className="text-muted-foreground">Type in the search bar</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <span className="text-muted-foreground">Use ready-made prompts</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-2xl">⬇️</span>
                <span className="text-muted-foreground">Pick Coloring or Tracing</span>
              </li>
            </ul>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-6 animate-bounce-gentle">
              Oh! Here to learn? Let's trace then..
            </h2>
          </div>
        </>
      )}

      {/* Tracing Content Display */}
      {tracingContent && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20 shadow-lg animate-in fade-in-50 duration-500">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-muted-foreground mb-4">{tracingContent.description}</h3>
            <TracingCanvas content={tracingContent.content} />
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleDownload}
              className="border-secondary text-primary hover:bg-secondary/10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-secondary text-primary hover:bg-secondary/10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print the PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Search/Prompt Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-card rounded-full p-2 shadow-lg border border-secondary/20 hover:shadow-xl transition-shadow duration-200">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Trace letter J in capital letter"
            className="flex-1 border-none bg-transparent text-lg px-4 focus-visible:ring-0 placeholder:text-muted-foreground/60"
            disabled={isGenerating}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-primary hover:bg-secondary/10 transition-colors duration-200"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-secondary/20 shadow-lg animate-in fade-in-50 duration-300">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Creating your tracing activity...</p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Suggested Prompts */}
      {!isGenerating && (
        <div className="space-y-6">
          {/* Tracing Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">✏️ Tracing Practice</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_PROMPTS.map((suggestedPrompt, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-secondary/10 border-secondary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 animate-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {suggestedPrompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Letter Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">🔤 Letter Learning</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {LETTER_PROMPTS.map((letterPrompt, index) => (
                <Button
                  key={`letter-${index}`}
                  onClick={() => handleSuggestedPrompt(letterPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-secondary/10 border-secondary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 animate-float"
                  style={{ animationDelay: `${(index + SUGGESTED_PROMPTS.length) * 0.1}s` }}
                >
                  {letterPrompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
