"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Sparkles, Shield, Award, Mail } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import MobileSidebar from "@/components/mobile-sidebar"
import { useState } from "react"

export default function AboutUsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const values = [
    {
      icon: Heart,
      title: "Child-Centered",
      description: "Every feature is designed with children's development and safety in mind"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We use cutting-edge AI to create personalized educational content"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All content is age-appropriate and safe for children aged 2-8"
    },
    {
      icon: Users,
      title: "Family Focused",
      description: "We believe in bringing families together through creative learning"
    }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      description: "Former kindergarten teacher with 10+ years of experience in early childhood education"
    },
    {
      name: "Dr. Michael Chen",
      role: "CTO",
      description: "AI researcher specializing in educational technology and child development"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      description: "Child psychology expert who ensures our content is engaging and developmentally appropriate"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      description: "Full-stack developer passionate about creating accessible educational tools"
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
        currentPage="about-us"
      />

      {/* Main Content */}
      <div className="pt-16">
        <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            About Kiwiz
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering parents and educators with AI-powered tools to nurture children's creativity and learning
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">
              At Kiwiz, we believe that every child deserves access to high-quality, personalized educational content. 
              Our mission is to make learning fun, engaging, and accessible for children aged 2-8 through innovative 
              AI-powered coloring pages and tracing worksheets.
            </p>
            <p className="text-muted-foreground">
              We're committed to supporting parents and educators in fostering children's creativity, 
              fine motor skills, and love for learning through technology that puts children first.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>
              The principles that guide everything we do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Our Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Kiwiz was born from a simple observation: parents and teachers were spending hours searching for 
              appropriate coloring pages and tracing worksheets for their children. Existing solutions were either 
              too generic, not age-appropriate, or required expensive subscriptions.
            </p>
            <p className="text-muted-foreground">
              Our founder, a former kindergarten teacher, saw the need for a tool that could instantly generate 
              personalized, educational content that adapts to each child's interests and learning level. 
              With the help of AI technology, we've made this vision a reality.
            </p>
            <p className="text-muted-foreground">
              Today, Kiwiz serves thousands of families worldwide, helping children develop their creativity, 
              fine motor skills, and love for learning through our innovative platform.
            </p>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meet Our Team</CardTitle>
            <CardDescription>
              The passionate people behind Kiwiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-muted-foreground mb-2">
                  Need help with Kiwiz? Our support team is here to help.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="text-muted-foreground mb-2">
                  Have suggestions or feedback? We'd love to hear from you.
                </p>
                <Button variant="outline" size="sm">
                  Send Feedback
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Kiwiz by the Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Families</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Pages Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  )
}
