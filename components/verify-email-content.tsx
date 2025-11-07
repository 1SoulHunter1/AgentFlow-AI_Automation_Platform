"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your-email@example.com"

  const handleOpenGmail = () => {
    window.open("https://mail.google.com", "_blank")
  }

  const handleOpenOutlook = () => {
    window.open("https://outlook.live.com", "_blank")
  }

  const handleTryDifferentEmail = () => {
    window.history.back()
  }

  return (
    <div className="relative w-full max-w-lg">
      {/* Card with glassmorphism effect */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-40" />
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4">
              <svg className="h-12 w-12 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8L22 14L16 20L10 14L16 8Z" fill="white" opacity="0.95" />
                <circle cx="16" cy="22" r="2" fill="white" opacity="0.95" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">Check your email</h1>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 leading-relaxed">
          Please click on the link in the email to validate your email and complete your setup.
        </p>

        {/* Email display */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Email sent to</span>
            <button
              onClick={handleTryDifferentEmail}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Try a different email
            </button>
          </div>
          <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-gray-900 font-medium">{email}</p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 text-base font-medium border-gray-300 hover:bg-gray-50 bg-transparent"
            onClick={handleOpenGmail}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Open Gmail
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-12 text-base font-medium border-gray-300 hover:bg-gray-50 bg-transparent"
            onClick={handleOpenOutlook}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 3H4C2.9 3 2 3.9 2 5v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="#0078D4" />
              <path
                d="M12 13.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="white"
              />
              <path
                d="M12 8.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5m0-1c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"
                fill="#0078D4"
              />
            </svg>
            Open Outlook
          </Button>
        </div>
      </div>
    </div>
  )
}
