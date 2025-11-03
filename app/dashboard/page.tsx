"use client";

import { useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Palette,
  PenTool,
  Download,
  Star,
  TrendingUp,
  Clock,
  Sparkles,
  Crown,
} from "lucide-react";
import Link from "next/link";
import MobileHeader from "@/components/mobile-header";
import MobileSidebar from "@/components/mobile-sidebar";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <Card className="w-full max-w-lg rounded-xl shadow-lg border border-orange-100">
          <CardHeader className="text-center">
            <CardTitle className="text-orange-600">Access Denied</CardTitle>
            <CardDescription>Please log in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-orange-500 text-white hover:bg-orange-600 rounded-full">
              <a href="/api/auth/login">Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-orange-950 dark:via-zinc-900 dark:to-orange-900">
      {/* Mobile Header */}
      <MobileHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage="dashboard"
      />

      {/* Main Content */}
      <div className="pt-16 px-4 py-4">
        <div className="max-w-md sm:max-w-lg mx-auto space-y-4 px-2">
          {/* Welcome Header */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-orange-600 mb-1">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">Hi {user?.given_name || "there"}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Card className="p-3 text-center border-0 shadow-sm bg-white dark:bg-zinc-900 rounded-xl hover:shadow-md transition-all">
              <div className="text-lg font-bold text-orange-600">12</div>
              <div className="text-xs text-muted-foreground">Pages</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-sm bg-white dark:bg-zinc-900 rounded-xl hover:shadow-md transition-all">
              <div className="text-lg font-bold text-orange-500">8</div>
              <div className="text-xs text-muted-foreground">Traced</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-sm bg-white dark:bg-zinc-900 rounded-xl hover:shadow-md transition-all">
              <div className="text-lg font-bold text-green-600">2.5h</div>
              <div className="text-xs text-muted-foreground">Played</div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link href="/create">
              <Card className="p-4 text-center border-0 shadow-sm bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/30 hover:shadow-lg hover:scale-[1.02] transition-all rounded-xl">
                <Palette className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-orange-700">Coloring</div>
                <div className="text-xs text-muted-foreground">Create pages</div>
              </Card>
            </Link>
            <Link href="/create">
              <Card className="p-4 text-center border-0 shadow-sm bg-gradient-to-br from-orange-200/50 to-orange-100 hover:shadow-lg hover:scale-[1.02] transition-all rounded-xl">
                <PenTool className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-orange-700">Tracing</div>
                <div className="text-xs text-muted-foreground">Practice writing</div>
              </Card>
            </Link>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-zinc-900 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-orange-600">
                <Clock className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-muted-foreground">Created "Butterfly Garden" coloring page</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-muted-foreground">Traced letter "A" worksheet</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Downloaded "Space Adventure"</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Status */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-100 to-yellow-50 dark:from-orange-900/30 dark:to-yellow-800/20 rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-orange-700">Free Plan</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">5 generations remaining today</p>
              <Link href="/membership">
                <Button size="sm" className="w-full text-xs h-8 bg-orange-500 text-white hover:bg-orange-600 transition-all rounded-full">
                  <Star className="h-3 w-3 mr-1" />
                  Upgrade to Premium
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-zinc-900 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-orange-600">
                <User className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since Dec 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <div className="grid grid-cols-2 gap-2">
            <Link href="/how-to-use">
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs border-orange-300 text-orange-700 hover:bg-orange-100 rounded-full"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Help
              </Button>
            </Link>
            <LogoutLink>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 text-xs border-orange-300 text-orange-700 hover:bg-orange-100 rounded-full"
              >
                <Shield className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </LogoutLink>
          </div>
        </div>
      </div>
    </div>
  );
}
