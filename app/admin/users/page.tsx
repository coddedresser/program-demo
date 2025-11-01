import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function AdminUsersPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) redirect("/api/auth/login")

  const dbUser = await prisma.user.findUnique({ where: { kindeId: user.id } })
  if (!dbUser?.isAdmin) redirect("/")

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <table className="min-w-full border-collapse border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Plan</th>
            <th className="p-3 text-left">Generations</th>
            <th className="p-3 text-left">Newsletter</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.plan}</td>
              <td className="p-3">{u.generationCount}</td>
              <td className="p-3">{u.newsletterSubscribed ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
