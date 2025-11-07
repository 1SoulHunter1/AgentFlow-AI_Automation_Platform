import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Added gradient mesh background for futuristic AI feel */}
      <div className="absolute inset-0 gradient-mesh-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full gradient-ai-accent text-white text-sm font-medium mb-6">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2L10 6L14 6.5L11 9.5L11.5 14L8 12L4.5 14L5 9.5L2 6.5L6 6L8 2Z" fill="currentColor" />
            </svg>
            Your AI Operating System
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            The all-in-one <span className="text-gradient">AI platform</span> for your enterprise
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            Roll out powerful AI to your entire organization. Build custom assistants, automate workflows, and integrate
            with your tools—all while maintaining enterprise-grade security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/signup">Get started - it's free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
              <Link href="/demo">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 5.5L13.5 10L6.5 14.5V5.5Z" fill="currentColor" />
                  <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                Watch demo
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">7-day free trial • No credit card required</p>
        </div>
      </div>
    </section>
  )
}
