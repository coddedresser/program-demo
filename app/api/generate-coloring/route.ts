import { generateColoringImage } from "@/lib/image-generation"
import { prisma } from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const kindeId = user.id

    // Ensure user exists in DB
    let dbUser = await prisma.user.upsert({
      where: { kindeId },
      update: {},
      create: {
        kindeId,
        email: user.email ?? "",
        name: user.given_name ?? "User",
      },
    })

    // Enforce limit
    if (dbUser.plan === "FREE" && dbUser.generationCount >= 5) {
      return Response.json({ error: "limit_reached" }, { status: 403 })
    }

    // Generate the image
    const result = await generateColoringImage(prompt)

    if (!result.success) {
      return Response.json(
        { error: result.error || "Failed to generate coloring page" },
        { status: 500 }
      )
    }

    // Increment generation count if free
    if (dbUser.plan === "FREE") {
      await prisma.user.update({
        where: { kindeId },
        data: { generationCount: { increment: 1 } },
      })
    }

    return Response.json({
      success: true,
      imageUrl: result.imageUrl,
      prompt: result.prompt,
      originalPrompt: prompt,
    })
  } catch (error) {
    console.error("Error generating coloring page:", error)
    return Response.json({ error: "Failed to generate coloring page" }, { status: 500 })
  }
}
