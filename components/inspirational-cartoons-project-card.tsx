"use client"

import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  User,
  Target,
  TrendingUp,
  Wrench,
} from "lucide-react"
import { ArtifactModal } from "@/components/artifact-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PortfolioRevealBlock } from "@/components/portfolio-reveal"
import { useInView } from "@/hooks/use-in-view"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cardRevealTiming } from "@/lib/portfolio-reveal-timing"
import type { InspirationalCartoonsColumn, Project } from "@/lib/projects"
import { portfolioPath } from "@/lib/site-paths"
import {
  categoryBadgeClass,
  categoryBorderHoverClass,
  categoryCornerGlowClass,
  categoryImpactTextClass,
  categoryTitleHoverClass,
  categoryLinkClass,
} from "@/lib/category-styles"

const YOUTUBE_LOGO_SRC = portfolioPath("/tmys-arch/youtube-logo.png")

/** Dolma Doggie column (left) — dad jokes. */
const DOLMA_QUOTE_INTERVAL_MS = 7_000
/** Kit Cat column (right) — spiritual quotes. */
const KIT_CAT_QUOTE_INTERVAL_MS = 8_000
/** CPTVerse scene stills under the character row (matches CPTVerse SceneCarousel). */
const CPTVERSE_SCENE_INTERVAL_MS = 3_000

function useRotatingIndex(length: number, intervalMs: number) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [length, intervalMs])
  return index
}

function RevolvingSceneGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1 || reduceMotion) return

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, CPTVERSE_SCENE_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [isAutoPlaying, images.length, reduceMotion])

  if (images.length === 0) return null

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-sm">
      <div className="relative">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-amber-500/30 bg-card shadow-sm">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-card p-2">
                <img
                  src={src}
                  alt={`CPTVerse scene ${index + 1}`}
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 text-foreground hover:bg-background/80"
          onClick={goToPrevious}
          aria-label="Previous scene"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 text-foreground hover:bg-background/80"
          onClick={goToNext}
          aria-label="Next scene"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Scene ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-amber-500" : "bg-muted"
            }`}
            onClick={() => {
              setIsAutoPlaying(false)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

function InspirationalColumn({
  column,
  cat,
  quoteIntervalMs,
  circularImages,
  hideQuotes,
  hideDescriptions,
  showPerColumnYoutube,
}: {
  column: InspirationalCartoonsColumn
  cat: Project["category"]
  quoteIntervalMs: number
  circularImages?: boolean
  hideQuotes?: boolean
  hideDescriptions?: boolean
  showPerColumnYoutube?: boolean
}) {
  const showQuotes = !hideQuotes && column.quotes.length > 0
  const quoteIndex = useRotatingIndex(showQuotes ? column.quotes.length : 0, quoteIntervalMs)
  const quote = column.quotes[quoteIndex] ?? ""
  const impactTone = categoryImpactTextClass[cat]
  const showDescription = !hideDescriptions && Boolean(column.description.trim())

  if (circularImages) {
    return (
      <div className="flex min-w-0 flex-col items-center gap-4">
        <h4
          className={`w-full text-center text-xl font-semibold tracking-tight text-foreground transition-colors sm:text-2xl ${categoryTitleHoverClass[cat]}`}
        >
          {column.characterName}
        </h4>
        <div className="relative size-40 shrink-0 overflow-hidden rounded-full border-2 border-amber-500/35 bg-muted/30 shadow-[0_10px_30px_rgba(245,158,11,0.18)] sm:size-44">
          <img
            src={column.image}
            alt={column.characterName}
            className="h-full w-full object-cover object-[center_15%]"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col items-center gap-4">
      <h4
        className={`w-full text-center text-xl font-semibold tracking-tight text-foreground transition-colors sm:text-2xl ${categoryTitleHoverClass[cat]}`}
      >
        {column.characterName}
      </h4>
      <div
        className={
          showDescription || showPerColumnYoutube || showQuotes
            ? "flex w-full items-start justify-center gap-4"
            : "flex w-full justify-center"
        }
      >
        <div className="relative aspect-[9/16] w-full max-w-48 shrink-0 overflow-hidden rounded-lg bg-muted/30">
          <img
            src={column.image}
            alt={column.characterName}
            className="h-full w-full object-contain object-center"
          />
        </div>
        {showDescription || showPerColumnYoutube || showQuotes ? (
          <div className="mt-12 flex w-full max-w-48 flex-col items-start justify-center">
            {showDescription ? (
              <p
                className={`w-full h-[8rem] rounded-xl border border-amber-500/30 bg-amber-500/20 px-4 py-3 text-left text-[0.945rem] font-normal leading-relaxed shadow-[0_10px_30px_rgba(245,158,11,0.22)] ${impactTone}`}
              >
                {column.description}
              </p>
            ) : null}
            {showPerColumnYoutube ? (
              <a
                href={column.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${showDescription ? "mt-4" : ""} inline-flex w-full items-center gap-1.5 text-sm font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700`}
              >
                <img src={YOUTUBE_LOGO_SRC} alt="" className="h-4 w-auto shrink-0" width={16} height={12} />
                <span>Subscribe</span>
              </a>
            ) : null}
            {showQuotes ? (
              <blockquote
                className="mt-4 min-h-[5rem] w-full py-2 text-left text-sm italic leading-relaxed text-foreground transition-opacity duration-300"
                key={quoteIndex}
              >
                {quote}
              </blockquote>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface InspirationalCartoonsProjectCardProps {
  project: Project
  index: number
}

function hasArtifactModalContent(project: Project) {
  return project.artifacts.some(
    (a) => a.images.length > 0 || Boolean(a.title?.trim())
  )
}

function projectWithSingleArtifact(project: Project, artifactIndex: number): Project {
  const slice = project.artifacts[artifactIndex]
  if (!slice) return project
  return { ...project, artifacts: [slice] }
}

const categoryAccentTextClass: Record<Project["category"], string> = {
  Products: "text-primary",
  "Academics/Research": "text-emerald-500",
  "Imagination Labs": "text-amber-500",
}

const categoryAccentBorderClass: Record<Project["category"], string> = {
  Products: "border-primary/50",
  "Academics/Research": "border-emerald-500/50",
  "Imagination Labs": "border-amber-500/50",
}

const categoryAccentTrackClass: Record<Project["category"], string> = {
  Products: "bg-primary/50",
  "Academics/Research": "bg-emerald-500/50",
  "Imagination Labs": "bg-amber-500/50",
}

export function InspirationalCartoonsProjectCard({ project, index }: InspirationalCartoonsProjectCardProps) {
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false)
  const [artifactModalProject, setArtifactModalProject] = useState<Project | null>(null)
  const cat = project.category
  const columns = project.inspirationalCartoonsColumns ?? []
  const options = project.inspirationalCartoonsOptions
  const columnCount = columns.length
  const sharedYoutubeUrl = options?.sharedYoutubeUrl?.trim()
  const revolvingSceneImages = options?.revolvingSceneImages ?? []
  const showPerColumnYoutube = !sharedYoutubeUrl
  const undisclosedArtifacts = project.artifactModalUndisclosed === true
  const showArtifactButton = hasArtifactModalContent(project) && !undisclosedArtifacts
  const artifactGroups = project.artifactModalGroups ?? []
  const linkClass = `inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline transition-colors ${categoryLinkClass[cat]}`
  const bottomLineText = project.bottomLine?.trim() || project.impact?.trim() || ""
  const t = cardRevealTiming(project.toolkit.length, Boolean(bottomLineText))
  const { ref, inView } = useInView<HTMLElement>({
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.06,
  })
  const reduceMotion = useReducedMotion()
  const revealActive = reduceMotion || inView

  if (columnCount < 2 || columnCount > 3) return null

  const openArtifactModalGroup = (artifactIndex: number) => {
    setArtifactModalProject(projectWithSingleArtifact(project, artifactIndex))
    setIsArtifactModalOpen(true)
  }

  const closeArtifactModal = () => {
    setIsArtifactModalOpen(false)
    setArtifactModalProject(null)
  }

  const showArtifactFooter =
    (project.artifactLinks?.length ?? 0) > 0 ||
    undisclosedArtifacts ||
    showArtifactButton

  return (
    <>
    <article
      ref={ref}
      data-inview={revealActive ? "true" : "false"}
      className={`group group/pcard relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 ${categoryBorderHoverClass[cat]} hover:bg-card/80`}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <PortfolioRevealBlock delayMs={t.title}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`shrink-0 font-mono text-xs border-0 ${categoryBadgeClass[cat]}`}>
                {project.category}
              </Badge>
              <h3
                className={`text-xl font-semibold tracking-tight text-foreground transition-colors sm:text-2xl ${categoryTitleHoverClass[cat]}`}
              >
                {project.title}
              </h3>
            </div>
          </PortfolioRevealBlock>
          <PortfolioRevealBlock delayMs={t.meta}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="size-3.5" />
              {project.role}
            </div>
          </PortfolioRevealBlock>
        </div>
        <PortfolioRevealBlock delayMs={t.indexBadge} emphasize chip className="inline-block shrink-0">
          <span className="font-mono text-sm text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </PortfolioRevealBlock>
      </div>

      <div className="mb-8 grid w-full gap-6 md:grid-cols-3">
        <PortfolioRevealBlock delayMs={t.goal} className="relative min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
            >
              1
            </span>
            <Target className={`size-3 ${categoryAccentTextClass[cat]}`} />
            <span className={categoryAccentTextClass[cat]}>Goal</span>
          </div>
          <p className="ml-8 text-sm leading-relaxed text-secondary-foreground">{project.goal}</p>
          <span
            className={`pointer-events-none absolute left-[6.9rem] right-[-0.75rem] top-3 hidden h-px md:block ${categoryAccentTrackClass[cat]}`}
            aria-hidden
          />
        </PortfolioRevealBlock>
        <div className="relative min-w-0">
          <PortfolioRevealBlock delayMs={t.toolkitLabel}>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
              <span
                className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
              >
                2
              </span>
              <Wrench className={`size-3 ${categoryAccentTextClass[cat]}`} />
              <span className={categoryAccentTextClass[cat]}>Toolkit</span>
            </div>
          </PortfolioRevealBlock>
          {project.toolkit.length > 0 ? (
            <div className="ml-8 flex flex-wrap gap-1.5">
              {project.toolkit.map((tool, i) => (
                <PortfolioRevealBlock
                  key={tool}
                  chip
                  delayMs={t.toolkitChip(i)}
                  className="inline-block"
                >
                  <span className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground">
                    {tool}
                  </span>
                </PortfolioRevealBlock>
              ))}
            </div>
          ) : null}
          <span
            className={`pointer-events-none absolute left-[8rem] right-[-0.75rem] top-3 hidden h-px md:block ${categoryAccentTrackClass[cat]}`}
            aria-hidden
          />
        </div>
        <PortfolioRevealBlock delayMs={t.bottomLine} emphasize className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
            >
              3
            </span>
            <TrendingUp className={`size-3 ${categoryAccentTextClass[cat]}`} />
            <span className={categoryAccentTextClass[cat]}>Bottom Line</span>
          </div>
          <p className="ml-8 text-sm leading-relaxed text-secondary-foreground">{bottomLineText}</p>
        </PortfolioRevealBlock>
      </div>

      <div
        className={
          columnCount === 3
            ? "grid gap-10 md:grid-cols-3 md:gap-6"
            : "grid gap-10 md:grid-cols-2 md:gap-8"
        }
      >
        {columns.map((column, i) => (
          <PortfolioRevealBlock key={column.characterName} delayMs={t.impact + i * 70}>
            <InspirationalColumn
              column={column}
              cat={cat}
              quoteIntervalMs={i === 0 ? DOLMA_QUOTE_INTERVAL_MS : KIT_CAT_QUOTE_INTERVAL_MS}
              circularImages={options?.circularImages}
              hideQuotes={options?.hideQuotes}
              hideDescriptions={options?.hideDescriptions}
              showPerColumnYoutube={showPerColumnYoutube}
            />
          </PortfolioRevealBlock>
        ))}
      </div>

      {revolvingSceneImages.length > 0 ? (
        <PortfolioRevealBlock delayMs={t.impact + columnCount * 70}>
          <RevolvingSceneGallery images={revolvingSceneImages} />
        </PortfolioRevealBlock>
      ) : null}

      {sharedYoutubeUrl ? (
        <PortfolioRevealBlock
          delayMs={t.impact + columnCount * 70 + (revolvingSceneImages.length > 0 ? 80 : 0)}
          className="mt-8 flex justify-center"
        >
          <a
            href={sharedYoutubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            <img src={YOUTUBE_LOGO_SRC} alt="" className="h-4 w-auto shrink-0" width={16} height={12} />
            <span>Subscribe</span>
          </a>
        </PortfolioRevealBlock>
      ) : null}

      {showArtifactFooter ? (
        <PortfolioRevealBlock delayMs={t.footer}>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
            {undisclosedArtifacts ? (
              <span
                className="inline-flex max-w-full flex-wrap items-center gap-2 text-sm text-muted-foreground"
                aria-disabled
              >
                <ImageIcon className="size-4 shrink-0 opacity-50" />
                <span className="font-medium">View Artifacts</span>
              </span>
            ) : showArtifactButton ? (
              <>
                {artifactGroups.length > 0 ? (
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="size-4 shrink-0 opacity-70" aria-hidden />
                    <span className="font-medium">View Artifacts</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsArtifactModalOpen(true)}
                    className={linkClass}
                  >
                    <ImageIcon className="size-4" />
                    View Artifacts
                    <ArrowUpRight className="size-3" />
                  </button>
                )}
                {artifactGroups.map(({ label, artifactIndex }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => openArtifactModalGroup(artifactIndex)}
                    className={linkClass}
                  >
                    {label}
                    <ArrowUpRight className="size-3" />
                  </button>
                ))}
              </>
            ) : null}
            {project.artifactLinks?.map((link) => {
              const linkClass = `inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors ${categoryLinkClass[cat]}`
              if (link.kind === "disabled") {
                return (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                    aria-disabled
                  >
                    <ExternalLink className="size-4 shrink-0 opacity-50" />
                    <span className="font-medium">{link.label}</span>
                    <ArrowUpRight className="size-3 shrink-0 opacity-50" />
                  </span>
                )
              }
              if (link.kind === "external") {
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} hover:underline`}
                  >
                    <ExternalLink className="size-4" />
                    {link.label}
                    <ArrowUpRight className="size-3" />
                  </a>
                )
              }
              return null
            })}
          </div>
        </PortfolioRevealBlock>
      ) : null}

      <div
        className={`absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full transition-transform group-hover/pcard:translate-x-10 group-hover/pcard:-translate-y-10 ${categoryCornerGlowClass[cat]}`}
      />
    </article>

    {showArtifactButton ? (
      <ArtifactModal
        project={artifactModalProject ?? project}
        isOpen={isArtifactModalOpen}
        onClose={closeArtifactModal}
        variant="minimal"
      />
    ) : null}
    </>
  )
}
