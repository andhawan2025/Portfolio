"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ProfileAvatar } from "@/components/profile-avatar"
import { Button } from "@/components/ui/button"
import { PORTFOLIO_BASE, PORTFOLIO_DETAILS, RESUME_PDF_HREF } from "@/lib/site-paths"

export type PortfolioHeroTopBandVariant = "home" | "details"

type PortfolioHeroTopBandProps = {
  /** @deprecated Pathname drives active states; kept for call-site compatibility. */
  variant?: PortfolioHeroTopBandVariant
}

/** Avatar + name + role + Home / Portfolio / Resume (active state from current path). */
export function PortfolioHeroTopBand(_props: PortfolioHeroTopBandProps) {
  const pathname = usePathname() ?? ""
  const isPortfolioLanding = pathname === "/portfolio" || pathname === "/portfolio/"
  const isPortfolioDetails = pathname.startsWith("/portfolio/details")
  const homeIsPrimary = isPortfolioLanding
  const portfolioIsPrimary = isPortfolioDetails

  return (
    <div className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <ProfileAvatar />
          <div className="min-w-0 pt-0.5">
            <h1 className="m-0 text-[clamp(1.75rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-foreground">
              Anubhav Dhawan
            </h1>
            <p className="m-0 mt-2 text-[1rem] font-normal uppercase leading-normal tracking-[0.08em] text-primary">
              AI/ML Product Leader & Consultant
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full shrink-0 flex-row flex-wrap items-center justify-center gap-3 sm:w-auto sm:justify-end">
        <div className="inline-flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant={homeIsPrimary ? "default" : "outline"} className="shrink-0 px-6 text-base">
            <Link href={PORTFOLIO_BASE} {...(homeIsPrimary ? { "aria-current": "page" as const } : {})}>
              Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant={portfolioIsPrimary ? "default" : "outline"}
            className="shrink-0 px-6 text-base"
          >
            <Link href={PORTFOLIO_DETAILS} {...(portfolioIsPrimary ? { "aria-current": "page" as const } : {})}>
              Portfolio
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shrink-0 px-6 text-base">
            <a href={RESUME_PDF_HREF} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
