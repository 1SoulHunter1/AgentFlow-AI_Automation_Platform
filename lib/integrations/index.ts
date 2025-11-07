import { sendToNotion } from "./notion"
import { sendToSlack } from "./slack"
import { uploadToDrive } from "./drive"

export async function runIntegration(app: string, payload: any) {
  switch (app.toLowerCase()) {
    case "notion":
      return await sendToNotion(payload)
    case "slack":
      return await sendToSlack(payload)
    case "drive":
    case "googledrive":
      return await uploadToDrive(payload)
    default:
      throw new Error(`Unsupported integration: ${app}`)
  }
}
