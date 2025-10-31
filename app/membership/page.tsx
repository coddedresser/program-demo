"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Star, Gift, Heart, Check } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useState } from "react"

export default function MembershipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handlePlanSelection = (planName: string) => {
    if (planName === "Free") {
      alert("You're already on the free plan! Start creating content now.")
      return
    }
    
    // For now, show a coming soon message
    alert(`Thank you for your interest in the ${planName} plan! Payment integration is coming soon. For now, you can enjoy our free features.`)
  }
  const features = [
    "Unlimited image generation",
    "Premium coloring pages",
    "Advanced tracing worksheets",
    "Priority support",
    "Ad-free experience",
    "Download in high quality",
    "Print unlimited pages",
    "Save favorites"
  ]

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out Kiwiz",
      features: ["5 generations per day", "Basic coloring pages", "Standard tracing", "Community support"],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "month",
      description: "Best for regular users",
      features: ["Unlimited generations", "Premium content", "Advanced features", "Priority support"],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Family",
      price: "$19.99",
      period: "month",
      description: "Perfect for families",
      features: ["Everything in Premium", "Up to 5 accounts", "Family dashboard", "Bulk downloads"],
      buttonText: "Choose Family",
      buttonVariant: "outline" as const,
      popular: false
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
        currentPage="membership"
      />

      {/* Main Content */}
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Choose Your Kiwiz Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AI-powered coloring and tracing for your children
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.buttonVariant}
                  disabled={plan.name === "Free"}
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Why Choose Premium?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">For Parents</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Unlimited creativity for your children</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>High-quality educational content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Save time with instant generation</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">For Children</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Endless coloring and tracing fun</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Age-appropriate content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>Develop fine motor skills</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes! You can try our free plan with 5 generations per day to see if Kiwiz is right for your family.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and Apple Pay for your convenience.</p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
