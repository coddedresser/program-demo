"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Mail, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 bg-background border-r border-border flex flex-col justify-between">
      {/* Top section */}
      <div className="mt-6">
        <h1 className="text-center text-lg font-semibold mb-6 text-primary">Admin</h1>
        <nav className="flex flex-col space-y-2 px-3">
          {sidebarLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant={pathname === href ? "secondary" : "ghost"}
                className={clsx(
                  "w-full justify-start gap-3 text-sm font-medium",
                  pathname === href && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mb-6 px-3">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center text-sm font-medium hover:bg-muted"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </aside>
  )
}
