import Hero from "./sections/hero/Hero"
import AnfrageDemo from "./sections/anfrage-demo/AnfrageDemo"
import Services from "./sections/services-preview/ServicesPreview"
import PortfolioPreview from "@/app/[locale]/sections/portfolio-preview/PortfolioPreview"
import AboutPreview from "./sections/about-preview/AboutPreview"
import ContactCTA from "./sections/contact/ContactCTA"


export default async function HomePage() {

  return (
        <main>
          <Hero />
          <AnfrageDemo />
          <Services />
          {/* <PortfolioPreview /> */}
          <AboutPreview />
          <ContactCTA />
        </main>
  )
}
