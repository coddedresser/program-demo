"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2, Download, Printer, Mic, Sparkles } from "lucide-react"
import { downloadImage, printImage } from "@/lib/download-utils"
import AuthGate from "@/components/auth-gate"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { useUserDataCollection } from "@/hooks/use-user-data-collection"
import { getColoringPrompts, getFlashcardPrompts } from "@/lib/prompts-complete"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

const SUGGESTED_PROMPTS = getColoringPrompts()
const FLASHCARD_PROMPTS = getFlashcardPrompts(8)

export default function ColoringPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  const router = useRouter()
  const { isAuthGateOpen, closeAuthGate, executeWithAuth, handleAuthSuccess, actionType, contentTitle } = useAuthGate()
  const { trackActivity } = useUserDataCollection()

  // ✅ Fetch user data once to check newsletter subscription status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user")
        const data = await res.json()
        if (data) {
          setUser(data)
          if (data?.newsletterSubscribed) setNewsletterSubscribed(true)
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
      }
    }
    fetchUser()
  }, [])

  const generateColoring = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return

    setIsGenerating(true)
    setCurrentPrompt(inputPrompt)

    try {
      const response = await fetch("/api/generate-coloring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputPrompt }),
      })

      const data = await response.json()

      if (response.status === 403) {
        // Free limit reached → show upgrade popup
        setShowUpgradePopup(true)
        setIsGenerating(false)
        return
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate coloring page")
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl)
      } else {
        setGeneratedImage(`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(inputPrompt)}`)
      }

      trackActivity("generate_coloring", inputPrompt)

      // ✅ Trigger newsletter popup after successful generation (only if not subscribed)
      if (!newsletterSubscribed) {
        setTimeout(() => setShowNewsletterPopup(true), 1200)
      }
    } catch (error) {
      console.error("Error generating coloring page:", error)
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
      executeWithAuth(() => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        canvas.width = 800
        canvas.height = 600
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const link = document.createElement("a")
          link.download = `coloring-${currentPrompt.replace(/\s+/g, "-").toLowerCase()}.jpg`
          link.href = canvas.toDataURL("image/jpeg", 0.9)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
        img.src = generatedImage
        trackActivity("download_coloring", currentPrompt)
      }, "download", `Coloring Page: ${currentPrompt}`)
    }
  }

  const handlePrint = () => {
    if (generatedImage && currentPrompt) {
      executeWithAuth(() => {
        printImage(generatedImage, `Coloring Page: ${currentPrompt}`)
        trackActivity("print_coloring", currentPrompt)
      }, "print", `Coloring Page: ${currentPrompt}`)
    }
  }

  // ✅ Newsletter subscription handler
  const handleNewsletterSubscribe = async () => {
    if (!user?.email) {
      toast.error("Please log in to subscribe.")
      return
    }

    try {
      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })

      if (res.ok) {
        toast.success("Subscribed successfully!")
        setNewsletterSubscribed(true)
        setShowNewsletterPopup(false)
        router.push("/parenting-newsletter")
      } else {
        toast.error("Subscription failed")
      }
    } catch (err) {
      toast.error("Error subscribing to newsletter")
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

      {/* ===== Upgrade Popup ===== */}
      {showUpgradePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <Card className="p-8 bg-background shadow-2xl max-w-md text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Free Limit Reached</h2>
            <p className="text-muted-foreground mb-6">
              You’ve used all 5 free generations. Upgrade to{" "}
              <span className="font-semibold text-primary">Premium</span> for unlimited access!
            </p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => setShowUpgradePopup(false)} variant="outline">
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white" onClick={() => router.push("/membership")}>
                Upgrade Now
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* ===== Newsletter Popup ===== */}
      <Dialog open={showNewsletterPopup} onOpenChange={setShowNewsletterPopup}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle>Join Our Parenting Newsletter</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-6">
            Get weekly parenting tips, learning ideas, and fun activities straight to your inbox!
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleNewsletterSubscribe}>Subscribe Now</Button>
            <Button variant="outline" onClick={() => setShowNewsletterPopup(false)}>
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== Main UI ===== */}
      {!generatedImage && (
        <>
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
              className="bg-primary text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 shadow-md hover:scale-105 transition-all duration-200"
            >
              <Printer className="w-4 h-4 mr-2" /> Print the PDF
            </Button>
          </div>
        </Card>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-card rounded-full p-2 shadow-lg border border-primary/20 hover:shadow-xl transition-shadow duration-200">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A butterfly on snowflower......"
            className="flex-1 border-none bg-transparent text-lg px-4 focus-visible:ring-0 placeholder:text-muted-foreground/60"
            disabled={isGenerating}
          />
          <Button type="button" size="icon" variant="ghost" className="rounded-full text-primary hover:bg-primary/10">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Loader */}
      {isGenerating && (
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg animate-in fade-in-50 duration-300">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Creating your magical coloring page...</p>
          </div>
        </Card>
      )}

      {/* Prompts Section */}
      {!isGenerating && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">🎨 Coloring Ideas</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_PROMPTS.map((suggestedPrompt, index) => (
                <Button
                  key={index}
                  onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-primary/10 border-primary/20 shadow-sm hover:scale-105 transition-all"
                >
                  {suggestedPrompt}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-primary">📚 Learning Cards</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {FLASHCARD_PROMPTS.map((flashcardPrompt, index) => (
                <Button
                  key={`flashcard-${index}`}
                  onClick={() => handleSuggestedPrompt(flashcardPrompt)}
                  variant="outline"
                  className="rounded-full text-sm bg-card hover:bg-primary/10 border-primary/20 shadow-sm hover:scale-105 transition-all"
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
