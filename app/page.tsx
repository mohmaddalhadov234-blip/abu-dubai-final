import { SiteHeader } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Gallery } from "@/components/site/gallery"
import { DonutSpinner } from "@/components/site/donut-spinner"
import { Menu } from "@/components/site/menu"
import { Reviews } from "@/components/site/reviews"
import { Contacts } from "@/components/site/contacts"
import { Footer } from "@/components/site/footer"
import { WhatsAppFab } from "@/components/site/whatsapp-fab"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a0f08] text-[#f5e6d3]">
      <SiteHeader />
      <Hero />
      <Gallery />
      <DonutSpinner />
      <Menu />
      <Reviews />
      <Contacts />
      <Footer />
      <WhatsAppFab />
    </main>
  )
}
