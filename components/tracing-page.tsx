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
    contentTitle,
  } = useAuthGate()

  const { trackActivity } = useUserDataCollection()

  const generateTracing = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-tracing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      })

      if (!response.ok) throw new Error("Failed to generate tracing content")

      const data = await response.json()
      setTracingContent(data)
      trackActivity("generate_tracing", inputPrompt)
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
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = 800
        canvas.height = 600
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.font = "32px Arial"
        ctx.fillStyle = "#333"
        ctx.textAlign = "center"
        ctx.fillText(tracingContent.description, canvas.width / 2, 60)
        ctx.font = "200px Arial"
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = 4
        ctx.strokeText(tracingContent.content, canvas.width / 2, 250)
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

        const link = document.createElement("a")
        link.download = `tracing-${tracingContent.content.toLowerCase()}.jpg`
        link.href = canvas.toDataURL("image/jpeg", 0.9)
        link.click()
        trackActivity("download_tracing", tracingContent.description)
      },
      "download",
      `Tracing Worksheet: ${tracingContent.description}`
    )
  }

  const handlePrint = () => {
    if (tracingContent)
      executeWithAuth(
        () => {
          printContent(tracingContent.content, tracingContent.description)
          trackActivity("print_tracing", tracingContent.description)
        },
        "print",
        `Tracing Worksheet: ${tracingContent.description}`
      )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <AuthGate
        isOpen={isAuthGateOpen}
        onClose={closeAuthGate}
        onSuccess={handleAuthSuccess}
        actionType={actionType}
        contentTitle={contentTitle}
      />

      {!tracingContent && (
        <>
          <Card className="p-6 bg-yellow-400/20 border-yellow-300 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-extrabold text-orange-800 mb-4 text-center flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              How to Use?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">✏️ Type your prompt below</li>
              <li className="flex items-center gap-3">📚 Use ready-made tracing ideas</li>
              <li className="flex items-center gap-3">⬇️ Download or print the sheet</li>
            </ul>
          </Card>

          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold text-orange-600 animate-bounce-gentle">
              Oh! Here to learn? Let's trace then..✨
            </h2>
          </div>
        </>
      )}

      {tracingContent && (
        <Card className="p-4 sm:p-6 bg-white border-4 border-orange-300 shadow-xl rounded-2xl overflow-hidden">
          <div className="text-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-orange-700 mb-4 leading-snug px-2">
              {tracingContent.description}
            </h3>
            <div className="flex justify-center w-full overflow-x-auto">
              <div className="max-w-full sm:max-w-[480px] w-full">
                <TracingCanvas content={tracingContent.content} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Button
              onClick={handleDownload}
              className="flex-1 min-w-[130px] sm:flex-none bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handlePrint}
              className="flex-1 min-w-[130px] sm:flex-none bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </Card>
      )}


      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full p-2 shadow-lg border border-orange-300 hover:shadow-xl transition duration-200">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Trace the letter A in uppercase..."
            className="flex-1 border-none bg-transparent text-lg px-4 focus-visible:ring-0 placeholder:text-gray-500"
            disabled={isGenerating}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-orange-500 hover:bg-orange-100 transition"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Loading */}
      {isGenerating && (
        <Card className="p-8 bg-yellow-100 border-yellow-300 shadow-md rounded-2xl text-center animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin text-orange-600 mx-auto mb-2" />
          <p className="text-gray-700">Creating your tracing activity...</p>
        </Card>
      )}

      {/* Suggested Buttons */}
      {!isGenerating && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-orange-700 text-center mb-4">
              ✏️ Tracing Practice Ideas
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {SUGGESTED_PROMPTS.map((p, i) => (
                <Button
                  key={i}
                  onClick={() => handleSuggestedPrompt(p)}
                  className="h-9 px-4 py-2 rounded-full text-sm bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 border border-orange-600 shadow-sm hover:shadow-md transition-all duration-200 animate-float"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-orange-700 text-center mb-4">
              🔤 Letter Learning Fun
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {LETTER_PROMPTS.map((p, i) => (
                <Button
                  key={i}
                  onClick={() => handleSuggestedPrompt(p)}
                  className="h-9 px-4 py-2 rounded-full text-sm bg-yellow-400 text-gray-800 hover:bg-yellow-500 hover:scale-105 border border-yellow-500 shadow-sm hover:shadow-md transition-all duration-200 animate-float"
                  style={{ animationDelay: `${(i + SUGGESTED_PROMPTS.length) * 0.1}s` }}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
