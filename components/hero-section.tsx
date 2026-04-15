import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function HeroSection() {
  return (
    <header className="relative border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-sm text-primary tracking-wider">
                AI/ML Product Manager
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Your Name
              </h1>
            </div>

            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Turning AI/ML capabilities into products that matter. 
              I bridge the gap between cutting-edge research and real-world 
              business impact.
            </p>

            <p className="text-secondary-foreground leading-relaxed">
              {"I've"} led AI product initiatives from 0-to-1, collaborated with 
              world-class research teams, and shipped ML-powered features to 
              millions of users. I love making complex technology accessible 
              and valuable.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-3xl font-bold text-primary">10+</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Products Shipped
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-3xl font-bold text-primary">$25M+</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Revenue Impact
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-3xl font-bold text-primary">3</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Research Papers
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-3xl font-bold text-primary">50M+</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Users Reached
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  )
}
