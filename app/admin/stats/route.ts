import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch counts from your database
    const totalUsers = await prisma.user.count()
    const totalNewsletters = await prisma.newsletter?.count?.() || 0
    const activeUsers = await prisma.user.count({
      where: {
        // Adjust this condition if you track activity differently
        updatedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
        },
      },
    })

    return Response.json({
      totalUsers,
      totalNewsletters,
      activeUsers,
    })
  } catch (err) {
    console.error("Error fetching admin stats:", err)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
