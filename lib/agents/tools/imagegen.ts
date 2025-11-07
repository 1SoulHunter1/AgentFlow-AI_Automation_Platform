export async function generateImage(prompt: string): Promise<string> {
  console.log(`[mock] Pretending to generate image for: "${prompt}"`)
  return `🖼️ [Generated image for "${prompt}"]`
}
