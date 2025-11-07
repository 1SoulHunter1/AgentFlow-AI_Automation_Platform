import { Logo } from "@/components/logo"
import { VerifyEmailWrapper } from "./verify-email-wrapper"

export const dynamic = "force-dynamic"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Header with logo */}
      <header className="relative z-10 border-b border-white/20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Logo />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center px-4 py-16">
        <VerifyEmailWrapper />
      </main>
    </div>
  )
}
