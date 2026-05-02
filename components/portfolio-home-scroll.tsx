"use client"

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { ContactSection, PortfolioNavContactBlock } from "@/components/contact-section"
import { PortfolioHeroTopBand } from "@/components/portfolio-hero-top-band"
import { categoryBadgeClass, categoryBottomLineBannerClass } from "@/lib/category-styles"
import { HERO_BIO_PARAGRAPH } from "@/lib/hero-copy"
import {
  getPortfolioBottomLineSlides,
  type PortfolioBottomLineSlide,
} from "@/lib/portfolio-home-bottom-lines"
import { PORTFOLIO_IMAGINATION_SCROLL_PAIRS } from "@/lib/portfolio-home-imagination-scroll"
import type { ProjectCategory } from "@/lib/projects"
import {
  PORTFOLIO_NAV_ORDER,
  PORTFOLIO_NAV_TAB_CONFIG,
  PORTFOLIO_RAIL_BOTTOM_INSET_PX,
  portfolioNavKeyToDetailHash,
  type PortfolioNavRailKey,
} from "@/lib/portfolio-nav-config"
import { PORTFOLIO_DETAILS, portfolioPath } from "@/lib/site-paths"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

function fadeOut(p: number, outStart: number, outEnd: number) {
  if (p <= outStart) return 1
  if (p < outEnd) return clamp01(1 - (p - outStart) / (outEnd - outStart))
  return 0
}

/** Wider band so Products / Academics / Imagination banners hold ~1s longer before fading (more scroll at peak). */
function stageOpacityBottomLine(u: number, index: number, count: number) {
  if (count <= 0 || u < 0) return 0
  const band = 0.74
  const pos = -band + u * ((count - 1) + 2 * band)
  const d = Math.abs(pos - index)
  return d >= band ? 0 : clamp01(1 - d / band)
}

/**
 * Vertical center in the story pane (`top: 50%` + translate) so tall cards aren’t
 * anchored from the top and clipped. Horizontal varies per slot.
 */
