import { generateTracingContent } from "@/lib/image-generation"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Parse the prompt first to get tracing data
    const tracingData = parseTracingPrompt(prompt)
    
    // Generate a unique image URL based on the tracing content to avoid similar images
    const uniqueId = Date.now() + Math.random().toString(36).substr(2, 9)
    const imageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(tracingData.content)}&type=tracing&id=${uniqueId}`

    return Response.json({
      success: true,
      ...tracingData,
      originalPrompt: prompt,
      imageUrl: imageUrl,
      uniqueId: uniqueId
    })
  } catch (error) {
    console.error("Error generating tracing content:", error)
    return Response.json({ error: "Failed to generate tracing content" }, { status: 500 })
  }
}

function parseTracingPrompt(prompt: string) {
  const lowerPrompt = prompt.toLowerCase()
  
  // Extract letter from prompts like "Trace Alphabet A" or "Trace letter J"
  const letterMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z])/i);
  if (letterMatch) {
    const letter = letterMatch[1];
    const isLowercase = lowerPrompt.includes('lowercase') || letter === letter.toLowerCase();
    const isCursive = lowerPrompt.includes('cursive');
    
    let style = "uppercase";
    if (isCursive) {
      style = "cursive";
    } else if (isLowercase) {
      style = "lowercase";
    }
    
    return {
      type: "letter",
      content: letter,
      style: style,
      description: `Trace the letter ${letter}${isCursive ? ' in cursive' : isLowercase ? ' in lowercase' : ''}`
    };
  }
  
  // Extract number from prompts like "Trace number 8"
  const numberMatch = prompt.match(/number\s+(\d+)/i);
  if (numberMatch) {
    const number = numberMatch[1];
    return {
      type: "number",
      content: number,
      style: "uppercase",
      description: `Trace the number ${number}`
    };
  }
  
  // Extract word from prompts like "Spelling of One"
  const wordMatch = prompt.match(/(?:spelling|word)\s+of\s+([A-Za-z]+)/i);
  if (wordMatch) {
    const word = wordMatch[1];
    return {
      type: "word",
      content: word,
      style: "uppercase",
      description: `Trace the word ${word}`
    };
  }
  
  // Extract cursive from prompts like "Trace alphabet z in cursive"
  const cursiveMatch = prompt.match(/(?:letter|alphabet)\s+([A-Za-z]).*cursive/i);
  if (cursiveMatch) {
    const letter = cursiveMatch[1];
    return {
      type: "letter",
      content: letter,
      style: "cursive",
      description: `Trace the letter ${letter} in cursive`
    };
  }
  
  // Try to extract any single letter from the prompt
  const singleLetterMatch = prompt.match(/\b([A-Za-z])\b/);
  if (singleLetterMatch) {
    const letter = singleLetterMatch[1];
    const isLowercase = letter === letter.toLowerCase();
    return {
      type: "letter",
      content: letter,
      style: isLowercase ? "lowercase" : "uppercase",
      description: `Trace the letter ${letter}`
    };
  }
  
  // Try to extract any single number from the prompt
  const singleNumberMatch = prompt.match(/\b(\d+)\b/);
  if (singleNumberMatch) {
    const number = singleNumberMatch[1];
    return {
      type: "number",
      content: number,
      style: "uppercase",
      description: `Trace the number ${number}`
    };
  }
  
  // Default fallback - use the first word of the prompt
  const words = prompt.split(' ');
  const firstWord = words[0];
  if (firstWord && firstWord.length === 1 && /[A-Za-z]/.test(firstWord)) {
    return {
      type: "letter",
      content: firstWord,
      style: "uppercase",
      description: `Trace the letter ${firstWord}`
    };
  }
  
  // Final fallback
  return {
    type: "letter",
    content: "A",
    style: "uppercase",
    description: "Trace the letter A"
  };
}
