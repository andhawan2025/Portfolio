"use client"

import { useEffect, useState } from "react"
import { User, Target, TrendingUp, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

function InspirationalColumn({
  column,
  cat,
  quoteIntervalMs,
}: {
  column: InspirationalCartoonsColumn
  cat: Project["category"]
  quoteIntervalMs: number
}) {
  const quoteIndex = useRotatingIndex(column.quotes.length, quoteIntervalMs)
  const quote = column.quotes[quoteIndex] ?? ""
  const impactTone = categoryImpactTextClass[cat]

  return (
    <div className="flex min-w-0 flex-col items-center gap-4">
      <h4
        className={`w-full text-center text-xl font-semibold tracking-tight text-foreground transition-colors sm:text-2xl ${categoryTitleHoverClass[cat]}`}
      >
        {column.characterName}
      </h4>
      <div className="flex w-full items-start justify-center gap-4">
        <div className="relative aspect-[9/16] w-full max-w-48 shrink-0 overflow-hidden rounded-lg bg-muted/30">
          <img
            src={column.image}
            alt={column.characterName}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className="mt-12 flex w-full max-w-48 flex-col items-start justify-center">
          <p
            className={`w-full h-[8rem] rounded-xl border border-amber-500/30 bg-amber-500/20 px-4 py-3 text-left text-[0.945rem] font-normal leading-relaxed shadow-[0_10px_30px_rgba(245,158,11,0.22)] ${impactTone}`}
          >
            {column.description}
          </p>
          <a
            href={column.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center gap-1.5 text-sm font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700"
          >
            <img src={YOUTUBE_LOGO_SRC} alt="" className="h-4 w-auto shrink-0" width={16} height={12} />
            <span>Subscribe</span>
          </a>
          <blockquote
            className="mt-4 min-h-[5rem] w-full py-2 text-left text-sm italic leading-relaxed text-foreground transition-opacity duration-300"
            key={quoteIndex}
          >
            {quote}
          </blockquote>
        </div>
      </div>
    </div>
  )
}

interface InspirationalCartoonsProjectCardProps {
  project: Project
  index: number
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
  const cat = project.category
  const columns = project.inspirationalCartoonsColumns ?? []
  if (columns.length !== 2) return null

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 ${categoryBorderHoverClass[cat]} hover:bg-card/80`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-3.5" />
            {project.role}
          </div>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mb-8 grid w-full gap-6 md:grid-cols-3">
        <div className="relative min-w-0">
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
        </div>
        <div className="relative min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
            >
              2
            </span>
            <Wrench className={`size-3 ${categoryAccentTextClass[cat]}`} />
            <span className={categoryAccentTextClass[cat]}>Toolkit</span>
          </div>
          {project.toolkit.length > 0 ? (
            <div className="ml-8 flex flex-wrap gap-1.5">
              {project.toolkit.map((tool) => (
                <span
                  key={tool}
                  className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : null}
          <span
            className={`pointer-events-none absolute left-[8rem] right-[-0.75rem] top-3 hidden h-px md:block ${categoryAccentTrackClass[cat]}`}
            aria-hidden
          />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
            <span
              className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
            >
              3
            </span>
            <TrendingUp className={`size-3 ${categoryAccentTextClass[cat]}`} />
            <span className={categoryAccentTextClass[cat]}>Bottom Line</span>
          </div>
          <p className="ml-8 text-sm leading-relaxed text-secondary-foreground">{project.impact ?? ""}</p>
        </div>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        <InspirationalColumn column={columns[0]} cat={cat} quoteIntervalMs={DOLMA_QUOTE_INTERVAL_MS} />
        <InspirationalColumn column={columns[1]} cat={cat} quoteIntervalMs={KIT_CAT_QUOTE_INTERVAL_MS} />
      </div>

      <div
        className={`absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full transition-transform group-hover:translate-x-10 group-hover:-translate-y-10 ${categoryCornerGlowClass[cat]}`}
      />
    </article>
  )
}
