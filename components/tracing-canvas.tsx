"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface TracingCanvasProps {
  content: string
}

export default function TracingCanvas({ content }: TracingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 300
    canvas.height = 250

    drawTemplate(ctx, content)
  }, [content])

  const drawTemplate = (ctx: CanvasRenderingContext2D, text: string) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // White background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw dotted outline for tracing
    ctx.font = "120px Arial"
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 3
    ctx.setLineDash([8, 8])
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.strokeText(text, ctx.canvas.width / 2, ctx.canvas.height / 2)

    // Reset line dash
    ctx.setLineDash([])
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let x, y
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = "#4f46e5"
    ctx.lineWidth = 4
    ctx.lineCap = "round"
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let x, y
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsClearing(true)
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear the drawing layer
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Redraw the template
    drawTemplate(ctx, content)
    
    // Reset clearing state after a short delay
    setTimeout(() => {
      setIsClearing(false)
    }, 300)
  }

  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          className="border-2 border-border rounded-lg bg-white cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <Button
        onClick={clearCanvas}
        variant="outline"
        size="sm"
        disabled={isClearing}
        className={`text-muted-foreground hover:text-foreground bg-transparent transition-all duration-200 ${
          isClearing ? 'animate-pulse' : ''
        }`}
      >
        <RotateCcw className={`w-4 h-4 mr-2 ${isClearing ? 'animate-spin' : ''}`} />
        {isClearing ? 'Clearing...' : 'Clear & Try Again'}
      </Button>
    </div>
  )
}
