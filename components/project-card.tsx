"use client"

import { useState, type ReactNode } from "react"
import {
  ArrowUpRight,
  Target,
  Zap,
  Image as ImageIcon,
  User,
  Wrench,
  ExternalLink,
  Network,
  TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ArtifactModal } from "@/components/artifact-modal"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Project, ProjectCategory } from "@/lib/projects"
import { InspirationalCartoonsProjectCard } from "@/components/inspirational-cartoons-project-card"
import { portfolioPath } from "@/lib/site-paths"
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

function projectWithSingleArtifact(project: Project, artifactIndex: number): Project {
  const slice = project.artifacts[artifactIndex]
  if (!slice) return project
  return { ...project, artifacts: [slice] }
}

function ProjectCardGoalSection({ goal }: { goal: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Target className="size-3" />
        Goal
      </div>
      <p className="text-sm leading-relaxed text-secondary-foreground">{goal}</p>
    </div>
  )
}

function ProjectCardImpactSection({
  project,
  cat,
  headingClassName,
  contentClassName,
}: {
  project: Project
  cat: ProjectCategory
  headingClassName?: string
  contentClassName?: string
}) {
  const impactContentClass = contentClassName ?? categoryImpactTextClass[cat]
  return (
    <div className="min-w-0">
      <div
        className={`mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${
          headingClassName ?? "text-muted-foreground"
        }`}
      >
        <Zap className="size-3" />
        {project.impactSectionLabel ??
          (cat === "Academics/Research" ? "Accomplishments" : "Impact")}
      </div>
      {project.impactSections && project.impactSections.length > 0 ? (
        <ul
          className={`list-outside list-disc space-y-3 pl-4 text-sm leading-relaxed marker:font-normal ${impactContentClass}`}
        >
          {project.impactSections.map((section) => (
            <li key={section.heading} className="pl-1">
              <span className="font-medium">{section.heading}</span>
              <ul
                className={`mt-1.5 list-outside list-[circle] space-y-1 pl-4 font-normal ${impactContentClass}`}
              >
                {section.bullets.map((line) => (
                  <li key={`${section.heading}-${line}`} className="pl-0.5">
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : project.impactBullets && project.impactBullets.length > 0 ? (
        <ul
          className={`list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed ${impactContentClass}`}
        >
          {project.impactBullets.map((line) => (
            <li key={line} className="pl-0.5">
              {line}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`text-sm leading-relaxed ${impactContentClass}`}>{project.impact ?? ""}</p>
      )}
    </div>
  )
}

function ProjectCardToolkitSection({ toolkit }: { toolkit: string[] }) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <Wrench className="size-3" />
        Toolkit
      </div>
      <div className="flex flex-wrap gap-1.5">
        {toolkit.map((tool) => (
          <span
            key={tool}
            className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCardBottomLineSection({ text, cat }: { text: string; cat: ProjectCategory }) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        <TrendingUp className="size-3" />
        Bottom Line
      </div>
      <p className={`text-sm leading-relaxed ${categoryImpactTextClass[cat]}`}>{text}</p>
    </div>
  )
}

const categoryAccentTextClass: Record<ProjectCategory, string> = {
  Products: "text-primary",
  "Academics/Research": "text-emerald-500",
  "Imagination Labs": "text-amber-500",
}

const categoryAccentBorderClass: Record<ProjectCategory, string> = {
  Products: "border-primary/50",
  "Academics/Research": "border-emerald-500/50",
  "Imagination Labs": "border-amber-500/50",
}

const categoryAccentTrackClass: Record<ProjectCategory, string> = {
  Products: "bg-primary/50",
  "Academics/Research": "bg-emerald-500/50",
  "Imagination Labs": "bg-amber-500/50",
}

const categoryBottomLineBannerClass: Record<ProjectCategory, string> = {
  Products:
    "border-primary/30 bg-primary/20 text-primary shadow-[0_10px_30px_hsl(var(--primary)/0.22)]",
  "Academics/Research":
    "border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.22)]",
  "Imagination Labs":
    "border-amber-500/30 bg-amber-500/20 text-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.22)]",
}

function ProjectCardBottomLineHighlight({ text, cat }: { text: string; cat: ProjectCategory }) {
  return (
    <div
      className={`rounded-xl border px-5 py-4 text-[0.945rem] font-normal leading-relaxed ${categoryBottomLineBannerClass[cat]}`}
    >
      {text}
    </div>
  )
}

function NumberedLeftSection({
  number,
  title,
  icon,
  children,
  cat,
  showConnector = true,
}: {
  number: number
  title: string
  icon: ReactNode
  children: ReactNode
  cat: ProjectCategory
  showConnector?: boolean
}) {
  return (
    <div className="relative min-w-0 pl-12">
      <div className="absolute left-0 top-0 flex w-6 justify-center">
        <span
          className={`z-10 inline-flex size-6 items-center justify-center rounded-full border bg-card text-[11px] font-semibold ${categoryAccentTextClass[cat]} ${categoryAccentBorderClass[cat]}`}
        >
          {number}
        </span>
      </div>
      {showConnector ? (
        <span
          className={`absolute left-3 top-6 h-[calc(100%-0.25rem)] w-px ${categoryAccentTrackClass[cat]}`}
          aria-hidden
        />
      ) : null}
      <div
        className={`mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${categoryAccentTextClass[cat]}`}
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  )
}

function PricingEngineLayout({ project, cat }: { project: Project; cat: ProjectCategory }) {
  const bottomLine = project.bottomLine?.trim()
  return (
    <div className="grid w-full gap-6 md:grid-cols-[1.45fr_1fr]">
      <div className="flex min-w-0 flex-col gap-6 md:pr-4">
        <NumberedLeftSection number={1} title="Goal" icon={<Target className="size-3" />} cat={cat}>
          <p className="text-sm leading-relaxed text-secondary-foreground">{project.goal}</p>
        </NumberedLeftSection>
        <NumberedLeftSection number={2} title="Toolkit" icon={<Wrench className="size-3" />} cat={cat}>
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
        </NumberedLeftSection>
        {bottomLine ? (
          <NumberedLeftSection
            number={3}
            title="Bottom Line"
            icon={<TrendingUp className="size-3" />}
            cat={cat}
            showConnector={false}
          >
            <ProjectCardBottomLineHighlight text={bottomLine} cat={cat} />
          </NumberedLeftSection>
        ) : null}
      </div>
      <div className="min-w-0 border-l border-border/70 pt-1 md:pl-6">
        <ProjectCardImpactSection
          project={project}
          cat={cat}
          headingClassName={categoryImpactTextClass[cat]}
          contentClassName={
            cat === "Imagination Labs"
              ? "text-white marker:text-white font-normal"
              : "text-secondary-foreground marker:text-secondary-foreground font-normal"
          }
        />
      </div>
    </div>
  )
}

const structuredProductLayoutIds = new Set([
  "pricing-engine",
  "nl2sql-reporting",
  "conversational-knowledge-platform",
  "human-ai-collaboration-transformation",
  "customer-targeting-revenue",
  "customer-retention-churn-intelligence",
  "market-sentiment-investment-analysis",
  "tmys",
])

function ProjectCardAdditionalRow({ items }: { items: string[] }) {
  return (
    <div className="mt-4">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Characters
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false)
  /** When set, modal shows only this artifact’s slides; when null, full `project` artifacts. */
  const [artifactModalProject, setArtifactModalProject] = useState<Project | null>(null)
  const [isTmysFrameOpen, setIsTmysFrameOpen] = useState(false)
  const undisclosedArtifacts = project.artifactModalUndisclosed === true
  const showArtifactButton = hasArtifactModalContent(project) && !undisclosedArtifacts
  const artifactGroups = project.artifactModalGroups ?? []
  const cat = project.category
  const linkClass = `inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline transition-colors ${categoryLinkClass[cat]}`
  const useMinimalArtifactModal =
    artifactModalProject !== null || project.id === "human-ai-collaboration-transformation"

  const openArtifactModalGroup = (artifactIndex: number) => {
    setArtifactModalProject(projectWithSingleArtifact(project, artifactIndex))
    setIsArtifactModalOpen(true)
  }

  const closeArtifactModal = () => {
    setIsArtifactModalOpen(false)
    setArtifactModalProject(null)
  }

  if (
    project.layout === "inspirational-cartoons" &&
    project.inspirationalCartoonsColumns?.length === 2
  ) {
    return <InspirationalCartoonsProjectCard project={project} index={index} />
  }

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

        {structuredProductLayoutIds.has(project.id) ? (
          <PricingEngineLayout project={project} cat={cat} />
        ) : (
          <div className="grid w-full gap-6 md:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-6">
              <ProjectCardGoalSection goal={project.goal} />
              <ProjectCardToolkitSection toolkit={project.toolkit} />
              {project.bottomLine?.trim() ? (
                <ProjectCardBottomLineSection text={project.bottomLine.trim()} cat={cat} />
              ) : null}
            </div>
            <ProjectCardImpactSection project={project} cat={cat} />
          </div>
        )}

        {project.additionalRow && project.additionalRow.length > 0 ? (
          <ProjectCardAdditionalRow items={project.additionalRow} />
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          {undisclosedArtifacts ? (
            <span
              className="inline-flex max-w-full flex-wrap items-center gap-2 text-sm text-muted-foreground"
              aria-disabled
            >
              <ImageIcon className="size-4 shrink-0 opacity-50" />
              <span className="font-medium">View Artifacts</span>
              {project.id === "tmys" ? null : (
                <span className="font-normal">(undisclosed due to proprietary reasons.)</span>
              )}
            </span>
          ) : showArtifactButton ? (
            <>
              {artifactGroups.length > 0 ? (
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <ImageIcon className="size-4 shrink-0 opacity-70" aria-hidden />
                  <span className="font-medium">View Artifacts</span>
                </span>
              ) : (
                <button type="button" onClick={() => setIsArtifactModalOpen(true)} className={linkClass}>
                  <ImageIcon className="size-4" />
                  View Artifacts
                  <ArrowUpRight className="size-3" />
                </button>
              )}
              {artifactGroups.length > 0
                ? artifactGroups.map(({ label, artifactIndex }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => openArtifactModalGroup(artifactIndex)}
                      className={linkClass}
                    >
                      {label}
                      <ArrowUpRight className="size-3" />
                    </button>
                  ))
                : null}
            </>
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
          project={artifactModalProject ?? project}
          isOpen={isArtifactModalOpen}
          onClose={closeArtifactModal}
          variant={useMinimalArtifactModal ? "minimal" : "default"}
        />
      ) : null}

      <Dialog open={isTmysFrameOpen} onOpenChange={setIsTmysFrameOpen}>
        <DialogContent className="flex h-[90vh] w-[min(100vw-1rem,176rem)] max-w-[min(100vw-1rem,176rem)] min-w-[64rem] min-h-[32rem] resize overflow-auto gap-0 border-border bg-card p-0">
          <DialogTitle className="sr-only">TMYS Agentic Map</DialogTitle>
          <iframe
            title="TMYS architecture"
            src={portfolioPath("/tmys-architecture.html")}
            className="h-full min-h-0 w-full flex-1 border-0 bg-[#0d1117]"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
