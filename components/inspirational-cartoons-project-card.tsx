"use client"

import { useEffect, useState } from "react"
import { User, Target, Zap, Wrench } from "lucide-react"
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
      <div className="flex w-full justify-center">
        <div className="relative aspect-[9/16] w-full max-w-48 overflow-hidden rounded-lg bg-muted/30">
          <img
            src={column.image}
            alt={column.characterName}
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>
      <p className={`w-full text-center text-sm font-medium leading-relaxed ${impactTone}`}>
        {column.description}
      </p>
      <blockquote
        className="min-h-[5rem] w-full px-3 py-3 text-center text-sm italic leading-relaxed text-foreground transition-opacity duration-300"
        key={quoteIndex}
      >
        {quote}
      </blockquote>
      <a
        href={column.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline ${categoryLinkClass[cat]}`}
      >
        <img src={YOUTUBE_LOGO_SRC} alt="" className="h-6 w-auto shrink-0" width={24} height={18} />
        <span>Please subscribe, like and share!</span>
      </a>
    </div>
  )
}

interface InspirationalCartoonsProjectCardProps {
  project: Project
  index: number
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
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={`shrink-0 font-mono text-xs border-0 ${categoryBadgeClass[cat]}`}>
              {project.category}
            </Badge>
            <h3
              className={`min-w-0 text-xl font-semibold tracking-tight text-foreground transition-colors sm:text-2xl ${categoryTitleHoverClass[cat]}`}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <User className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <span className="font-medium text-foreground">Role:</span>
              <span>{project.role}</span>
            </span>
            <span className="text-border" aria-hidden>
              |
            </span>
            <span className="inline-flex items-center gap-2">
              <Target className="size-3 shrink-0 text-muted-foreground" aria-hidden />
              <span className="font-medium text-foreground">Goal:</span>
              <span>{project.goal}</span>
            </span>
            <span className="text-border" aria-hidden>
              |
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="size-3 shrink-0 text-muted-foreground" aria-hidden />
              <span className="font-medium text-foreground">Impact:</span>
              <span>{project.impact ?? ""}</span>
            </span>
            {project.toolkit.length > 0 ? (
              <>
                <span className="text-border" aria-hidden>
                  |
                </span>
                <span className="inline-flex items-center gap-2">
                  <Wrench className="size-3 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="font-medium text-foreground">Toolkit:</span>
                  <span>{project.toolkit.join(", ")}</span>
                </span>
              </>
            ) : null}
          </div>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
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
