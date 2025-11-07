import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Products } from "@/components/products"
import { TwoAudiences } from "@/components/two-audiences"
import { Customers } from "@/components/customers"
import { Features } from "@/components/features"
import { Integrations } from "@/components/integrations"
import { Security } from "@/components/security"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Products />
      <TwoAudiences />
      <Customers />
      <Features />
      <Integrations />
      <Security />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
