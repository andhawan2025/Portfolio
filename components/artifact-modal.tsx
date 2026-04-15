"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
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

interface ArtifactModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

export function ArtifactModal({ project, isOpen, onClose }: ArtifactModalProps) {
  // Flatten all artifact images into slides with their metadata
  const slides = project.artifacts.flatMap((artifact) =>
    artifact.images.map((image) => ({
      image,
      title: artifact.title,
      description: artifact.description,
    }))
  )

  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Reset slide when modal opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setCurrentSlide(0)
    }
  }

  const currentSlideData = slides[currentSlide]

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-5xl bg-card border-border p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                {project.category}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
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

        {/* Main Content Area */}
        <div className="relative">
          {/* Image Display */}
          <div className="relative aspect-[16/9] bg-secondary">
            <Image
              src={currentSlideData.image}
              alt={`${currentSlideData.title} - Slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              crossOrigin="anonymous"
              priority
            />
            
            {/* Navigation Arrows */}
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="size-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="size-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          {/* Slide Info */}
          <div className="p-6 border-b border-border">
            <h4 className="text-lg font-medium text-foreground">
              {currentSlideData.title}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {currentSlideData.description}
            </p>
          </div>

          {/* Dot Navigation */}
          <div className="flex justify-center gap-2 p-4 bg-secondary/50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`size-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary scale-110"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer with Role, Skills & Toolkit */}
        <div className="p-6 border-t border-border bg-secondary/30">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Role */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Role
              </h4>
              <span className="text-sm font-medium text-foreground">{project.role}</span>
            </div>
            
            {/* Skills */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Toolkit */}
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Toolkit
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.toolkit.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary"
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
