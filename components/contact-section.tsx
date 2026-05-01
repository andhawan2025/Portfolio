"use client"

import { SectionRevealBlock } from "@/components/portfolio-reveal"
import { useInView } from "@/hooks/use-in-view"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { portfolioPath } from "@/lib/site-paths"
import { cn } from "@/lib/utils"

const socialLinkClass =
  "inline-flex shrink-0 items-center justify-center rounded-md text-primary no-underline ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

const logoBoxClass =
  "flex h-5 w-5 shrink-0 items-center justify-center sm:h-[22.5px] sm:w-[22.5px]"

const logoImgClass = "max-h-full max-w-full object-contain"

const CONTACT_INTRO =
  "Interested in working together or discussing any AI/ML projects? Let's talk!"

type ContactSectionProps = {
  /** Fixed shell: skip intersection reveal; parent controls layout. */
  embedded?: boolean
  /** Optional opacity from parent (scroll story). */
  overlayOpacity?: number
  className?: string
}

function SocialLinksRow({
  glowActive,
  embedded,
}: {
  glowActive: boolean
  embedded: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-wrap items-center gap-x-2 gap-y-2 rounded-md px-0.5 py-0.5",
        glowActive &&
          "ring-2 ring-primary/40 shadow-[0_0_26px_-5px_hsl(var(--primary)/0.45)] motion-reduce:animate-none animate-pulse",
        embedded && "sm:shrink-0"
      )}
    >
      <a href="mailto:andhawan@tmys.ai" aria-label="Email andhawan@tmys.ai" className={socialLinkClass}>
        <span className={logoBoxClass}>
          <img
            src={portfolioPath("/email-logo.png")}
            alt=""
            width={20}
            height={20}
            className={logoImgClass}
          />
        </span>
      </a>
      <span className="px-0.5 text-muted-foreground select-none" aria-hidden>
        |
      </span>
      <a
        href="https://www.linkedin.com/in/anubhav-dhawan-74537617/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={socialLinkClass}
      >
        <span className={logoBoxClass}>
          <img
            src={portfolioPath("/linkedin-logo.png")}
            alt=""
            width={20}
            height={20}
            className={logoImgClass}
          />
        </span>
      </a>
      <span className="px-0.5 text-muted-foreground select-none" aria-hidden>
        |
      </span>
      <a
        href="https://github.com/andhawan2025"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className={socialLinkClass}
      >
        <span className={`${logoBoxClass} rounded-sm border border-white p-px`}>
          <img
            src={portfolioPath("/github-logo.png")}
            alt=""
            width={20}
            height={20}
            className={logoImgClass}
          />
        </span>
      </a>
    </span>
  )
}

/** Compact contact block for the bottom of the portfolio left rail (Contact + intro + icons). */
export function PortfolioNavContactBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 border-t border-border/60 pt-2 pb-1.5 sm:pt-2.5 sm:pb-2",
        className
      )}
    >
      <p className="m-0 text-[0.9rem] font-semibold tracking-tight text-foreground sm:text-[1.05rem]">Contact</p>
      <p className="m-0 mt-1.5 text-[0.78rem] leading-snug text-muted-foreground sm:text-[0.84rem]">
        {CONTACT_INTRO}
      </p>
      <div className="mt-2 flex justify-start">
        <SocialLinksRow glowActive={false} embedded />
      </div>
    </div>
  )
}

/** Contact links (email, LinkedIn, GitHub). */
export function ContactSection({ embedded, overlayOpacity, className }: ContactSectionProps) {
  const embeddedMode = embedded === true
  const scrollDriven = typeof overlayOpacity === "number"
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  })
  const reduceMotion = useReducedMotion()
  const active = embeddedMode || scrollDriven || reduceMotion || inView
  const forceReveal = embeddedMode || scrollDriven
  const glowActive =
    (active && !reduceMotion && !scrollDriven && !embeddedMode) ||
    (scrollDriven && overlayOpacity !== undefined && overlayOpacity > 0.55 && !reduceMotion)

  return (
    <section
      ref={ref}
      data-inview={active ? "true" : "false"}
      style={scrollDriven ? { opacity: overlayOpacity } : undefined}
      className={cn(
        "group/contact-reveal",
        embeddedMode && "mt-0 border-t-0 pt-0",
        !embeddedMode && "border-t border-border pt-[18px]",
        !embeddedMode && (scrollDriven ? "mt-0" : "mt-[42px]"),
        className
      )}
    >
      {embeddedMode ? (
        <SectionRevealBlock forceVisible={forceReveal} groupName="contact-reveal" delayMs={0}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <h2 className="m-0 shrink-0 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Contact
            </h2>
            <div className="flex min-w-0 flex-1 flex-row flex-wrap items-center gap-x-1.5 gap-y-1 sm:flex-nowrap sm:gap-x-2">
              <p className="m-0 min-w-0 text-muted-foreground text-sm leading-relaxed sm:text-base sm:whitespace-nowrap">
                {CONTACT_INTRO}
              </p>
              <SocialLinksRow glowActive={glowActive} embedded />
            </div>
          </div>
        </SectionRevealBlock>
      ) : (
        <>
          <SectionRevealBlock forceVisible={forceReveal} groupName="contact-reveal" delayMs={0}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Contact</h2>
          </SectionRevealBlock>
          <SectionRevealBlock
            forceVisible={forceReveal}
            groupName="contact-reveal"
            delayMs={90}
            className="mt-4 block"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-foreground">
              <p className="m-0 min-w-0 text-muted-foreground text-sm leading-relaxed sm:text-base">
                {CONTACT_INTRO}
              </p>
              <SocialLinksRow glowActive={glowActive} embedded={false} />
            </div>
          </SectionRevealBlock>
        </>
      )}
    </section>
  )
}
