import { projects, type ProjectCategory } from "@/lib/projects"

const CATEGORY_ORDER: ProjectCategory[] = ["Products", "Academics/Research", "Imagination Labs"]

export type PortfolioBottomLineSlide = {
  id: string
  title: string
  category: ProjectCategory
  text: string
}

export function getPortfolioBottomLineSlides(): PortfolioBottomLineSlide[] {
  return CATEGORY_ORDER.flatMap((category) =>
    projects
      .filter((p) => p.category === category && p.bottomLine?.trim())
      .map((p) => ({
        id: p.id,
        title: p.title,
        category,
        text: p.bottomLine!.trim(),
      }))
  )
}
