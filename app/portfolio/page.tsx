import { PortfolioHomeScroll } from "@/components/portfolio-home-scroll"

/** Home: fixed hero + footer; scroll-driven fixed-position fades for intro + bottom lines. */
export default function PortfolioHomePage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioHomeScroll />
    </main>
  )
}
