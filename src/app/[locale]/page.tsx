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
          <AnfrageDemo
            defaultModel={process.env.OPENAI_MODEL === "gpt-4.1-nano" ? "gpt-4.1-nano" : "gpt-5-nano"}
            unlimitedLocalTests={process.env.NODE_ENV === "development" && process.env.INQUIRY_LOCAL_ONLY !== "false" && process.env.INQUIRY_UNLIMITED_LOCAL_TESTS === "true"}
          />
          <Services />
          {/* <PortfolioPreview /> */}
          <AboutPreview />
          <ContactCTA />
        </main>
  )
}
