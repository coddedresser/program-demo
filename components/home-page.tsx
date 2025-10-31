"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const features = [
    {
      icon: Zap,
      title: "Instant AI Magic",
      description: "Create in seconds",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "100% Safe",
      description: "Kid-friendly content",
      color: "text-green-500"
    },
    {
      icon: Download,
      title: "Unlimited Downloads",
      description: "Print anytime",
      color: "text-blue-500"
    },
    {
      icon: Smile,
      title: "Kids Love It",
      description: "Fun & engaging",
      color: "text-pink-500"
    }
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
        currentPage="home"
      />

      {/* Main Content */}
      <div className="pt-16">
        {/* Hero Section - Mobile First */}
        <section className="px-4 py-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-md mx-auto text-center">
            {/* Animated Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center animate-pulse">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl font-bold text-primary mb-3 leading-tight">
              Turn Any Idea Into
              <br />
              <span className="text-primary">Amazing Art</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              AI creates personalized coloring pages & tracing worksheets for your child in seconds
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <Link href="/app" className="block">
                <Button size="lg" className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Creating Now - FREE
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Takes less than 30 seconds</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-500" />
                <span>Safe for Kids</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="h-3 w-3 text-blue-500" />
                <span>Free to Try</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Why Parents Choose Kiwiz
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card key={index} className="text-center p-4 border-0 shadow-md bg-card/50">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-8 bg-gradient-to-b from-muted/30 to-transparent">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Educational Benefits
            </h2>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-card/50 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-4 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Trusted Worldwide
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {socialProof.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center p-4 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
                    <div className="flex justify-center mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works - Mobile Optimized */}
        <section className="px-4 py-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              How It Works
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Choose Activity</h3>
                  <p className="text-sm text-muted-foreground">Pick coloring or tracing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enter Idea</h3>
                  <p className="text-sm text-muted-foreground">Type what you want or use suggestions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Download & Print</h3>
                  <p className="text-sm text-muted-foreground">Get your creation instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 py-8">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              What Parents Say
            </h2>
            
            <div className="space-y-4">
              <Card className="p-4 border-0 shadow-md bg-card/50">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  "My 4-year-old is obsessed! Creates exactly what she asks for. Perfect for rainy days!"
                </p>
                <p className="text-xs font-medium">- Sarah M., Mom of 2</p>
              </Card>
              
              <Card className="p-4 border-0 shadow-md bg-card/50">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  "Handwriting improved dramatically! My son loves the tracing worksheets."
                </p>
                <p className="text-xs font-medium">- Michael R., Dad of 3</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-8 bg-gradient-to-b from-secondary/10 to-transparent">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-primary mb-3">
              Ready to Create Magic?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of families creating amazing art together
            </p>
            
            <div className="space-y-3">
              <Link href="/app" className="block">
                <Button size="lg" className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Creating - It's FREE!
                </Button>
              </Link>
              
              <p className="text-xs text-muted-foreground">
                No signup required • Works on any device • Instant results
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 bg-muted/30 border-t">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <h3 className="font-bold text-primary mb-2">Kiwiz</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered coloring & tracing for kids aged 2-8
            </p>
            
            <div className="flex justify-center gap-4 mb-4">
              <Link href="/how-to-use" className="text-sm text-muted-foreground hover:text-primary">
                How to Use
              </Link>
              <Link href="/about-us" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
              <Link href="/membership" className="text-sm text-muted-foreground hover:text-primary">
                Membership
              </Link>
            </div>
            
            <p className="text-xs text-muted-foreground">
              © 2024 Kiwiz. Making learning fun with AI.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
