"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Mail, Activity } from "lucide-react"

interface Stats {
  totalUsers: number
  totalNewsletters: number
  activeUsers: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // ✅ You can replace this with a real API call later
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          // fallback mock data
          setStats({
            totalUsers: 1240,
            totalNewsletters: 312,
            activeUsers: 890,
          })
        }
      } catch {
        // fallback data for dev mode
        setStats({
          totalUsers: 1240,
          totalNewsletters: 312,
          activeUsers: 890,
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return <p className="text-muted-foreground">Loading admin stats...</p>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Overview of user and newsletter activity.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalUsers}</p>
            <p className="text-sm text-muted-foreground">Registered so far</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Newsletter Subscribers</CardTitle>
            <Mail className="text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalNewsletters}</p>
            <p className="text-sm text-muted-foreground">Active newsletter users</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active Users</CardTitle>
            <Activity className="text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.activeUsers}</p>
            <p className="text-sm text-muted-foreground">Users active in last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
