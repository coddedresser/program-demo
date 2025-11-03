"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Palette,
  PenTool,
  Sparkles,
  Star,
  Users,
  Heart,
  ArrowRight,
  Download,
  Printer,
  Play,
  CheckCircle,
  Clock,
  Gift,
  Shield,
  Zap,
  Smile,
  BookOpen,
  Target
} from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const features = [
    { icon: Zap, title: "Instant AI Magic", description: "Create in seconds", color: "text-orange-500" },
    { icon: Shield, title: "100% Safe", description: "Kid-friendly content", color: "text-blue-500" },
    { icon: Download, title: "Unlimited Downloads", description: "Print anytime", color: "text-green-500" },
    { icon: Smile, title: "Kids Love It", description: "Fun & engaging", color: "text-pink-500" }
  ]

  const benefits = [
    "Develops fine motor skills",
    "Boosts creativity & imagination",
    "Improves handwriting",
    "Builds concentration",
    "Screen-free learning",
    "Instant gratification"
  ]

  const socialProof = [
    { number: "50K+", label: "Pages Created", icon: Palette },
    { number: "10K+", label: "Happy Families", icon: Users },
    { number: "25+", label: "Countries", icon: Target },
    { number: "4.9★", label: "Parent Rating", icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} currentPage="home" />

      <div className="pt-16 space-y-10">

        {/* HERO SECTION */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl shadow-xl p-6 min-h-[480px] flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center animate-pulse shadow-md">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-3 leading-tight text-center">
              Turn Any Idea Into <br /> <span className="text-yellow-300">Amazing Art</span>
            </h1>
            <p className="text-lg mb-6 text-center text-white/90">
              AI creates personalized coloring pages & tracing worksheets for your child in seconds
            </p>

            <div className="space-y-3 mb-6">
              <Link href="/create">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg rounded-xl transition-all"
                >
                  <Play className="h-5 w-5 mr-2" /> Start Creating Now - FREE
                </Button>
              </Link>
              <div className="flex justify-center items-center gap-2 text-sm">
                <Clock className="h-4 w-4" /> <span>Takes less than 30 seconds</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-xs mt-auto">
              <div className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-200" /> Safe for Kids</div>
              <div className="flex items-center gap-1"><Zap className="h-3 w-3 text-yellow-200" /> Instant Results</div>
              <div className="flex items-center gap-1"><Gift className="h-3 w-3 text-blue-200" /> Free to Try</div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 shadow-md border border-orange-100 min-h-[440px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">Why Parents Choose Kiwiz</h2>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={i}
                    className="text-center p-4 bg-orange-50 hover:bg-orange-100 transition rounded-xl shadow-sm"
                  >
                    <div className="flex justify-center mb-2">
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-gradient-to-r from-green-500 to-green-400 text-white rounded-3xl p-6 shadow-lg min-h-[420px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">Educational Benefits</h2>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/20 rounded-lg p-2">
                  <CheckCircle className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-3xl p-6 shadow-md min-h-[420px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">Trusted Worldwide</h2>
            <div className="grid grid-cols-2 gap-4">
              {socialProof.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <Card key={i} className="text-center p-4 bg-white/20 rounded-xl">
                    <div className="flex justify-center mb-2"><Icon className="h-5 w-5 text-yellow-300" /></div>
                    <div className="text-2xl font-bold mb-1">{stat.number}</div>
                    <div className="text-xs">{stat.label}</div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-3xl p-6 shadow-lg min-h-[420px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
            <div className="space-y-5">
              {[["1", "Choose Activity", "Pick coloring or tracing"],
                ["2", "Enter Idea", "Type what you want or use suggestions"],
                ["3", "Download & Print", "Get your creation instantly"]
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-white text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-orange-100 rounded-3xl p-6 shadow-md border border-orange-200 min-h-[440px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-orange-700 text-center mb-6">What Parents Say</h2>
            <div className="space-y-4">
              {[["My 4-year-old is obsessed! Creates exactly what she asks for. Perfect for rainy days!", "Sarah M., Mom of 2"],
                ["Handwriting improved dramatically! My son loves the tracing worksheets.", "Michael R., Dad of 3"]
              ].map(([text, name], i) => (
                <Card key={i} className="p-4 bg-white shadow rounded-xl">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"{text}"</p>
                  <p className="text-xs font-medium text-gray-600">- {name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-4">
          <div className="max-w-lg mx-auto bg-blue-600 text-white rounded-3xl p-6 text-center shadow-md min-h-[400px] flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Create Magic?</h2>
            <p className="mb-6">Join thousands of families creating amazing art together</p>
            <Link href="/create">
              <Button
                size="lg"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-orange-800 font-bold h-14 text-lg rounded-xl"
              >
                <Sparkles className="h-5 w-5 mr-2" /> Start Creating - It's FREE!
              </Button>
            </Link>
            <p className="text-xs mt-3">No signup required • Works on any device • Instant results</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-4 pb-10">
          <div className="max-w-lg mx-auto bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-3xl p-6 text-center shadow-md min-h-[360px] flex flex-col justify-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-400 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold mb-2">Kiwiz</h3>
            <p className="text-sm mb-3">AI-powered coloring & tracing for kids aged 2–8</p>
            <div className="flex justify-center gap-4 text-sm mb-3">
              <Link href="/how-to-use" className="hover:underline">How to Use</Link>
              <Link href="/about-us" className="hover:underline">About Us</Link>
              <Link href="/membership" className="hover:underline">Membership</Link>
            </div>
            <p className="text-xs">© 2024 Kiwiz. Making learning fun with AI.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
