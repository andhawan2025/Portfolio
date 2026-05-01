"use client"

import { SectionRevealBlock } from "@/components/portfolio-reveal"
import { PortfolioHeroTopBand } from "@/components/portfolio-hero-top-band"
import { useInView } from "@/hooks/use-in-view"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { HERO_BIO_PARAGRAPH } from "@/lib/hero-copy"
import { portfolioPath } from "@/lib/site-paths"

/** Hero: top band + bio + logos (used when reduced motion avoids scroll shell). */
export function HeroSection() {
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: "0px 0px -5% 0px",
    threshold: 0.05,
  })
  const reduceMotion = useReducedMotion()
  const active = reduceMotion || inView

  return (
    <header
      ref={ref}
      data-inview={active ? "true" : "false"}
      className="group/hero-reveal flex flex-col gap-0"
    >
      <div className="border-b border-border pb-3">
        <SectionRevealBlock groupName="hero-reveal" delayMs={0}>
          <PortfolioHeroTopBand />
        </SectionRevealBlock>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-7 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
        <SectionRevealBlock groupName="hero-reveal" delayMs={180}>
          <p className="m-0 leading-[1.7] text-foreground lg:pr-2">{HERO_BIO_PARAGRAPH}</p>
        </SectionRevealBlock>
        <div className="flex h-full w-full items-start justify-end lg:pt-[62px]">
          <SectionRevealBlock groupName="hero-reveal" delayMs={270} className="w-full max-w-full">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <img
                src={portfolioPath("/companylogos/Logos.png")}
                alt="Company and education logos"
                className="mx-auto h-auto w-[31rem] max-w-full rounded-xl object-contain"
              />
            </div>
          </SectionRevealBlock>
        </div>
      </div>
    </header>
  )
}
