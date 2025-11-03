"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Star,
  Gift,
  Heart,
  Check,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";

export default function MembershipPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("FREE");
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 🔹 Fetch current user plan
  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        if (data.plan) setSelectedPlan(data.plan.toUpperCase());
      } catch (err) {
        console.error("Error fetching user plan:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, []);

  const handlePlanSelection = async (planName: string) => {
    if (planName.toUpperCase() === selectedPlan) {
      alert(`You're already on the ${planName} plan!`);
      return;
    }

    try {
      setLoadingPlan(planName);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planName.toLowerCase() }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Something went wrong starting checkout.");
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
      features: [
        "5 generations total (lifetime)",
        "Basic coloring pages",
        "Standard tracing",
        "Community support",
      ],
      popular: false,
    },
    {
      name: "Premium",
      price: "₹299",
      period: "month",
      description: "Best for regular users",
      features: [
        "Unlimited generations",
        "Premium content",
        "Advanced tools",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Family",
      price: "₹1299",
      period: "month",
      description: "Perfect for families",
      features: [
        "Everything in Premium",
        "Up to 5 accounts",
        "Family dashboard",
        "Bulk downloads",
      ],
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
    <div className="min-h-screen bg-white">
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="membership"
      />

      <div className="pt-16">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-orange-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-orange-800 mb-3">
              Choose Your Kiwiz Plan
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Unlock the full potential of AI-powered coloring and tracing for
              your children.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const isCurrent = selectedPlan === plan.name.toUpperCase();
              const shouldBlurFree =
                selectedPlan !== "FREE" && plan.name === "Free";

              return (
                <Card
                  key={index}
                  className={`relative bg-yellow-50 border border-orange-200 transition-all duration-300 
                    ${
                      isCurrent
                        ? "border-2 border-orange-500 shadow-lg scale-[1.03]"
                        : "hover:shadow-lg hover:scale-[1.02]"
                    }
                    ${shouldBlurFree ? "opacity-40 blur-[1.5px]" : ""}
                  `}
                >
                  {/* Active Plan Badge */}
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-md">
                        <Sparkles className="h-3 w-3" />
                        Active Plan
                      </div>
                    </div>
                  )}

                  {/* Popular Label */}
                  {plan.popular && !isCurrent && (
                    <div className="absolute -top-3 right-3">
                      <div className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-orange-800">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-extrabold text-orange-600">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2 text-gray-700">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        isCurrent
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : plan.name === "Premium"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                      disabled={isCurrent || loadingPlan === plan.name}
                      onClick={() => handlePlanSelection(plan.name)}
                    >
                      {isCurrent
                        ? "Current Plan"
                        : loadingPlan === plan.name
                        ? "Redirecting..."
                        : plan.name === "Premium"
                        ? "Upgrade Now"
                        : "Choose Plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Why Choose Premium */}
          <Card className="mb-12 bg-yellow-100 border border-yellow-300 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Gift className="h-5 w-5 text-yellow-500" />
                Why Choose Premium?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    For Parents
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Unlimited
                      creativity for children
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Educational
                      premium content
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" /> Save time with
                      instant generation
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-orange-800">
                    For Children
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Endless
                      coloring & tracing fun
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Age-appropriate
                      creative tools
                    </li>
                    <li className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-green-500" /> Develop fine
                      motor skills
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="mb-10 bg-yellow-50 border border-orange-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <HelpCircle className="h-5 w-5 text-yellow-500" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-yellow-200 pb-4">
                    <h3 className="font-semibold text-lg text-orange-800 mb-1">
                      {faq.q}
                    </h3>
                    <p className="text-gray-700 text-sm">{faq.a}</p>
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
