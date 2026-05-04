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
import { cn } from "@/lib/utils"
import { Briefcase, GraduationCap, Sparkles } from "lucide-react"

const categoryConfig: Record<ProjectCategory, { icon: React.ReactNode; activeClass: string }> = {
  Products: {
    icon: <Briefcase className="size-5 sm:size-5" />,
    activeClass: "border-primary text-primary",
  },
  "Academics/Research": {
    icon: <GraduationCap className="size-5 sm:size-5" />,
    activeClass: "border-emerald-500 text-emerald-500",
  },
  "Imagination Labs": {
    icon: <Sparkles className="size-5 sm:size-5" />,
    activeClass: "border-amber-500 text-amber-500",
  },
}

const categories: ProjectCategory[] = ["Products", "Academics/Research", "Imagination Labs"]

type ProjectsGridProps = {
  /** When false, skip the “Portfolio” title (e.g. details page under hero). */
  showPortfolioHeading?: boolean
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
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Portfolio</h2>
            </SectionRevealBlock>
          </div>
        ) : null}

        <SectionRevealBlock groupName="section-reveal" delayMs={72}>
          <div className="mb-8 flex gap-2 rounded-xl bg-secondary/50 p-1.5 sm:gap-2.5 sm:p-2">
            {categories.map((category) => {
              const catConfig = categoryConfig[category]
              const isActive = activeCategory === category
              const projectCount = projects.filter((p) => p.category === category).length

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setCategory(category)
                    if (typeof window !== "undefined") {
                      const path = `${window.location.pathname}${window.location.search}`
                      const h = CATEGORY_TO_PORTFOLIO_HASH[category]
                      window.history.replaceState(null, "", `${path}#${h}`)
                    }
                  }}
                  className={cn(
                    "flex min-h-[3.25rem] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-3 py-3 text-center font-medium transition-all sm:min-h-[3.5rem] sm:flex-row sm:gap-2 sm:px-6 sm:py-4",
                    isActive
                      ? cn("bg-card border-b-2 shadow-sm", catConfig.activeClass)
                      : "border-b-2 border-transparent text-muted-foreground hover:bg-card/50 hover:text-foreground"
                  )}
                >
                  {catConfig.icon}
                  <span className="max-w-full truncate text-sm sm:inline sm:text-base">{category}</span>
                  <span className="font-mono text-xs opacity-70 sm:text-sm">({projectCount})</span>
                </button>
              )
            })}
          </div>
        </SectionRevealBlock>

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

      <div className="flex flex-col gap-6">
        {categoryProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
