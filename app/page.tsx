import { HeroSection } from "@/components/hero-section"
import { ProjectsGrid } from "@/components/projects-grid"
import { ContactSection } from "@/components/contact-section"

/** Matches Flask `.page`: width min(1100px, 92vw), vertical rhythm from `styles.css`. */
export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-[min(1100px,92vw)] pt-16 pb-16 sm:pt-20 sm:pb-16">
        <HeroSection />
        <ProjectsGrid />
        <ContactSection />
      </div>
    </main>
  )
}
