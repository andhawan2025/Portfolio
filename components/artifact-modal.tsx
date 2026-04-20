"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/projects"
import {
  categoryBadgeClass,
  categoryModalDotActiveClass,
  categoryModalNavHoverClass,
  categoryModalSlideBadgeClass,
  categoryToolkitPillClass,
} from "@/lib/category-styles"

interface ArtifactModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  /** Subset slides only: wide chrome-free viewer (image, arrows, dots). */
  variant?: "default" | "minimal"
}

type Slide = { image: string; title: string; description: string }

function buildSlides(project: Project): Slide[] {
  return project.artifacts.flatMap((artifact) => {
    if (artifact.images.length > 0) {
      return artifact.images.map((image) => ({
        image,
        title: artifact.title,
        description: artifact.description,
      }))
    }
    return [
      {
        image: "",
        title: artifact.title,
        description:
          artifact.description.trim() ||
          "Supporting materials and deliverables for this initiative.",
      },
    ]
  })
}

export function ArtifactModal({ project, isOpen, onClose, variant = "default" }: ArtifactModalProps) {
  const slides = useMemo(() => buildSlides(project), [project])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setCurrentSlide(0)
  }, [project])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setCurrentSlide(0)
    }
  }

  const skills = project.skills ?? []
  const cat = project.category

  if (slides.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>No artifacts are configured for this project.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  const currentSlideData = slides[currentSlide]
  const singleSlide = slides.length === 1
  const hasImage = Boolean(currentSlideData.image)

  if (variant === "minimal") {
    const showNav = slides.length > 1
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[95vh] max-w-[min(100vw-1rem,128rem)] w-full gap-0 overflow-hidden border-border bg-card p-0 sm:max-w-[min(100vw-2rem,128rem)]">
          <DialogTitle className="sr-only">
            {currentSlideData.title} — slide {currentSlide + 1} of {slides.length}
          </DialogTitle>
          <div className="relative flex w-full flex-col">
            <div className="relative flex w-full items-center justify-center bg-secondary/40 px-4 py-6">
              <div className="relative mx-auto h-[min(85vh,920px)] w-full max-w-[120rem]">
                {hasImage ? (
                  <Image
                    src={currentSlideData.image}
                    alt={`${currentSlideData.title} — slide ${currentSlide + 1}`}
                    fill
                    className="object-contain object-center"
                    crossOrigin="anonymous"
                    priority
                    sizes="(max-width: 128rem) 100vw, 128rem"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 text-center">
                    <p className="text-sm font-medium text-foreground">{currentSlideData.title}</p>
                    <p className="max-w-lg text-sm text-muted-foreground">{currentSlideData.description}</p>
                  </div>
                )}

                {showNav ? (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={goToPrevious}
                      className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-4 ${categoryModalNavHoverClass[cat]} size-12 rounded-full border border-border bg-background/90 backdrop-blur-sm`}
                    >
                      <ChevronLeft className="size-6" />
                      <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={goToNext}
                      className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-4 ${categoryModalNavHoverClass[cat]} size-12 rounded-full border border-border bg-background/90 backdrop-blur-sm`}
                    >
                      <ChevronRight className="size-6" />
                      <span className="sr-only">Next slide</span>
                    </Button>
                  </>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center gap-2 bg-background/80 py-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`size-3 rounded-full transition-all ${
                    index === currentSlide
                      ? `${categoryModalDotActiveClass[cat]} scale-110`
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl bg-card border-border p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className={`font-mono text-xs border-0 ${categoryBadgeClass[cat]}`}>
                {project.category}
              </Badge>
              <Badge variant="outline" className={`font-mono text-xs ${categoryModalSlideBadgeClass[cat]}`}>
                {currentSlide + 1} of {slides.length}
              </Badge>
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-foreground mt-2">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground sr-only">
            Navigate through project artifacts using arrows or dots below
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <div className="relative aspect-[16/9] bg-secondary">
            {hasImage ? (
              <Image
                src={currentSlideData.image}
                alt={`${currentSlideData.title} - Slide ${currentSlide + 1}`}
                fill
                className="object-cover"
                crossOrigin="anonymous"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-secondary to-muted p-8 text-center">
                <p className="text-sm font-medium text-foreground">{currentSlideData.title}</p>
                <p className="max-w-lg text-sm text-muted-foreground">{currentSlideData.description}</p>
              </div>
            )}

            {!singleSlide ? (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goToPrevious}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors ${categoryModalNavHoverClass[cat]}`}
                >
                  <ChevronLeft className="size-6" />
                  <span className="sr-only">Previous slide</span>
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  onClick={goToNext}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors ${categoryModalNavHoverClass[cat]}`}
                >
                  <ChevronRight className="size-6" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </>
            ) : null}
          </div>

          {hasImage ? (
            <div className="p-6 border-b border-border">
              <h4 className="text-lg font-medium text-foreground">{currentSlideData.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{currentSlideData.description}</p>
            </div>
          ) : null}

          {!singleSlide ? (
            <div className="flex justify-center gap-2 p-4 bg-secondary/50">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`size-3 rounded-full transition-all ${
                    index === currentSlide
                      ? `${categoryModalDotActiveClass[cat]} scale-110`
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="p-6 border-t border-border bg-secondary/30">
          <div className={`grid gap-4 ${skills.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Role
              </h4>
              <span className="text-sm font-medium text-foreground">{project.role}</span>
            </div>

            {skills.length > 0 ? (
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                  Key Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Toolkit
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.toolkit.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className={`rounded-md px-2 py-0.5 font-mono text-xs ${categoryToolkitPillClass[cat]}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
