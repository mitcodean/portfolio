import Hero from "@/sections/hero/Hero"
import Services from "@/sections/services-preview/ServicesPreview"
import PortfolioPreview from "@/sections/portfolio-preview/PortfolioPreview"
import AboutPreview from "@/sections/about-preview/AboutPreview"
import ContactCTA from "@/sections/contact/ContactCTA"


export default async function HomePage() {

  return (
    <main>
      <Hero />
      <Services />
       <PortfolioPreview />
      <AboutPreview />
      <ContactCTA />
    </main>
  )
}