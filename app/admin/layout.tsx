import AdminSidebar from "@/components/admin/AdminSidebar"

export const metadata = {
  title: "Admin Panel",
  description: "Manage users and newsletters",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-48 p-8 bg-muted/10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
