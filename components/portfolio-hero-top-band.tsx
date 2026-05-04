"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PortfolioNavContactBlock } from "@/components/contact-section"
import { ProfileAvatar } from "@/components/profile-avatar"
import { Button } from "@/components/ui/button"
import { PORTFOLIO_BASE, PORTFOLIO_DETAILS, RESUME_PDF_HREF } from "@/lib/site-paths"
import { cn } from "@/lib/utils"

export type PortfolioHeroTopBandVariant = "home" | "details"

type PortfolioHeroTopBandProps = {
  /** @deprecated Pathname drives active states; kept for call-site compatibility. */
  variant?: PortfolioHeroTopBandVariant
}

/**
 * Three columns: (1) avatar + name + tagline flush left, top-aligned;
 * (2) Home / Portfolio / Resume and (3) Let's Talk! + icons — vertically centered together on md+.
 */
export function PortfolioHeroTopBand(_props: PortfolioHeroTopBandProps) {
  const pathname = usePathname() ?? ""
  const isPortfolioLanding = pathname === "/portfolio" || pathname === "/portfolio/"
  const isPortfolioDetails = pathname.startsWith("/portfolio/details")
  const homeIsPrimary = isPortfolioLanding
  const portfolioIsPrimary = isPortfolioDetails

  /** Fixed width; labels/borders in medium grey (muted). */
  const btnClass =
    "h-9 w-[7.2rem] shrink-0 justify-center rounded-lg border-muted-foreground/45 px-2 text-[0.8125rem] font-medium leading-none text-muted-foreground hover:bg-muted hover:text-muted-foreground sm:h-10 sm:w-[8rem] sm:px-3 sm:text-sm"
  /** Selected: slightly thicker border, lighter fill, darker label vs unselected. */
  const btnActiveClass =
    "border-muted-foreground/65 bg-muted text-foreground shadow-sm [border-width:1.1px] hover:bg-muted/90 hover:text-foreground"

  return (
    <div className="grid w-full max-w-none grid-cols-1 gap-4 px-0 pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-x-6 md:gap-y-0 md:pb-0 lg:gap-x-10">
      {/* Column 1 — avatar + name + tagline; top-aligned so row height sets from this block */}
      <div className="flex min-w-0 max-w-full items-start gap-3 self-start pl-0 sm:gap-4">
        <ProfileAvatar />
        <div className="min-w-0 pt-0.5">
          <h1 className="m-0 whitespace-nowrap text-[clamp(1.35rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground">
            Anubhav Dhawan
          </h1>
          <p className="m-0 mt-1 whitespace-nowrap text-[0.6875rem] font-normal uppercase leading-tight tracking-[0.1em] text-muted-foreground sm:text-[0.8125rem]">
            AI/ML Product Leader & Consultant
          </p>
        </div>
      </div>

      {/* Column 2 — vertically centered with column 3 on md+; top offset only when stacked */}
      <div className="mt-10 flex w-full min-w-0 flex-row flex-wrap items-center justify-center gap-2 self-start pt-2 sm:mt-11 md:mt-0 md:items-center md:self-center md:gap-2.5 md:pt-4 lg:gap-3">
        <Button asChild variant="outline" className={cn(btnClass, homeIsPrimary && btnActiveClass)}>
          <Link
            href={PORTFOLIO_BASE}
            className="inline-flex h-full w-full items-center justify-center"
            {...(homeIsPrimary ? { "aria-current": "page" as const } : {})}
          >
            Home
          </Link>
        </Button>
        <Button asChild variant="outline" className={cn(btnClass, portfolioIsPrimary && btnActiveClass)}>
          <Link
            href={PORTFOLIO_DETAILS}
            className="inline-flex h-full w-full items-center justify-center"
            {...(portfolioIsPrimary ? { "aria-current": "page" as const } : {})}
          >
            Portfolio
          </Link>
        </Button>
        <Button asChild variant="outline" className={btnClass}>
          <a
            href={RESUME_PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-full w-full items-center justify-center"
          >
            Resume
          </a>
        </Button>
      </div>

      {/* Column 3 — vertically centered with nav buttons on md+; flush right */}
      <div className="flex w-full min-w-0 flex-col items-stretch self-start justify-self-stretch pr-0 pt-2 md:max-w-[min(22rem,34vw)] md:self-center md:justify-self-end md:pt-4">
        <PortfolioNavContactBlock variant="headerColumn" className="w-full min-w-0" />
      </div>
    </div>
  )
}
