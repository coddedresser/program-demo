"use client"

import { X, HelpCircle, Info, Mail, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { isAuthenticated } = useKindeBrowserClient()

  const navItems = [
    { label: "Membership", icon: Crown, href: "/membership" },
    { label: "How to Use", icon: HelpCircle, href: "/how-to-use" },
    { label: "About Us", icon: Info, href: "/about-us" },
    { label: "Parenting Newsletter", icon: Mail, href: "/parenting-newsletter" },
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.label} href={item.href} onClick={onClose}>
                  <Card className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-all">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </Card>
                </Link>
              )
            })}
          </nav>

          {isAuthenticated && (
            <div className="p-4 border-t">
              <LogoutLink>
                <Button variant="outline" className="w-full" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </LogoutLink>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