/** Bottom-line blurb positions — varied vertical bands so slides don’t all sit on the same row. */
const STORY_SLOTS: CSSProperties[] = [
  { top: "42%", left: "4%", right: "auto", transform: "translateY(-50%)", width: "min(35.2rem, 92%)" },
  { top: "56%", left: "auto", right: "4%", transform: "translateY(-50%)", width: "min(35.2rem, 92%)" },
  { top: "48%", left: "6%", right: "auto", transform: "translateY(-50%)", width: "min(32rem, 90%)" },
  { top: "52%", left: "auto", right: "6%", transform: "translateY(-50%)", width: "min(35.2rem, 92%)" },
  { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(38.4rem, 94%)" },
  { top: "38%", left: "50%", transform: "translate(-50%, -50%)", width: "min(36rem, 92%)" },
  { top: "62%", left: "8%", right: "auto", transform: "translateY(-50%)", width: "min(34rem, 90%)" },
]

function fixedFadeStyle(opacity: number, opts?: { passWheelToDocument?: boolean }): CSSProperties {
  const o = clamp01(opacity)
  const passWheel = opts?.passWheelToDocument === true
  return {
    opacity: o,
    // Full-bleed overlays with overflow-y-auto were capturing wheel and blocking
    // page scroll when their inner content did not overflow.
    pointerEvents: passWheel ? "none" : o > 0.08 ? "auto" : "none",
    visibility: o < 0.04 ? "hidden" : "visible",
  }
}

const LOGOS_EXPERIENCE: { src: string; alt: string }[] = [
  { src: "/companylogos/amazon-logo.jpg", alt: "Amazon" },
  { src: "/companylogos/deloitte-logo.jpg", alt: "Deloitte" },
  { src: "/companylogos/quiet-logo.jpg", alt: "Quiet" },
]

const LOGOS_EDUCATION: { src: string; alt: string }[] = [
  { src: "/companylogos/uofmichlogo.png", alt: "University of Michigan Ross School of Business" },
  { src: "/companylogos/utaustimmcombslogo.jpg", alt: "Texas McCombs School of Business" },
  { src: "/companylogos/nsitlogo.png", alt: "Netaji Subhas University of Technology (NSUT)" },
]

/**
 * Final fraction of scroll after the interleaved story: story layers fade out, toolkit
 * word cloud fades in and stays at full opacity through p = 1.
 */
const TAIL_PAD_P = 0.055
/** Crossfade into the word cloud over this many p units before the story phase ends. */
const WORD_CLOUD_FADE_IN_SPAN_P = 0.028
/** Scroll `p` where interleaved story begins — aligned near intro fade so story ramps in with little dead air. */
const INTERLEAVED_START_P = 0.06
/**
 * Extra scroll allocated to the bottom-line phase so each slide stays on screen
 * longer (~2s more at a typical wheel pace vs the pre-stretch baseline).
 */
const BOTTOM_LINE_SCROLL_STRETCH = 1.62

/** Logo anchors — vertically centered like story cards. */
const LOGO_SLOTS_EXPERIENCE: CSSProperties[] = [
  { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(22.4rem, 88%)" },
  { top: "50%", left: "8%", right: "auto", transform: "translateY(-50%)", width: "min(20.8rem, 86%)" },
  { top: "50%", left: "auto", right: "8%", transform: "translateY(-50%)", width: "min(20.8rem, 86%)" },
]

const LOGO_SLOTS_EDUCATION: CSSProperties[] = [
  { top: "50%", left: "auto", right: "8%", transform: "translateY(-50%)", width: "min(24rem, 88%)" },
  { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(25.6rem, 90%)" },
  { top: "50%", left: "8%", right: "auto", transform: "translateY(-50%)", width: "min(24rem, 88%)" },
]

const UTAUSTIN_LOGO_SUBSTRING = "utaustimmcombslogo"
const NSIT_LOGO_SUBSTRING = "nsitlogo"
const QUIET_LOGO_SUBSTRING = "quiet-logo"

/** Centered row for Imagination Labs image + text pairs. */
const IMAGINATION_PAIR_SLOT: CSSProperties = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(27.5rem, 94%)",
}

type StoryStep =
  | { kind: "exp-logo"; expIndex: number }
  | { kind: "edu-logo"; eduIndex: number }
  | { kind: "slide"; slideIndex: number }
  | { kind: "imagination-pair"; pairIndex: number }

/**
 * Scroll order after the intro line: logos, bottom-line slides, and imagination pairs
 * in the sequence requested for the home story track.
 */
function buildStoryStepsInScrollOrder(slides: PortfolioBottomLineSlide[]): StoryStep[] {
  const indexById = new Map(slides.map((s, i) => [s.id, i]))
  const slide = (id: string): StoryStep | null => {
    const slideIndex = indexById.get(id)
    if (slideIndex === undefined) return null
    return { kind: "slide" as const, slideIndex }
  }
  const ordered: (StoryStep | null)[] = [
    { kind: "exp-logo", expIndex: 0 },
    slide("human-ai-collaboration-transformation"),
    slide("tmys"),
    { kind: "edu-logo", eduIndex: 0 },
    slide("customer-retention-churn-intelligence"),
    slide("pricing-engine"),
    slide("market-sentiment-investment-analysis"),
    { kind: "exp-logo", expIndex: 1 },
    { kind: "imagination-pair", pairIndex: 1 },
    slide("nl2sql-reporting"),
    { kind: "edu-logo", eduIndex: 1 },
    slide("conversational-knowledge-platform"),
    slide("customer-targeting-revenue"),
    { kind: "imagination-pair", pairIndex: 0 },
    { kind: "exp-logo", expIndex: 2 },
    slide("plant-image-classification-weed-detection"),
    { kind: "edu-logo", eduIndex: 2 },
  ]
  return ordered.filter((s): s is StoryStep => s !== null)
}

function slideCategoryToNavKey(category: ProjectCategory): "products" | "academics" | "imagination" {
  if (category === "Products") return "products"
  if (category === "Academics/Research") return "academics"
  return "imagination"
}

function stepToNavKey(step: StoryStep, slides: PortfolioBottomLineSlide[]): PortfolioNavRailKey {
  switch (step.kind) {
    case "exp-logo":
      return "experience"
    case "edu-logo":
      return "education"
    case "slide":
      return slideCategoryToNavKey(slides[step.slideIndex]!.category)
    case "imagination-pair":
      return "imagination"
  }
}

export function PortfolioHomeScroll() {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const heroMeasureRef = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  const [insets, setInsets] = useState({ top: 132, bottom: PORTFOLIO_RAIL_BOTTOM_INSET_PX })

  const slides = useMemo(() => getPortfolioBottomLineSlides(), [])

  const storySteps = useMemo(() => buildStoryStepsInScrollOrder(slides), [slides])
  const storyStepCount = storySteps.length

  const trackMinVh = useMemo(
    () =>
      Math.min(
        3600,
        (280 +
          Math.max(storyStepCount, 1) * Math.round(88 * BOTTOM_LINE_SCROLL_STRETCH) +
          240) *
          3
      ),
    [storyStepCount]
  )

  const measureInsets = useCallback(() => {
    const h = heroMeasureRef.current?.offsetHeight
    setInsets({
      top: (h ?? 132) + 6,
      bottom: PORTFOLIO_RAIL_BOTTOM_INSET_PX,
    })
  }, [])

  useLayoutEffect(() => {
    measureInsets()
    const ro = new ResizeObserver(() => measureInsets())
    if (heroMeasureRef.current) ro.observe(heroMeasureRef.current)
    window.addEventListener("resize", measureInsets)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measureInsets)
    }
  }, [measureInsets])

  const onScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.offsetHeight - window.innerHeight
    const rect = el.getBoundingClientRect()
    const scrolled = -rect.top
    setP(max > 0 ? clamp01(scrolled / max) : 1)
  }, [])

  /** One button step ≈ typical mouse-wheel delta along the scroll track. */
  const scrollStoryByStep = useCallback((direction: "up" | "down") => {
    const el = trackRef.current
    if (!el) return
    const max = el.offsetHeight - window.innerHeight
    if (max <= 0) return
    const step = Math.max(100, Math.min(window.innerHeight * 0.42, max * 0.06))
    const delta = direction === "down" ? step : -step
    window.scrollBy({ top: delta, behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reduceMotion, onScroll])

  /** Narrower scroll band so the intro bio clears quickly once scrolling starts. */
  const introFadeStart = 0.02
  const introFadeEnd = 0.09
  const introTextOp = fadeOut(p, introFadeStart, introFadeEnd)

  const interleavedEndP = 1 - TAIL_PAD_P
  const interleavedSpanP = Math.max(0.001, interleavedEndP - INTERLEAVED_START_P)
  const uStory =
    p < INTERLEAVED_START_P || p > interleavedEndP
      ? -1
      : clamp01((p - INTERLEAVED_START_P) / interleavedSpanP)

  const wordCloudFadeInStart = Math.max(INTERLEAVED_START_P, interleavedEndP - WORD_CLOUD_FADE_IN_SPAN_P)
  const wordCloudOp =
    p >= interleavedEndP ? 1 : p <= wordCloudFadeInStart ? 0 : (p - wordCloudFadeInStart) / (interleavedEndP - wordCloudFadeInStart)

  const navHighlight: Record<PortfolioNavRailKey, number> = useMemo(() => {
    const acc: Record<PortfolioNavRailKey, number> = {
      experience: 0,
      education: 0,
      products: 0,
      academics: 0,
      imagination: 0,
    }
    if (uStory < 0) return acc
    const total = storySteps.length
    for (let idx = 0; idx < total; idx++) {
      const op = stageOpacityBottomLine(uStory, idx, total)
      const key = stepToNavKey(storySteps[idx]!, slides)
      acc[key] = Math.max(acc[key], op)
    }
    return acc
  }, [uStory, storySteps, slides])

  if (reduceMotion) {
    return (
      <div className="mx-auto w-[min(1100px,92vw)] px-0 pt-16 pb-16 sm:pt-20 sm:pb-16">
        <HeroSection />
        <ContactSection />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 -translate-y-2 border-b border-border bg-background/95 pb-1 pt-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 sm:pt-4">
        <div
          ref={heroMeasureRef}
          className="ml-52 box-border w-[calc(100%-13rem)] max-w-[min(1100px,calc(100vw-13rem))] px-3 sm:ml-60 sm:w-[calc(100%-15rem)] sm:max-w-[min(1100px,calc(100vw-15rem))] sm:px-5"
        >
          <PortfolioHeroTopBand />
        </div>
      </header>

      {/* Above header/footer (z-50) so chevrons sit on the border lines and are not clipped. */}
      <div
        className="pointer-events-none fixed left-52 right-0 z-[55] overflow-visible sm:left-60"
        style={{ top: insets.top, bottom: insets.bottom }}
      >
        <div className="relative h-full w-full overflow-visible">
          <div className="pointer-events-none absolute left-1/2 top-0 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <button
              type="button"
              onClick={() => scrollStoryByStep("up")}
              className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border-2 border-border bg-card leading-none text-foreground shadow-lg ring-2 ring-background transition-colors hover:border-primary/60 hover:text-primary sm:size-11"
              aria-label="Scroll story up"
            >
              <ChevronUp
                className="size-5 shrink-0 text-foreground sm:size-[1.35rem]"
                strokeWidth={3}
                aria-hidden
              />
            </button>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-[1] flex translate-y-1/2 -translate-x-1/2 items-center justify-center">
            <button
              type="button"
              onClick={() => scrollStoryByStep("down")}
              className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full border-2 border-border bg-card leading-none text-foreground shadow-lg ring-2 ring-background transition-colors hover:border-primary/60 hover:text-primary sm:size-11"
              aria-label="Scroll story down"
            >
              <ChevronDown
                className="size-5 shrink-0 text-foreground sm:size-[1.35rem]"
                strokeWidth={3}
                aria-hidden
              />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative bg-background"
        style={{
          minHeight: `${trackMinVh}vh`,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      />

      {/* Far-left tab rail (matches projects-grid tab chrome) + full remaining width for story */}
      <div className="pointer-events-none fixed inset-x-0 z-40" style={{ top: insets.top, bottom: insets.bottom }}>
        <nav
          className="pointer-events-auto absolute left-0 top-0 bottom-0 flex w-52 min-h-0 flex-col gap-1 overflow-hidden rounded-r-lg border-r border-border/70 bg-secondary/50 px-1.5 pl-2 pt-1.5 sm:w-60 sm:px-2 sm:pl-2.5 sm:pt-2"
          aria-label="Scroll story sections"
        >
          <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden overscroll-contain pr-0.5 [scrollbar-gutter:stable]">
          {PORTFOLIO_NAV_ORDER.map((key) => {
            const cfg = PORTFOLIO_NAV_TAB_CONFIG[key]
            const Icon = cfg.icon
            const glow = clamp01(navHighlight[key])
            const dim = 0.28
            const labelOpacity = dim + (1 - dim) * glow
            const isActive = glow > 0.12
            const detailsHash = portfolioNavKeyToDetailHash(key)
            return (
              <div
                key={key}
                className={cn(
                  "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-1 rounded-md px-2 py-2 text-left text-[0.7875rem] font-medium leading-snug transition-all sm:gap-x-[0.45rem] sm:px-[0.675rem] sm:py-[0.675rem] sm:text-[0.9rem]",
                  isActive
                    ? cn(
                        "bg-card border-l-2 shadow-sm",
                        cfg.activeClass,
                        "pl-[calc(0.5625rem-2px)] sm:pl-[calc(0.675rem-2px)]"
                      )
                    : "border-l-2 border-transparent text-muted-foreground hover:bg-card/50 hover:text-foreground"
                )}
                style={{ opacity: labelOpacity }}
              >
                <Icon
                  className="mt-0.5 size-[0.9rem] shrink-0 opacity-90 sm:mt-0.5 sm:size-[1.125rem]"
                  aria-hidden
                />
                <span className="min-w-0 break-words leading-snug">{cfg.label}</span>
                {detailsHash ? (
                  <Link
                    href={`${PORTFOLIO_DETAILS}#${detailsHash}`}
                    className={cn(
                      "mt-0.5 inline-flex shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-card/80 hover:text-foreground sm:p-[0.225rem]",
                      isActive && cfg.activeClass
                    )}
                    aria-label={`Open ${cfg.label} tab on portfolio details`}
                  >
                    <ArrowUpRight className="size-[0.9rem] sm:size-[0.9rem]" aria-hidden />
                  </Link>
                ) : null}
              </div>
            )
          })}
          </div>
          <PortfolioNavContactBlock />
        </nav>

        <div className="absolute left-52 right-0 top-0 bottom-0 min-h-0 sm:left-60">
          {/* Content only: overflow hidden avoids a second scrollbar (x-hidden + y-visible → y becomes auto). */}
          <div className="absolute inset-0 overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
            <div className="relative h-full min-h-0">
              {storySteps.map((step, idx) => {
                const op = stageOpacityBottomLine(uStory, idx, storyStepCount)
                const z = 40 + idx
                if (step.kind === "exp-logo") {
                  const logo = LOGOS_EXPERIENCE[step.expIndex]!
                  const slot = LOGO_SLOTS_EXPERIENCE[step.expIndex % LOGO_SLOTS_EXPERIENCE.length]!
                  const isQuiet = logo.src.includes(QUIET_LOGO_SUBSTRING)
                  return (
                    <div
                      key={`${idx}-exp-${step.expIndex}`}
                      className="absolute flex max-h-[min(62.4dvh,calc(100svh-10rem))] items-center justify-center"
                      style={{
                        ...slot,
                        ...fixedFadeStyle(op),
                        zIndex: z,
                      }}
                    >
                      <img
                        src={portfolioPath(logo.src)}
                        alt={logo.alt}
                        className={cn(
                          "h-auto w-full object-contain object-center",
                          isQuiet
                            ? "max-h-[min(28dvh,calc((100svh-10rem)/2))]"
                            : "max-h-[min(56dvh,calc(100svh-10rem))]"
                        )}
                      />
                    </div>
                  )
                }
                if (step.kind === "edu-logo") {
                  const logo = LOGOS_EDUCATION[step.eduIndex]!
                  const slot = LOGO_SLOTS_EDUCATION[step.eduIndex % LOGO_SLOTS_EDUCATION.length]!
                  const isUtAustin = logo.src.includes(UTAUSTIN_LOGO_SUBSTRING)
                  const isNsit = logo.src.includes(NSIT_LOGO_SUBSTRING)
                  return (
                    <div
                      key={`${idx}-edu-${step.eduIndex}`}
                      className="absolute flex max-h-[min(62.4dvh,calc(100svh-10rem))] items-center justify-center"
                      style={{
                        ...slot,
                        ...fixedFadeStyle(op),
                        zIndex: z,
                      }}
                    >
                      <img
                        src={portfolioPath(logo.src)}
                        alt={logo.alt}
                        className={cn(
                          "h-auto w-full object-contain object-center",
                          isUtAustin || isNsit
                            ? "max-h-[min(28dvh,calc((100svh-10rem)/2))]"
                            : "max-h-[min(56dvh,calc(100svh-10rem))]"
                        )}
                      />
                    </div>
                  )
                }
                if (step.kind === "slide") {
                  const s = slides[step.slideIndex]!
                  const slot = STORY_SLOTS[step.slideIndex % STORY_SLOTS.length]!
                  return (
                    <article
                      key={`${idx}-slide-${s.id}`}
                      className={cn(
                        "absolute max-h-[min(62.4dvh,calc(100svh-10rem))] overflow-y-auto overscroll-contain rounded-xl border px-6 py-5 text-left text-[0.92rem] leading-relaxed sm:px-8 sm:py-6 sm:text-[1.08rem]",
                        categoryBottomLineBannerClass[s.category as ProjectCategory]
                      )}
                      style={{
                        ...slot,
                        ...fixedFadeStyle(op),
                        zIndex: z,
                      }}
                    >
                      <span
                        className={cn(
                          "mb-1.5 inline-block rounded px-2.5 py-0.5 font-mono text-[0.65rem] sm:mb-2 sm:px-3 sm:py-1 sm:text-xs",
                          categoryBadgeClass[s.category]
                        )}
                      >
                        {s.category}
                      </span>
                      <p className="m-0 mt-0.5 text-base font-semibold text-foreground sm:text-lg">{s.title}</p>
                      <p className="m-0 mt-2.5 font-normal sm:mt-3">{s.text}</p>
                    </article>
                  )
                }
                const pair = PORTFOLIO_IMAGINATION_SCROLL_PAIRS[step.pairIndex]!
                const imagCategory = "Imagination Labs" as const
                return (
                  <div
                    key={`${idx}-imag-${pair.id}`}
                    className="absolute flex max-h-[min(39dvh,calc((100svh-10rem)*0.625))] flex-row items-stretch justify-center gap-2 sm:gap-2.5"
                    style={{
                      ...IMAGINATION_PAIR_SLOT,
                      ...fixedFadeStyle(op),
                      zIndex: z,
                    }}
                  >
                    <img
                      src={pair.imagePath}
                      alt={pair.imageAlt}
                      className="h-auto w-[min(40%,8.75rem)] max-h-[min(30dvh,calc((100svh-12rem)*0.625))] shrink-0 self-center object-contain object-center sm:w-[min(38%,10rem)]"
                    />
                    <div
                      className={cn(
                        "flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain rounded-lg border px-2.5 py-2.5 text-left text-[0.925rem] leading-snug sm:px-3 sm:py-3 sm:text-[1.075rem]",
                        categoryBottomLineBannerClass[imagCategory]
                      )}
                    >
                      <span
                        className={cn(
                          "mb-1 inline-block w-fit rounded px-1.5 py-0.5 font-mono text-[0.69rem] sm:mb-1.5 sm:px-2 sm:py-0.5 sm:text-[0.75rem]",
                          categoryBadgeClass[imagCategory]
                        )}
                      >
                        {imagCategory}
                      </span>
                      <p className="m-0 text-sm font-semibold text-foreground sm:text-base">{pair.heading}</p>
                      <p className="m-0 mt-2 font-normal sm:mt-2.5">{pair.blurb}</p>
                    </div>
                  </div>
                )
              })}

              <div
                className="pointer-events-none absolute inset-0 z-[56] flex items-center justify-center overflow-hidden px-3 sm:px-5"
                style={fixedFadeStyle(wordCloudOp, { passWheelToDocument: true })}
              >
                <img
                  src={portfolioPath("/PortfolioWordCloud.png")}
                  alt="Word cloud of toolkit terms and skills from portfolio projects"
                  className="h-auto w-full max-h-[min(36dvh,calc(50svh-6rem))] max-w-[min(21rem,48%)] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className="absolute inset-0 z-[52] overflow-hidden"
                style={fixedFadeStyle(introTextOp, { passWheelToDocument: true })}
              >
                <div className="flex min-h-full flex-col items-center justify-center px-3 py-6 sm:px-5 sm:py-10">
                  <p className="m-0 max-w-[min(38.4rem,96%)] text-center text-[clamp(0.96rem,3.04vw,1.68rem)] leading-[1.65] text-foreground sm:leading-[1.7]">
                    {HERO_BIO_PARAGRAPH}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
