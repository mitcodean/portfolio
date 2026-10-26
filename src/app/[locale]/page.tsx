import Hero from "./sections/hero/Hero"
import InquiryShowcase from "@/components/inquiry/InquiryShowcase"
import Services from "./sections/services-preview/ServicesPreview"
import AboutPreview from "./sections/about-preview/AboutPreview"
import ContactCTA from "./sections/contact/ContactCTA"


export default async function HomePage() {

  return (
        <main>
          <Hero />
          <InquiryShowcase />
          <Services />
          <AboutPreview />
          <ContactCTA />
        </main>
  )
}
