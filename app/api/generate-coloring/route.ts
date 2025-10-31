import { generateColoringImage } from "@/lib/image-generation"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Generate coloring image using OpenRouter API
    const result = await generateColoringImage(prompt)

    if (!result.success) {
      return Response.json({ error: result.error || "Failed to generate coloring page" }, { status: 500 })
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
