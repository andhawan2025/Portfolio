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

/** Header hero row: logos sized for inline Let's Talk column (see compact `SocialLinksRow`). */
const logoBoxClassCompact =
  "flex h-[1.225rem] w-[1.225rem] shrink-0 items-center justify-center sm:h-[1.4rem] sm:w-[1.4rem]"

const logoImgClass = "max-h-full max-w-full object-contain"

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
  compact,
}: {
  glowActive: boolean
  embedded: boolean
  /** Inline header row: slightly smaller hit areas and pipes than full `ContactSection`. */
  compact?: boolean
}) {
  const box = compact ? logoBoxClassCompact : logoBoxClass
  const imgPx = 20
  const pipeClass = cn(
    "px-0.5 text-muted-foreground select-none leading-none",
    compact ? "text-[0.875rem] sm:text-[0.98rem]" : "text-[0.875rem] sm:text-base"
  )

  return (
    <span
      className={cn(
        "inline-flex shrink-0 flex-wrap items-center rounded-md px-0.5 py-0.5",
        compact ? "gap-x-1.5 gap-y-1" : "gap-x-2 gap-y-2",
        glowActive &&
          "ring-2 ring-primary/40 shadow-[0_0_26px_-5px_hsl(var(--primary)/0.45)] motion-reduce:animate-none animate-pulse",
        embedded && "sm:shrink-0"
      )}
    >
      <a href="mailto:andhawan@tmys.ai" aria-label="Email andhawan@tmys.ai" className={socialLinkClass}>
        <span className={box}>
          <img
            src={portfolioPath("/email-logo.png")}
            alt=""
            width={imgPx}
            height={imgPx}
            className={logoImgClass}
          />
        </span>
      </a>
      <span className={pipeClass} aria-hidden>
        |
      </span>
      <a
        href="https://www.linkedin.com/in/anubhav-dhawan-74537617/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className={socialLinkClass}
      >
        <span className={box}>
          <img
            src={portfolioPath("/linkedin-logo.png")}
            alt=""
            width={imgPx}
            height={imgPx}
            className={logoImgClass}
          />
        </span>
      </a>
      <span className={pipeClass} aria-hidden>
        |
      </span>
      <a
        href="https://github.com/andhawan2025"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className={socialLinkClass}
      >
        <span className={cn(box, "rounded-sm border border-white p-px")}>
          <img
            src={portfolioPath("/github-logo.png")}
            alt=""
            width={imgPx}
            height={imgPx}
            className={logoImgClass}
          />
        </span>
      </a>
    </span>
  )
}

type PortfolioNavContactBlockProps = {
  className?: string
  /** `headerColumn`: hero column — Let's Talk! + icons on one line, right-aligned in grid. `rail`: legacy bottom-rail block. */
  variant?: "rail" | "headerColumn"
}

/** Compact contact block (Let's Talk! + icons) for the portfolio header or rail. */
export function PortfolioNavContactBlock({
  className,
  variant = "rail",
}: PortfolioNavContactBlockProps) {
  if (variant === "headerColumn") {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-row flex-wrap items-center justify-end gap-x-2.5 gap-y-1 text-left sm:gap-x-3",
          className
        )}
      >
        <p className="m-0 shrink-0 text-[0.936rem] font-semibold tracking-tight text-foreground sm:text-[1.106rem]">
          Let's Talk!
        </p>
        <SocialLinksRow glowActive={false} embedded compact />
      </div>
    )
  }

  return (
    <div
      className={cn("shrink-0 border-t border-border/60 pb-1.5 pt-2 sm:pb-2 sm:pt-2.5", className)}
    >
      <p className="m-0 text-[1.08rem] font-semibold tracking-tight text-foreground sm:text-[1.26rem]">
        Let's Talk!
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
              Let's Talk!
            </h2>
            <SocialLinksRow glowActive={glowActive} embedded />
          </div>
        </SectionRevealBlock>
      ) : (
        <>
          <SectionRevealBlock forceVisible={forceReveal} groupName="contact-reveal" delayMs={0}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Let's Talk!
            </h2>
          </SectionRevealBlock>
          <SectionRevealBlock
            forceVisible={forceReveal}
            groupName="contact-reveal"
            delayMs={90}
            className="mt-4 block"
          >
            <SocialLinksRow glowActive={glowActive} embedded={false} />
          </SectionRevealBlock>
        </>
      )}
    </section>
  )
}
