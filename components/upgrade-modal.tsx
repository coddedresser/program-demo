"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
}

export default function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center backdrop-blur-md">
        <DialogHeader>
          <div className="flex justify-center mb-3">
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
          <DialogTitle className="text-xl font-bold text-primary">
            Free Limit Reached
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            You’ve used your 5 free generations. Upgrade to Premium for unlimited coloring and tracing fun!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Button variant="default" onClick={() => router.push("/membership")}>
            Upgrade Now
          </Button>
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
