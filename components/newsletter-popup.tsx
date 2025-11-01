"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Mail } from "lucide-react"

export default function NewsletterPopup({
  isOpen,
  onClose,
  onSubscribed,
}: {
  isOpen: boolean
  onClose: () => void
  onSubscribed: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Subscription failed")

      onSubscribed()
      onClose()
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-2xl border border-primary/20 shadow-xl bg-card/70 backdrop-blur-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="flex flex-col items-center gap-2 text-lg font-bold text-primary">
            <Mail className="w-6 h-6 text-primary" />
            Stay in the Loop! 📰
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Join our Parent Newsletter for tips, printable worksheets, and updates about new AI coloring features.
          </p>
        </DialogHeader>

        <DialogFooter className="flex justify-center gap-4 mt-4">
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
