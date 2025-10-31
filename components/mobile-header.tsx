"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, User, X } from "lucide-react"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Link from "next/link"

interface MobileHeaderProps {
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export default function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 h-16">
        {/* Left: Burger Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-foreground hover:bg-muted/50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Center: App Name */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold text-primary">
            Kiwiz
          </h1>
        </div>

        {/* Right: Profile Button */}
        <div className="flex items-center">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : isAuthenticated ? (
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-foreground hover:bg-muted/50 p-0"
              >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.given_name || "User"}
                  className="w-8 h-8 rounded-full border-2 border-primary/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
              </Button>
            </Link>
          ) : (
            <LoginLink postLoginRedirectURL="/dashboard">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50">
                <User className="h-6 w-6" />
              </Button>
            </LoginLink>
          )}
        </div>
      </div>
    </header>
  )
}
