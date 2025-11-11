"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, BookOpen, Users, Calendar, Star } from "lucide-react";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ParentingNewsletterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address to subscribe.",
        variant: "error",
      });
      return;
    }

    try {
      setIsSubscribing(true);
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");

      toast({
        title: "Subscription Successful! 🎉",
        description: "You’ll now receive our weekly parenting newsletter.",
        variant: "success",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description:
          error.message || "Something went wrong. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const newsletterTopics = [
    {
      icon: BookOpen,
      title: "Early Learning Tips",
      description:
        "Expert advice on supporting your child's cognitive development",
    },
    {
      icon: Users,
      title: "Parenting Strategies",
      description:
        "Practical tips for managing daily challenges with young children",
    },
    {
      icon: Star,
      title: "Creative Activities",
      description:
        "Fun and educational activities you can do at home",
    },
    {
      icon: Calendar,
      title: "Developmental Milestones",
      description:
        "Understanding what to expect at each age and stage",
    },
  ];

  const recentArticles = [
    {
      title: "The Benefits of Coloring for Fine Motor Development",
      excerpt:
        "Learn how coloring activities help children develop essential motor skills...",
      date: "Dec 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "Creating a Learning-Friendly Home Environment",
      excerpt:
        "Simple tips to make your home a place where learning happens naturally...",
      date: "Dec 10, 2024",
      readTime: "7 min read",
    },
    {
      title: "Screen Time vs. Hands-On Learning: Finding the Balance",
      excerpt:
        "How to balance digital tools with traditional learning methods...",
      date: "Dec 5, 2024",
      readTime: "6 min read",
    },
    {
      title: "Building Confidence Through Creative Expression",
      excerpt:
        "Why creative activities are crucial for your child's self-esteem...",
      date: "Nov 28, 2024",
      readTime: "4 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* ✅ Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      {/* ✅ Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="newsletter"
      />

      {/* ✅ Main Content */}
      <div className="pt-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8 py-8 space-y-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-orange-600 mb-4 animate-bounce-gentle">
              Parenting Newsletter
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get expert parenting tips, educational insights, and creative
              activity ideas delivered to your inbox.
            </p>
          </div>

          {/* Center wrapper for all cards */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-3xl space-y-10">
              {/* Subscription Card */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Mail className="h-5 w-5" />
                    Subscribe to Our Newsletter
                  </CardTitle>
                  <CardDescription>
                    Join thousands of parents who receive our weekly parenting
                    newsletter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 border-orange-300 focus-visible:ring-orange-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubscribing}
                      />
                      <Button
                        type="submit"
                        disabled={isSubscribing}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                      >
                        {isSubscribing ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Topics */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    What You'll Learn
                  </CardTitle>
                  <CardDescription>
                    Our newsletter covers these essential parenting topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {newsletterTopics.map((topic, index) => {
                      const Icon = topic.icon;
                      return (
                        <div
                          key={index}
                          className="flex gap-4 bg-orange-50/40 p-3 rounded-xl hover:bg-orange-100 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-orange-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-orange-700 mb-1">
                              {topic.title}
                            </h3>
                            <p className="text-gray-600">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Articles */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    Recent Articles
                  </CardTitle>
                  <CardDescription>
                    Latest insights from our parenting experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentArticles.map((article, index) => (
                      <div
                        key={index}
                        className="p-4 border border-orange-100 rounded-xl bg-orange-50/40 hover:bg-orange-100 transition-all duration-200"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                          <h3 className="font-semibold text-lg text-orange-700">
                            {article.title}
                          </h3>
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                            {article.date} • {article.readTime}
                          </span>
                        </div>
                        <p className="text-gray-600">{article.excerpt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    Why Subscribe?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Star,
                        title: "Expert Content",
                        desc: "Written by child development experts and experienced parents",
                      },
                      {
                        icon: Calendar,
                        title: "Weekly Delivery",
                        desc: "Fresh content delivered to your inbox every week",
                      },
                      {
                        icon: Users,
                        title: "Community",
                        desc: "Join a community of like-minded parents and educators",
                      },
                    ].map((benefit, i) => {
                      const Icon = benefit.icon;
                      return (
                        <div
                          key={i}
                          className="text-center bg-orange-50/40 p-4 rounded-xl hover:bg-orange-100 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                            <Icon className="h-6 w-6 text-orange-600" />
                          </div>
                          <h3 className="font-semibold text-orange-700 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">{benefit.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Testimonials */}
              <Card className="bg-white border-orange-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300 mb-10">
                <CardHeader>
                  <CardTitle className="text-orange-700">
                    What Parents Say
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      {
                        text: "The newsletter has been a game-changer for our family. The tips are practical and easy to implement.",
                        author: "Sarah M., Mother of 2",
                      },
                      {
                        text: "I love how the articles are backed by research but written in a way that's easy to understand.",
                        author: "Michael R., Father of 3",
                      },
                    ].map((t, i) => (
                      <div
                        key={i}
                        className="p-4 border border-orange-100 rounded-xl bg-orange-50/40 hover:bg-orange-100 transition-all"
                      >
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-3">{t.text}</p>
                        <p className="text-sm font-medium text-orange-700">
                          {t.author}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
