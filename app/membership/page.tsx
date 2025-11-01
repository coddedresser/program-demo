"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Star, Gift, Heart, Check, HelpCircle } from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";

export default function MembershipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("Free");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handlePlanSelection = async (planName: string) => {
    if (planName === "Free") {
      alert("You're already on the Free plan! Enjoy 5 lifetime generations.");
      return;
    }

    try {
      setLoadingPlan(planName);
      setSelectedPlan(planName);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
          userEmail: "210106020@hbtu.ac.in", // Replace with actual Kinde user email
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong starting checkout.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "lifetime",
      description: "Perfect for trying out Kiwiz",
      features: ["5 generations total (lifetime)", "Basic coloring pages", "Standard tracing", "Community support"],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "₹299",
      period: "month",
      description: "Best for regular users",
      features: ["Unlimited generations", "Premium content", "Advanced tools", "Priority support"],
      buttonText: "Upgrade Now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Family",
      price: "₹1299",
      period: "month",
      description: "Perfect for families",
      features: ["Everything in Premium", "Up to 5 accounts", "Family dashboard", "Bulk downloads"],
      buttonText: "Choose Family",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

  const faqs = [
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards via Stripe's secure payment system.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes! You can cancel your subscription at any time, and your plan will remain active until the end of the billing cycle.",
    },
    {
      q: "Do you offer refunds?",
      a: "We do not offer partial refunds, but you can cancel before your next billing period.",
    },
    {
      q: "Is my payment information secure?",
      a: "Absolutely. All transactions are processed securely through Stripe. We never store your card details.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} currentPage="membership" />

      <div className="pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-3">Choose Your Kiwiz Plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock the full potential of AI-powered coloring and tracing for your children.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedPlan === plan.name ? "border-2 border-primary scale-105" : ""
                } ${plan.popular ? "shadow-md" : ""}`}
                onClick={() => setSelectedPlan(plan.name)}
              >
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
                    disabled={plan.name === "Free" || loadingPlan === plan.name}
                    onClick={() => handlePlanSelection(plan.name)}
                  >
                    {loadingPlan === plan.name ? "Redirecting..." : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Premium */}
          <Card className="mb-10">
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
                      <Heart className="h-4 w-4 text-red-500" /> Unlimited creativity for children
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Educational premium content
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Save time with instant generation
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">For Children</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Endless coloring & tracing fun
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Age-appropriate creative tools
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Develop fine motor skills
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-semibold text-lg mb-1">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
