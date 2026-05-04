"use client"

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { ContactSection } from "@/components/contact-section"
import { PortfolioHeroTopBand } from "@/components/portfolio-hero-top-band"
import { PortfolioHomeScrollHint } from "@/components/portfolio-home-scroll-hint"
import { PortfolioTopNavTabs } from "@/components/portfolio-top-nav-tabs"
import { categoryBadgeClass, categoryBottomLineBannerClass } from "@/lib/category-styles"
import { HERO_BIO_PARAGRAPH } from "@/lib/hero-copy"
import {
  getPortfolioBottomLineSlides,
  type PortfolioBottomLineSlide,
} from "@/lib/portfolio-home-bottom-lines"
import { PORTFOLIO_IMAGINATION_SCROLL_PAIRS } from "@/lib/portfolio-home-imagination-scroll"
import type { ProjectCategory } from "@/lib/projects"
import { PORTFOLIO_RAIL_BOTTOM_INSET_PX, type PortfolioNavRailKey } from "@/lib/portfolio-nav-config"
import { portfolioPath } from "@/lib/site-paths"
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

const LOGOS_EXPERIENCE: { src: string; alt: string; role: string }[] = [
  {
    src: "/companylogos/amazon-logo.jpg",
    alt: "Amazon",
    role: "Sr. Technical Program Manager",
  },
  {
    src: "/companylogos/deloitte-logo.jpg",
    alt: "Deloitte",
    role: "Senior Manager, Management Consulting",
  },
  {
    src: "/companylogos/quiet-logo.jpg",
    alt: "Quiet / AEO",
    role: "Sr. Manager, Product Management",
  },
]

const LOGOS_EDUCATION: { src: string; alt: string; degree: string }[] = [
  {
    src: "/companylogos/uofmichlogo.png",
    alt: "University of Michigan Ross School of Business",
    degree: "Masters of Business Administration",
  },
  {
    src: "/companylogos/utaustimmcombslogo.jpg",
    alt: "Texas McCombs School of Business",
    degree: "PG Diploma AI/ML",
  },
  {
    src: "/companylogos/nsitlogo.png",
    alt: "Netaji Subhas University of Technology (NSUT)",
    degree: "B. Engineering (Computer Science)",
  },
]

/** Experience tab (sky): tinted panel under company logos. */
const experienceRoleBannerClass =
  "rounded-lg border border-sky-500/30 bg-sky-500/20 text-sky-400 shadow-[0_10px_30px_rgba(14,165,233,0.22)]"

/** Education-only: same “tinted panel” idea as Products / Imagination banners (lighter transparent fill). */
const educationDegreeBannerClass =
  "rounded-lg border border-blue-950/45 bg-blue-950/30 text-blue-100 shadow-[0_10px_30px_rgba(23,37,84,0.38)]"

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
      top: (h ?? 132) + 2,
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
      <div className="w-full max-w-none px-0 pt-16 pb-16 sm:pt-20 sm:pb-16">
        <HeroSection />
        <ContactSection />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
        <div
          ref={heroMeasureRef}
          className="box-border w-full max-w-none px-[0.5in] pt-[0.3in] pb-1 sm:pb-1.5"
        >
          <PortfolioHeroTopBand />
        </div>
      </header>

      <PortfolioHomeScrollHint scrollProgress={p} />

      {/* Above header (z-50): home-only section tabs along the top of the story band. */}
      <div
        className="pointer-events-none fixed inset-x-0 z-[55] overflow-visible"
        style={{ top: insets.top, bottom: insets.bottom }}
      >
        <div className="relative h-full w-full overflow-visible">
          <div className="pointer-events-auto absolute left-2 right-2 top-2 z-[2] sm:left-4 sm:right-4 sm:top-3">
            <PortfolioTopNavTabs navHighlight={navHighlight} />
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

      <div className="pointer-events-none fixed inset-x-0 z-40" style={{ top: insets.top, bottom: insets.bottom }}>
        <div className="absolute inset-x-0 top-0 bottom-0 min-h-0">
          {/* Content only: overflow hidden avoids a second scrollbar (x-hidden + y-visible → y becomes auto). */}
          <div className="absolute inset-0 overflow-hidden px-3 pb-3 pt-16 sm:px-5 sm:pb-4 sm:pt-[4.25rem]">
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
                      className="absolute flex max-h-[min(62.4dvh,calc(100svh-10rem))] min-h-0 flex-col items-center justify-center overflow-y-auto overscroll-contain px-1"
                      style={{
                        ...slot,
                        ...fixedFadeStyle(op),
                        zIndex: z,
                      }}
                    >
                      <div className="inline-flex max-w-full flex-col items-stretch gap-2 sm:gap-2.5">
                        <img
                          src={portfolioPath(logo.src)}
                          alt={logo.alt}
                          className={cn(
                            "h-auto w-auto max-w-full shrink-0 self-center object-contain object-center",
                            isQuiet
                              ? "max-h-[min(22dvh,calc((100svh-12rem)*0.4))]"
                              : "max-h-[min(40dvh,calc((100svh-12rem)*0.5))]"
                          )}
                        />
                        <div
                          className={cn(
                            "w-full shrink-0 px-2.5 py-2 text-center text-[0.925rem] font-normal leading-snug sm:px-3 sm:py-2.5 sm:text-[1.075rem]",
                            experienceRoleBannerClass
                          )}
                        >
                          <p className="m-0">{logo.role}</p>
                        </div>
                      </div>
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
                      className="absolute flex max-h-[min(62.4dvh,calc(100svh-10rem))] min-h-0 flex-col items-center justify-center overflow-y-auto overscroll-contain px-1"
                      style={{
                        ...slot,
                        ...fixedFadeStyle(op),
                        zIndex: z,
                      }}
                    >
                      <div className="inline-flex max-w-full flex-col items-stretch gap-2 sm:gap-2.5">
                        <img
                          src={portfolioPath(logo.src)}
                          alt={logo.alt}
                          className={cn(
                            "h-auto w-auto max-w-full shrink-0 self-center object-contain object-center",
                            isUtAustin || isNsit
                              ? "max-h-[min(22dvh,calc((100svh-12rem)*0.4))]"
                              : "max-h-[min(28dvh,calc((100svh-12rem)*0.45))]"
                          )}
                        />
                        <div
                          className={cn(
                            "w-full shrink-0 px-2.5 py-2 text-center text-[0.925rem] font-normal leading-snug sm:px-3 sm:py-2.5 sm:text-[1.075rem]",
                            educationDegreeBannerClass
                          )}
                        >
                          <p className="m-0">{logo.degree}</p>
                        </div>
                      </div>
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
