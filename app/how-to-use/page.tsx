"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Palette, PenTool, Download, Printer, Sparkles, ArrowRight } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useState } from "react"

export default function HowToUsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const steps = [
    {
      icon: Palette,
      title: "Choose Coloring Mode",
      description: "Tap the 'Coloring' button to create coloring pages",
      details: "Select from suggested prompts or type your own idea"
    },
    {
      icon: PenTool,
      title: "Choose Tracing Mode", 
      description: "Tap the 'Tracing' button to create tracing worksheets",
      details: "Practice letters, numbers, and words with guided tracing"
    },
    {
      icon: Sparkles,
      title: "Generate Content",
      description: "Enter a prompt or click a suggested prompt",
      details: "Our AI will create a custom coloring page or tracing worksheet"
    },
    {
      icon: Download,
      title: "Download & Print",
      description: "Download your creation or print it directly",
      details: "Sign in to access unlimited downloads and saves"
    }
  ]

  const features = [
    {
      title: "Suggested Prompts",
      description: "Use our curated prompts for instant inspiration",
      tips: ["Try 'A butterfly on a flower'", "Use 'Trace Alphabet A'", "Explore animal themes"]
    },
    {
      title: "Custom Prompts", 
      description: "Type your own ideas for personalized content",
      tips: ["Be specific: 'A red car'", "Add details: 'A happy dog playing'", "Keep it simple for kids"]
    },
    {
      title: "Age-Appropriate Content",
      description: "All content is designed for children aged 2-8",
      tips: ["Simple shapes and lines", "Large coloring areas", "Clear tracing guides"]
    },
    {
      title: "Mobile-Friendly",
      description: "Optimized for phones and tablets",
      tips: ["Touch-friendly interface", "Easy navigation", "Works offline after generation"]
    }
  ]

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
        currentPage="how-to-use"
      />

      {/* Main Content */}
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            How to Use Kiwiz
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn how to create amazing coloring pages and tracing worksheets for your children
          </p>
        </div>

        {/* Quick Start Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Quick Start Guide
            </CardTitle>
            <CardDescription>
              Follow these simple steps to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <p className="text-sm text-muted-foreground">{step.details}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Features Guide */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Pro Tips:</h4>
                  <ul className="space-y-1">
                    {feature.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="h-3 w-3 text-primary mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Creating Coloring Pages
              </h3>
              <ol className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
                  <span>Tap the "Coloring" button on the main screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
                  <span>Type your idea in the search bar or click a suggested prompt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                  <span>Wait for the AI to generate your coloring page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">4</span>
                  <span>Download or print your creation</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                Creating Tracing Worksheets
              </h3>
              <ol className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
                  <span>Tap the "Tracing" button on the main screen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
                  <span>Choose a tracing prompt like "Trace Alphabet A" or "Trace number 5"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                  <span>Wait for the AI to create your tracing worksheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">4</span>
                  <span>Download or print for handwriting practice</span>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Content not generating?</h3>
              <p className="text-muted-foreground">Make sure you have a stable internet connection. Try refreshing the page or using a simpler prompt.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can't download or print?</h3>
              <p className="text-muted-foreground">Sign in to your account to access unlimited downloads. Free users have limited downloads per day.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Content not appropriate for my child?</h3>
              <p className="text-muted-foreground">All content is designed for children aged 2-8. If you see something inappropriate, please report it to our support team.</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
