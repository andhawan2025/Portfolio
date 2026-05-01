"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Named group on project cards for `PortfolioRevealBlock` children. */
export const portfolioCardGroupName = "pcard"

const revealEase =
  "transition-[opacity,transform] duration-[480ms] motion-reduce:duration-0 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"

type PortfolioRevealBlockProps = {
  delayMs?: number
  className?: string
  children: ReactNode
  /** Slight scale pop (bottom line banner). */
  emphasize?: boolean
  /** Chip-style pop (toolkit tags). */
  chip?: boolean
}

/**
 * Child of an element with `group/pcard` and `data-inview="true"|"false"`.
 * Fades and moves up when the card enters the viewport (unless reduced motion).
 */
export function PortfolioRevealBlock({
  delayMs = 0,
  className,
  children,
  emphasize = false,
  chip = false,
}: PortfolioRevealBlockProps) {
  const motionHidden = chip
    ? "opacity-0 translate-y-1.5 scale-95"
    : emphasize
      ? "opacity-0 translate-y-2 scale-[0.97]"
      : "opacity-0 translate-y-2.5"

  const motionShown = chip
    ? "group-data-[inview=true]/pcard:opacity-100 group-data-[inview=true]/pcard:translate-y-0 group-data-[inview=true]/pcard:scale-100"
    : emphasize
      ? "group-data-[inview=true]/pcard:opacity-100 group-data-[inview=true]/pcard:translate-y-0 group-data-[inview=true]/pcard:scale-100"
      : "group-data-[inview=true]/pcard:opacity-100 group-data-[inview=true]/pcard:translate-y-0"

  return (
    <div
      className={cn(
        revealEase,
        motionHidden,
        motionShown,
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transform-none",
        className
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}

type SectionRevealProps = {
  delayMs?: number
  className?: string
  children: ReactNode
  /** Parent must use matching `group/*` and `data-inview="true"|"false"`. */
  groupName?: "section-reveal" | "contact-reveal" | "hero-reveal"
  forceVisible?: boolean
}

/**
 * Generic section stagger (hero, contact, grid headings). Parent carries matching `group/*`.
 */
export function SectionRevealBlock({
  delayMs = 0,
  className,
  children,
  groupName = "section-reveal",
  forceVisible = false,
}: SectionRevealProps) {
  if (forceVisible) {
    return <div className={cn(className)}>{children}</div>
  }

  const motionShown =
    groupName === "hero-reveal"
      ? "group-data-[inview=true]/hero-reveal:opacity-100 group-data-[inview=true]/hero-reveal:translate-y-0"
      : groupName === "contact-reveal"
        ? "group-data-[inview=true]/contact-reveal:opacity-100 group-data-[inview=true]/contact-reveal:translate-y-0"
        : "group-data-[inview=true]/section-reveal:opacity-100 group-data-[inview=true]/section-reveal:translate-y-0"

  return (
    <div
      className={cn(
        revealEase,
        "opacity-0 translate-y-3",
        motionShown,
        "motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transform-none",
        className
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
