"use client"

import { useState } from "react"
import { ArrowUpRight, Target, Zap, Image as ImageIcon, User, Wrench, ExternalLink, Network } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ArtifactModal } from "@/components/artifact-modal"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Project, ProjectCategory } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

const categoryColors: Record<string, string> = {
  Products: "bg-primary/20 text-primary",
  Research: "bg-emerald-500/20 text-emerald-400",
  "Fun Ventures": "bg-amber-500/20 text-amber-400",
}

const categoryBorderColors: Record<string, string> = {
  Products: "hover:border-primary/50",
  Research: "hover:border-emerald-500/50",
  "Fun Ventures": "hover:border-amber-500/50",
}

/** Match portfolio tab active colors (`projects-grid` categoryConfig). */
const categoryImpactTextClass: Record<ProjectCategory, string> = {
  Products: "text-primary marker:text-primary",
  Research: "text-emerald-500 marker:text-emerald-500",
  "Fun Ventures": "text-amber-500 marker:text-amber-500",
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

  return (
    <>
      <article
        className={`group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 ${categoryBorderColors[project.category]} hover:bg-card/80`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Badge className={`font-mono text-xs border-0 ${categoryColors[project.category]}`}>
                {project.category}
              </Badge>
              <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors sm:text-2xl">
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
                className={`list-inside list-disc space-y-1.5 text-sm leading-relaxed ${categoryImpactTextClass[project.category]}`}
              >
                {project.impactBullets.map((line) => (
                  <li key={line} className="pl-0.5">
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm leading-relaxed ${categoryImpactTextClass[project.category]}`}>
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
            <button
              type="button"
              onClick={() => setIsArtifactModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline transition-colors"
            >
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
                className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline transition-colors"
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
                className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline transition-colors"
              >
                <Network className="size-4" />
                {link.label}
                <ArrowUpRight className="size-3" />
              </button>
            )
          )}
        </div>

        <div className="absolute right-0 top-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full bg-primary/5 transition-transform group-hover:translate-x-10 group-hover:-translate-y-10" />
      </article>

      {showArtifactButton ? (
        <ArtifactModal
          project={project}
          isOpen={isArtifactModalOpen}
          onClose={() => setIsArtifactModalOpen(false)}
        />
      ) : null}

      <Dialog open={isTmysFrameOpen} onOpenChange={setIsTmysFrameOpen}>
        <DialogContent className="max-h-[90vh] w-[min(100vw-2rem,72rem)] max-w-[min(100vw-2rem,72rem)] gap-0 overflow-hidden border-border bg-card p-0">
          <DialogHeader className="border-b border-border px-4 py-3 text-left">
            <DialogTitle className="text-base font-semibold">TMYS Agentic Map</DialogTitle>
          </DialogHeader>
          <iframe
            title="TMYS architecture"
            src="/tmys-architecture.html"
            className="h-[min(80vh,720px)] w-full border-0 bg-[#0d1117]"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
