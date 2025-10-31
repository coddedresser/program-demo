"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Printer, Mic, Sparkles } from "lucide-react"
import { downloadImage, printImage } from "@/lib/download-utils"
import AuthGate from "@/components/auth-gate"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { useUserDataCollection } from "@/hooks/use-user-data-collection"
import { getColoringPrompts, getFlashcardPrompts } from "@/lib/prompts-complete"

const SUGGESTED_PROMPTS = getColoringPrompts()
const FLASHCARD_PROMPTS = getFlashcardPrompts(8)

export default function ColoringPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState("")
  
  const {
    isAuthGateOpen,
    closeAuthGate,
    executeWithAuth,
    handleAuthSuccess,
    actionType,
    contentTitle
  } = useAuthGate()
  
  const { trackActivity } = useUserDataCollection()

  const generateColoring = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return

    setIsGenerating(true)
    setCurrentPrompt(inputPrompt)

    try {
      const response = await fetch("/api/generate-coloring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputPrompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate coloring page")
      }

      const data = await response.json()
      console.log('API Response:', data) // Debug logging

      if (data.success && data.imageUrl) {
        // Use the actual generated image from the API
        console.log('Using generated image:', data.imageUrl)
        setGeneratedImage(data.imageUrl)
      } else {
        // Fallback to placeholder if no image URL is provided
        console.log('Using placeholder image')
        setGeneratedImage(`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(inputPrompt)}`)
      }
      
      // Track user activity
      trackActivity('generate_coloring', inputPrompt)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate coloring page. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateColoring(prompt)
  }

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt)
    generateColoring(suggestedPrompt)
  }

  const handleDownload = () => {
    if (generatedImage && currentPrompt) {
      executeWithAuth(
        () => {
          // Convert SVG to JPG format for download
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return
          
          canvas.width = 800
          canvas.height = 600
          
          // White background
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          // Load and draw the image
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            
            // Convert to JPG and download
            const link = document.createElement('a')
            link.download = `coloring-${currentPrompt.replace(/\s+/g, "-").toLowerCase()}.jpg`
            link.href = canvas.toDataURL('image/jpeg', 0.9)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
          img.src = generatedImage
          
          trackActivity('download_coloring', currentPrompt)
        },
        "download",
        `Coloring Page: ${currentPrompt}`
      )
    }
  }

  const handlePrint = () => {
    if (generatedImage && currentPrompt) {
      executeWithAuth(
        () => {
          printImage(generatedImage, `Coloring Page: ${currentPrompt}`)
          trackActivity('print_coloring', currentPrompt)
        },
        "print",
        `Coloring Page: ${currentPrompt}`
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

      {!generatedImage && (
        <>
          {/* How to use section */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
            <h3 className="text-xl font-bold text-primary mb-4 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
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
            </ul>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-6 animate-bounce-gentle">
              Want to do coloring? Start doing it.
            </h2>
          </div>
        </>
      )}

      {/* Generated Image Display */}
      {generatedImage && (
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg animate-in fade-in-50 duration-500">
          <div className="flex justify-center mb-4">
            <img
              src={generatedImage || "/placeholder.svg"}
              alt={`Coloring page: ${currentPrompt}`}
              className="max-w-full h-auto rounded-lg border-2 border-primary/20 shadow-md"
              style={{ maxHeight: "300px" }}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 bg-transparent"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print the PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Search/Prompt Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-card rounded-full p-2 shadow-lg border border-primary/20 hover:shadow-xl transition-shadow duration-200">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A butterfly on snowflower......"
            className="flex-1 border-none bg-transparent text-lg px-4 focus-visible:ring-0 placeholder:text-muted-foreground/60"
            disabled={isGenerating}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-primary hover:bg-primary/10 transition-colors duration-200"
          >
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Loading State */}
      {isGenerating && (
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg animate-in fade-in-50 duration-300">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Creating your magical coloring page...</p>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
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
          {/* Coloring Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">🎨 Coloring Ideas</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_PROMPTS.map((suggestedPrompt, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-primary/10 border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 animate-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {suggestedPrompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Flashcard Prompts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">📚 Learning Cards</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {FLASHCARD_PROMPTS.map((flashcardPrompt, index) => (
                <Button
                  key={`flashcard-${index}`}
                  onClick={() => handleSuggestedPrompt(flashcardPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-primary/10 border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 animate-float"
                  style={{ animationDelay: `${(index + SUGGESTED_PROMPTS.length) * 0.1}s` }}
                >
                  {flashcardPrompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
