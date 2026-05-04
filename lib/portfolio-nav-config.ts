import type { LucideIcon } from "lucide-react"
import { Briefcase, Building2, GraduationCap, School, Sparkles } from "lucide-react"
import type { ProjectCategory } from "@/lib/projects"
import { projects } from "@/lib/projects"

export const PORTFOLIO_NAV_ORDER = [
  "experience",
  "education",
  "products",
  "academics",
  "imagination",
] as const

/** Bottom clearance (px) for the `/portfolio` fixed story shell (padding above page end). */
export const PORTFOLIO_RAIL_BOTTOM_INSET_PX = 32

export type PortfolioNavRailKey = (typeof PORTFOLIO_NAV_ORDER)[number]

export const PORTFOLIO_NAV_TAB_CONFIG: Record<
  PortfolioNavRailKey,
  { label: string; icon: LucideIcon; activeClass: string }
> = {
  experience: {
    label: "Experience",
    icon: Building2,
    activeClass: "border-sky-500 text-sky-400",
  },
  education: {
    label: "Education",
    icon: School,
    activeClass: "border-blue-950 text-blue-200",
  },
  products: {
    label: "Products",
    icon: Briefcase,
    activeClass: "border-primary text-primary",
  },
  academics: {
    label: "Academics/Research",
    icon: GraduationCap,
    activeClass: "border-emerald-500 text-emerald-500",
  },
  imagination: {
    label: "Imagination Labs",
    icon: Sparkles,
    activeClass: "border-amber-500 text-amber-500",
  },
}

export type PortfolioDetailsHash = "products" | "academics" | "imagination"

export const PORTFOLIO_HASH_TO_CATEGORY: Record<PortfolioDetailsHash, ProjectCategory> = {
  products: "Products",
  academics: "Academics/Research",
  imagination: "Imagination Labs",
}

export const CATEGORY_TO_PORTFOLIO_HASH: Record<ProjectCategory, PortfolioDetailsHash> = {
  Products: "products",
  "Academics/Research": "academics",
  "Imagination Labs": "imagination",
}

export function portfolioNavKeyToDetailHash(key: PortfolioNavRailKey): PortfolioDetailsHash | null {
  if (key === "products" || key === "academics" || key === "imagination") return key
  return null
}

export function categoryToPortfolioNavKey(cat: ProjectCategory): PortfolioDetailsHash {
  return CATEGORY_TO_PORTFOLIO_HASH[cat]
}

export function projectTitlesForPortfolioHash(hash: PortfolioDetailsHash): string[] {
  const cat = PORTFOLIO_HASH_TO_CATEGORY[hash]
  return projects.filter((p) => p.category === cat).map((p) => p.title)
}

export function parsePortfolioHashToCategory(raw: string): ProjectCategory | null {
  const key = raw.toLowerCase()
  if (key === "products" || key === "academics" || key === "imagination") {
    return PORTFOLIO_HASH_TO_CATEGORY[key]
  }
  return null
}

export function categoryFromUrlHash(): ProjectCategory | null {
  if (typeof window === "undefined") return null
  return parsePortfolioHashToCategory(window.location.hash.slice(1))
}
