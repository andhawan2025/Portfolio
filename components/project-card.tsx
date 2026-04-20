"use client"

import { useState } from "react"
import { ArrowUpRight, Target, Zap, Image as ImageIcon, User, Wrench, ExternalLink, Network } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ArtifactModal } from "@/components/artifact-modal"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Project } from "@/lib/projects"
import {
  categoryBadgeClass,
  categoryBorderHoverClass,
  categoryCornerGlowClass,
  categoryImpactTextClass,
  categoryLinkClass,
  categoryTitleHoverClass,
} from "@/lib/category-styles"

interface ProjectCardProps {
  project: Project
  index: number
}

function hasArtifactModalContent(project: Project) {
  return project.artifacts.some(
    (a) => a.images.length > 0 || Boolean(a.title?.trim())
  )
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false)
  const [isTmysFrameOpen, setIsTmysFrameOpen] = useState(false)
  const showArtifactButton = hasArtifactModalContent(project)
  const cat = project.category
  const linkClass = `inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline transition-colors ${categoryLinkClass[cat]}`

  return (
    <>
      <article
        className={`group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 ${categoryBorderHoverClass[cat]} hover:bg-card/80`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Badge className={`font-mono text-xs border-0 ${categoryBadgeClass[cat]}`}>
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

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Target className="size-3" />
              Goal
            </div>
            <p className="text-sm leading-relaxed text-secondary-foreground">
              {project.goal}
            </p>
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Zap className="size-3" />
              Impact
            </div>
            {project.impactBullets && project.impactBullets.length > 0 ? (
              <ul
                className={`list-inside list-disc space-y-1.5 text-sm leading-relaxed ${categoryImpactTextClass[cat]}`}
              >
                {project.impactBullets.map((line) => (
                  <li key={line} className="pl-0.5">
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm leading-relaxed ${categoryImpactTextClass[cat]}`}>
                {project.impact ?? ""}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Wrench className="size-3" />
              Toolkit
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.toolkit.map((tool) => (
                <span
                  key={tool}
                  className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          {showArtifactButton ? (
            <button type="button" onClick={() => setIsArtifactModalOpen(true)} className={linkClass}>
              <ImageIcon className="size-4" />
              View Artifacts
              <ArrowUpRight className="size-3" />
            </button>
          ) : null}
          {project.artifactLinks?.map((link) =>
            link.kind === "external" ? (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <ExternalLink className="size-4" />
                {link.label}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => setIsTmysFrameOpen(true)}
                className={linkClass}
              >
                <Network className="size-4" />
                {link.label}
                <ArrowUpRight className="size-3" />
              </button>
            )
          )}
        </div>

        <div
          className={`absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full transition-transform group-hover:translate-x-10 group-hover:-translate-y-10 ${categoryCornerGlowClass[cat]}`}
        />
      </article>

      {showArtifactButton ? (
        <ArtifactModal
          project={project}
          isOpen={isArtifactModalOpen}
          onClose={() => setIsArtifactModalOpen(false)}
        />
      ) : null}

      <Dialog open={isTmysFrameOpen} onOpenChange={setIsTmysFrameOpen}>
        <DialogContent className="flex h-[90vh] w-[min(100vw-1rem,176rem)] max-w-[min(100vw-1rem,176rem)] min-w-[64rem] min-h-[32rem] resize overflow-auto gap-0 border-border bg-card p-0">
          <DialogTitle className="sr-only">TMYS Agentic Map</DialogTitle>
          <iframe
            title="TMYS architecture"
            src="/tmys-architecture.html"
            className="h-full min-h-0 w-full flex-1 border-0 bg-[#0d1117]"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
