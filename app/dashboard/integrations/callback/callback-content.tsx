"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle OAuth callback
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (code) {
      // Close popup and notify parent window
      if (window.opener) {
        window.opener.postMessage({ type: "oauth-success", code, state }, window.location.origin)
        window.close()
      } else {
        // If not in popup, redirect to integrations page
        router.push("/dashboard/integrations")
      }
    }
  }, [searchParams, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Completing connection...</p>
      </div>
    </div>
  )
}
