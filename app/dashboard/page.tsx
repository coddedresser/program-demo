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
  Settings
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <a href="/api/auth/login">Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        currentPage="dashboard"
      />

      {/* Main Content - Compact Mobile Layout */}
      <div className="pt-16 px-4 py-4">
        <div className="max-w-md mx-auto space-y-4">
          
          {/* Welcome Header - Compact */}
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold text-primary mb-1">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">Hi {user?.given_name || 'there'}</p>
          </div>

          {/* Quick Stats - Compact Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Card className="p-3 text-center border-0 shadow-sm bg-card/50">
              <div className="text-lg font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Pages</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-sm bg-card/50">
              <div className="text-lg font-bold text-secondary">8</div>
              <div className="text-xs text-muted-foreground">Traced</div>
            </Card>
            <Card className="p-3 text-center border-0 shadow-sm bg-card/50">
              <div className="text-lg font-bold text-green-600">2.5h</div>
              <div className="text-xs text-muted-foreground">Played</div>
            </Card>
          </div>

          {/* Quick Actions - Compact */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link href="/app">
              <Card className="p-4 text-center border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-md transition-shadow">
                <Palette className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold">Coloring</div>
                <div className="text-xs text-muted-foreground">Create pages</div>
              </Card>
            </Link>
            <Link href="/app">
              <Card className="p-4 text-center border-0 shadow-sm bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-md transition-shadow">
                <PenTool className="h-6 w-6 text-secondary mx-auto mb-2" />
                <div className="text-sm font-semibold">Tracing</div>
                <div className="text-xs text-muted-foreground">Practice writing</div>
              </Card>
            </Link>
          </div>

          {/* Recent Activity - Compact */}
          <Card className="border-0 shadow-sm bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Created "Butterfly Garden" coloring page</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-muted-foreground">Traced letter "A" worksheet</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">Downloaded "Space Adventure"</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Status - Compact */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold">Free Plan</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">5 generations remaining today</p>
              <Link href="/membership">
                <Button size="sm" className="w-full text-xs h-8">
                  <Star className="h-3 w-3 mr-1" />
                  Upgrade to Premium
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Info - Compact */}
          <Card className="border-0 shadow-sm bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
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

          {/* Quick Settings - Compact */}
          <div className="grid grid-cols-2 gap-2">
            <Link href="/how-to-use">
              <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Help
              </Button>
            </Link>
            <LogoutLink>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs">
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
