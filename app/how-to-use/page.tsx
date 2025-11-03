"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Palette, PenTool, Download, Printer, Sparkles, ArrowRight } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HowToUsePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const router = useRouter()

  const steps = [
    {
      icon: Palette,
      title: "Choose Coloring Mode",
      description: "Tap the 'Coloring' button to create coloring pages",
      details: "Select from suggested prompts or type your own idea",
    },
    {
      icon: PenTool,
      title: "Choose Tracing Mode",
      description: "Tap the 'Tracing' button to create tracing worksheets",
      details: "Practice letters, numbers, and words with guided tracing",
    },
    {
      icon: Sparkles,
      title: "Generate Content",
      description: "Enter a prompt or click a suggested prompt",
      details: "Our AI will create a custom coloring page or tracing worksheet",
    },
    {
      icon: Download,
      title: "Download & Print",
      description: "Download your creation or print it directly",
      details: "Sign in to access unlimited downloads and saves",
    },
  ]

  const features = [
    {
      title: "Suggested Prompts",
      description: "Use our curated prompts for instant inspiration",
      tips: ["Try 'A butterfly on a flower'", "Use 'Trace Alphabet A'", "Explore animal themes"],
    },
    {
      title: "Custom Prompts",
      description: "Type your own ideas for personalized content",
      tips: ["Be specific: 'A red car'", "Add details: 'A happy dog playing'", "Keep it simple for kids"],
    },
    {
      title: "Age-Appropriate Content",
      description: "All content is designed for children aged 2-8",
      tips: ["Simple shapes and lines", "Large coloring areas", "Clear tracing guides"],
    },
    {
      title: "Mobile-Friendly",
      description: "Optimized for phones and tablets",
      tips: ["Touch-friendly interface", "Easy navigation", "Works offline after generation"],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="how-to-use"
      />

      {/* Main Content */}
      <div className="pt-20">
        <div className="container max-w-5xl mx-auto px-5 py-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-orange-700 mb-3">
              How to Use Kiwiz
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Learn how to create amazing coloring pages and tracing worksheets for your children.
            </p>
          </div>

          {/* Quick Start Steps */}
          <Card className="mb-10 bg-yellow-50 border border-yellow-200 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Sparkles className="h-5 w-5 text-orange-600" />
                Quick Start Guide
              </CardTitle>
              <CardDescription className="text-gray-600">
                Follow these simple steps to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={index}
                      className="flex gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-gray-600 mb-1">{step.description}</p>
                        <p className="text-sm text-gray-500">{step.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Features Guide */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border border-orange-100 shadow-md hover:shadow-lg rounded-2xl transition-all"
              >
                <CardHeader>
                  <CardTitle className="text-orange-700 font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-700">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-600">Pro Tips:</h4>
                    <ul className="space-y-1">
                      {feature.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <ArrowRight className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
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
          <Card className="mb-10 bg-orange-50 border border-orange-200 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-orange-700 font-semibold">Detailed Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-orange-700">
                  <Palette className="h-5 w-5 text-orange-600" />
                  Creating Coloring Pages
                </h3>
                <ol className="space-y-2 ml-6 text-gray-700">
                  {[
                    'Tap the "Coloring" button on the main screen',
                    "Type your idea in the search bar or click a suggested prompt",
                    "Wait for the AI to generate your coloring page",
                    "Download or print your creation",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-green-700">
                  <PenTool className="h-5 w-5 text-green-600" />
                  Creating Tracing Worksheets
                </h3>
                <ol className="space-y-2 ml-6 text-gray-700">
                  {[
                    'Tap the "Tracing" button on the main screen',
                    'Choose a tracing prompt like "Trace Alphabet A" or "Trace number 5"',
                    "Wait for the AI to create your tracing worksheet",
                    "Download or print for handwriting practice",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-red-50 border border-red-200 rounded-2xl shadow-md mb-10">
            <CardHeader>
              <CardTitle className="text-red-600 font-semibold">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-1">Content not generating?</h3>
                <p>Check your internet connection or try simpler prompts.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Can't download or print?</h3>
                <p>Sign in to your account for unlimited downloads. Free users have limited daily access.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Content not appropriate?</h3>
                <p>All designs are made for ages 2–8. Please report any issue to our support team.</p>
              </div>
            </CardContent>
          </Card>

          {/* Start Creating Button */}
          <div className="text-center">
            <Button
              onClick={() => router.push("/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Start Creating Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
