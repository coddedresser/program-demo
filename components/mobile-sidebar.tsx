"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Home, 
  Palette, 
  PenTool, 
  Crown, 
  HelpCircle, 
  Info, 
  Mail, 
  LogOut,
  X,
  User,
  Sparkles,
  Edit3
} from "lucide-react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPage?: string
}

export default function MobileSidebar({ isOpen, onClose, currentPage = "home" }: MobileSidebarProps) {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient()

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
      description: "Welcome page"
    },
    {
      id: "app",
      label: "Create Content",
      icon: Sparkles,
      href: "/app",
      description: "Coloring & Tracing"
    },
    {
      id: "tracing",
      label: "Tracing",
      icon: Edit3,
      href: "/app?mode=tracing",
      description: "Letter & Number Tracing"
    },
    {
      id: "membership",
      label: "Membership",
      icon: Crown,
      href: "/membership",
      description: "Premium features"
    },
    {
      id: "how-to-use",
      label: "How to Use",
      icon: HelpCircle,
      href: "/how-to-use",
      description: "Learn how to use the app"
    },
    {
      id: "about-us",
      label: "About Us",
      icon: Info,
      href: "/about-us",
      description: "Learn about Kiwiz"
    },
    {
      id: "newsletter",
      label: "Parenting Newsletter",
      icon: Mail,
      href: "/parenting-newsletter",
      description: "Educational resources"
    }
  ]

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Section */}
          <div className="p-4 border-b border-border">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.given_name || "User"}
                    className="w-10 h-10 rounded-full border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {user?.given_name || "User"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Sign in to access all features</p>
                <div className="flex gap-2">
                  <LoginLink postLoginRedirectURL="/dashboard">
                    <Button size="sm" className="flex-1">
                      Sign In
                    </Button>
                  </LoginLink>
                  <RegisterLink postLoginRedirectURL="/dashboard">
                    <Button size="sm" variant="outline" className="flex-1">
                      Sign Up
                    </Button>
                  </RegisterLink>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                
                return (
                  <Link key={item.id} href={item.href} onClick={handleLinkClick}>
                    <Card className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isActive 
                        ? 'bg-primary/10 border-primary/20 shadow-sm' 
                        : 'hover:bg-muted/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isActive ? 'text-primary' : 'text-foreground'
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            {isAuthenticated && (
              <LogoutLink>
                <Button variant="outline" className="w-full" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </LogoutLink>
            )}
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                © 2024 Kiwiz - AI Coloring & Tracing
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
