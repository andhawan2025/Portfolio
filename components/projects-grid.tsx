"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { projects, categoryDescriptions, type ProjectCategory } from "@/lib/projects"
import { heroStats } from "@/lib/hero-stats"
import { Briefcase, GraduationCap, Sparkles } from "lucide-react"

const categoryConfig: Record<ProjectCategory, { icon: React.ReactNode; activeClass: string }> = {
  Products: { 
    icon: <Briefcase className="size-4" />, 
    activeClass: "border-primary text-primary" 
  },
  Research: { 
    icon: <GraduationCap className="size-4" />, 
    activeClass: "border-emerald-500 text-emerald-500" 
  },
  "Passion Projects": { 
    icon: <Sparkles className="size-4" />, 
    activeClass: "border-amber-500 text-amber-500" 
  },
}

const categories: ProjectCategory[] = ["Products", "Research", "Passion Projects"]

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("Products")
  
  const categoryProjects = projects.filter((p) => p.category === activeCategory)

  return (
    <section className="mt-9">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Portfolio
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 rounded-lg bg-secondary/50 p-1">
        {categories.map((category) => {
          const catConfig = categoryConfig[category]
          const isActive = activeCategory === category
          const projectCount = projects.filter((p) => p.category === category).length
          
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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

      {/* Category Description */}
      <div className="mb-8 max-w-4xl">
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
