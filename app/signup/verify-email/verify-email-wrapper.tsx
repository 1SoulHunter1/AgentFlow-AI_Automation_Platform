"use client"

import dynamic from "next/dynamic"

const VerifyEmailContent = dynamic(
  () => import("@/components/verify-email-content").then((mod) => ({ default: mod.VerifyEmailContent })),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full max-w-lg">
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    ),
  },
)

export function VerifyEmailWrapper() {
  return <VerifyEmailContent />
}
