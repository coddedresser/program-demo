"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, BookOpen, Users, Calendar, Star, ArrowRight } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ParentingNewsletterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address to subscribe.",
        variant: "error",
      })
      return
    }

    setIsSubscribing(true)

    setTimeout(() => {
      toast({
        title: "Subscription Successful!",
        description: "You’ll receive our weekly parenting newsletter in your inbox.",
        variant: "success",
      })
      setEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  const handleReadMore = (articleTitle: string) => {
    toast({
      title: `Opening "${articleTitle}"`,
      description: "This feature will be available soon! Stay tuned.",
      variant: "info",
    })
  }

  const newsletterTopics = [
    {
      icon: BookOpen,
      title: "Early Learning Tips",
      description: "Expert advice on supporting your child's cognitive development",
    },
    {
      icon: Users,
      title: "Parenting Strategies",
      description: "Practical tips for managing daily challenges with young children",
    },
    {
      icon: Star,
      title: "Creative Activities",
      description: "Fun and educational activities you can do at home",
    },
    {
      icon: Calendar,
      title: "Developmental Milestones",
      description: "Understanding what to expect at each age and stage",
    },
  ]

  const recentArticles = [
    {
      title: "The Benefits of Coloring for Fine Motor Development",
      excerpt: "Learn how coloring activities help children develop essential motor skills...",
      date: "Dec 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "Creating a Learning-Friendly Home Environment",
      excerpt: "Simple tips to make your home a place where learning happens naturally...",
      date: "Dec 10, 2024",
      readTime: "7 min read",
    },
    {
      title: "Screen Time vs. Hands-On Learning: Finding the Balance",
      excerpt: "How to balance digital tools with traditional learning methods...",
      date: "Dec 5, 2024",
      readTime: "6 min read",
    },
    {
      title: "Building Confidence Through Creative Expression",
      excerpt: "Why creative activities are crucial for your child's self-esteem...",
      date: "Nov 28, 2024",
      readTime: "4 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="newsletter"
      />

      {/* Main Content */}
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">
              Parenting Newsletter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get expert parenting tips, educational insights, and creative activity ideas delivered to your inbox
            </p>
          </div>

          {/* Newsletter Signup */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Subscribe to Our Newsletter
              </CardTitle>
              <CardDescription>
                Join thousands of parents who receive our weekly parenting newsletter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                  />
                  <Button type="submit" disabled={isSubscribing}>
                    {isSubscribing ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Newsletter Topics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
              <CardDescription>
                Our newsletter covers these essential parenting topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {newsletterTopics.map((topic, index) => {
                  const Icon = topic.icon
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
                        <p className="text-muted-foreground">{topic.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Articles */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Recent Articles</CardTitle>
              <CardDescription>
                Latest insights from our parenting experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentArticles.map((article, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{article.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={() => handleReadMore(article.title)}
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Why Subscribe?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
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
                  const Icon = benefit.icon
                  return (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>What Parents Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
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
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-3">{t.text}</p>
                    <p className="text-sm font-medium">{t.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
