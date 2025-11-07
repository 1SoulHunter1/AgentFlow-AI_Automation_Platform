export interface ImageGenerationResult {
  imageUrl: string
  prompt: string
  style: string
}

export async function generateImage(prompt: string, style = "realistic"): Promise<ImageGenerationResult> {
  try {
    const falApiKey = process.env.FAL_KEY

    if (falApiKey) {
      // Use fal.ai for real image generation
      const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
        method: "POST",
        headers: {
          Authorization: `Key ${falApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `${style} style: ${prompt}`,
          image_size: "square_hd",
          num_inference_steps: 4,
          num_images: 1,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return {
          imageUrl: data.images[0].url,
          prompt,
          style,
        }
      }
    }

    // Fallback to placeholder
    return {
      imageUrl: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`,
      prompt,
      style,
    }
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return {
      imageUrl: `/placeholder.svg?height=512&width=512&query=${encodeURIComponent(prompt)}`,
      prompt,
      style,
    }
  }
}
