import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Contact
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Interested in working together or discussing AI/ML projects? 
              {"I'm"} always open to new opportunities and collaborations.
            </p>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </p>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                hello@example.com
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                LinkedIn
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                @yourprofile
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                GitHub
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                @yourusername
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            <div className="pt-4">
              <Button className="font-mono">
                Download Resume
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-center font-mono text-xs text-muted-foreground">
            2026. Crafted with precision.
          </p>
        </div>
      </footer>
    </section>
  )
}
