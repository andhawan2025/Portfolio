import { HeroSection } from "@/components/hero-section"
import { ProjectsGrid } from "@/components/projects-grid"
import { ContactSection } from "@/components/contact-section"

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProjectsGrid />
      <ContactSection />
    </main>
  )
}
