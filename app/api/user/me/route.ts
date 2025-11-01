import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function GET() {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    })

    if (!dbUser) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    return Response.json({
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      isAdmin: dbUser.isAdmin === true || dbUser.email === "youradmin@email.com",
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
