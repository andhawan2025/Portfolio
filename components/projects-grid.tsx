"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { SectionRevealBlock } from "@/components/portfolio-reveal"
import { useInView } from "@/hooks/use-in-view"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import {
  CATEGORY_TO_PORTFOLIO_HASH,
  parsePortfolioHashToCategory,
} from "@/lib/portfolio-nav-config"
import { projects, categoryDescriptions, type ProjectCategory } from "@/lib/projects"
import { heroStats } from "@/lib/hero-stats"
import { Briefcase, GraduationCap, Sparkles } from "lucide-react"

const categoryConfig: Record<ProjectCategory, { icon: React.ReactNode; activeClass: string }> = {
  Products: { 
    icon: <Briefcase className="size-4" />, 
    activeClass: "border-primary text-primary" 
  },
  "Academics/Research": {
    icon: <GraduationCap className="size-4" />,
    activeClass: "border-emerald-500 text-emerald-500",
  },
  "Imagination Labs": { 
    icon: <Sparkles className="size-4" />, 
    activeClass: "border-amber-500 text-amber-500" 
  },
}

const categories: ProjectCategory[] = ["Products", "Academics/Research", "Imagination Labs"]

type ProjectsGridProps = {
  /** When false, skip the “Portfolio” title so tabs sit directly under an outer hero (e.g. details page). */
  showPortfolioHeading?: boolean
  /** Controlled category (e.g. portfolio details left nav + URL hash); omit for standalone hash + local state. */
  activeCategory?: ProjectCategory
  onActiveCategoryChange?: (category: ProjectCategory) => void
}

export function ProjectsGrid({
  showPortfolioHeading = true,
  activeCategory: controlledCategory,
  onActiveCategoryChange,
}: ProjectsGridProps) {
  const [internalCategory, setInternalCategory] = useState<ProjectCategory>("Products")
  const isControlled =
    typeof controlledCategory !== "undefined" && typeof onActiveCategoryChange === "function"
  const activeCategory = isControlled ? controlledCategory! : internalCategory
  const setCategory = (category: ProjectCategory) => {
    if (isControlled) onActiveCategoryChange!(category)
    else setInternalCategory(category)
  }
  const { ref: introRef, inView: introInView } = useInView<HTMLDivElement>({
    rootMargin: "0px 0px -6% 0px",
    threshold: 0.06,
  })
  const reduceMotion = useReducedMotion()
  const introActive = reduceMotion || introInView

  useEffect(() => {
    if (isControlled) return
    const applyHash = () => {
      const cat = parsePortfolioHashToCategory(window.location.hash.slice(1))
      if (cat) setInternalCategory(cat)
    }
    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [isControlled])

  const categoryProjects = projects.filter((p) => p.category === activeCategory)

  return (
    <section className={showPortfolioHeading ? "mt-9" : "mt-0"}>
      <div
        ref={introRef}
        data-inview={introActive ? "true" : "false"}
        className="group/section-reveal"
      >
        {showPortfolioHeading ? (
          <div className="mb-10">
            <SectionRevealBlock groupName="section-reveal" delayMs={0}>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Portfolio
              </h2>
            </SectionRevealBlock>
          </div>
        ) : null}

        {/* Tabs */}
        <SectionRevealBlock groupName="section-reveal" delayMs={72}>
          <div className="mb-8 flex gap-1 rounded-lg bg-secondary/50 p-1">
        {categories.map((category) => {
          const catConfig = categoryConfig[category]
          const isActive = activeCategory === category
          const projectCount = projects.filter((p) => p.category === category).length
          
          return (
            <button
              key={category}
              onClick={() => {
                setCategory(category)
                if (typeof window !== "undefined") {
                  const path = `${window.location.pathname}${window.location.search}`
                  const h = CATEGORY_TO_PORTFOLIO_HASH[category]
                  window.history.replaceState(null, "", `${path}#${h}`)
                }
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 font-medium transition-all ${
                isActive 
                  ? `bg-card border-b-2 ${catConfig.activeClass} shadow-sm` 
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {catConfig.icon}
              <span className="hidden sm:inline">{category}</span>
              <span className="font-mono text-xs opacity-70">({projectCount})</span>
            </button>
          )
        })}
          </div>
        </SectionRevealBlock>

        {/* Category Description */}
        <SectionRevealBlock groupName="section-reveal" delayMs={130} className="mb-8 max-w-4xl block">
          <p className="text-sm text-muted-foreground">{categoryDescriptions[activeCategory]}</p>
          {activeCategory === "Products" ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {heroStats.map(({ value, label }, index) => (
                <span key={label}>
                  <span className="font-semibold text-primary">{value}</span> {label}
                  {index < heroStats.length - 1 ? " | " : ""}
                </span>
              ))}
            </p>
          ) : null}
        </SectionRevealBlock>
      </div>

      {/* Projects - Full Width */}
      <div className="flex flex-col gap-6">
        {categoryProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
