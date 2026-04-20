import type { ProjectCategory } from "@/lib/projects"

/** Tab / badge tints — align with `projects-grid` `categoryConfig.activeClass`. */
export const categoryBadgeClass: Record<ProjectCategory, string> = {
  Products: "bg-primary/20 text-primary",
  Research: "bg-emerald-500/20 text-emerald-400",
  "Passion Projects": "bg-amber-500/20 text-amber-400",
}

export const categoryBorderHoverClass: Record<ProjectCategory, string> = {
  Products: "hover:border-primary/50",
  Research: "hover:border-emerald-500/50",
  "Passion Projects": "hover:border-amber-500/50",
}

export const categoryImpactTextClass: Record<ProjectCategory, string> = {
  Products: "text-primary marker:text-primary",
  Research: "text-emerald-500 marker:text-emerald-500",
  "Passion Projects": "text-amber-500 marker:text-amber-500",
}

/** View Artifacts, Demo Video, TMYS map links — same hue as tab. */
export const categoryLinkClass: Record<ProjectCategory, string> = {
  Products: "text-primary hover:text-primary",
  Research: "text-emerald-500 hover:text-emerald-400",
  "Passion Projects": "text-amber-500 hover:text-amber-400",
}

export const categoryTitleHoverClass: Record<ProjectCategory, string> = {
  Products: "group-hover:text-primary",
  Research: "group-hover:text-emerald-500",
  "Passion Projects": "group-hover:text-amber-500",
}

export const categoryCornerGlowClass: Record<ProjectCategory, string> = {
  Products: "bg-primary/5",
  Research: "bg-emerald-500/10",
  "Passion Projects": "bg-amber-500/10",
}

export const categoryModalSlideBadgeClass: Record<ProjectCategory, string> = {
  Products: "border-primary/30 text-primary",
  Research: "border-emerald-500/30 text-emerald-500",
  "Passion Projects": "border-amber-500/30 text-amber-500",
}

export const categoryModalNavHoverClass: Record<ProjectCategory, string> = {
  Products: "hover:bg-primary hover:text-primary-foreground",
  Research: "hover:bg-emerald-600 hover:text-white",
  "Passion Projects": "hover:bg-amber-600 hover:text-white",
}

export const categoryModalDotActiveClass: Record<ProjectCategory, string> = {
  Products: "bg-primary",
  Research: "bg-emerald-500",
  "Passion Projects": "bg-amber-500",
}

export const categoryToolkitPillClass: Record<ProjectCategory, string> = {
  Products: "bg-primary/20 text-primary",
  Research: "bg-emerald-500/20 text-emerald-500",
  "Passion Projects": "bg-amber-500/20 text-amber-500",
}
