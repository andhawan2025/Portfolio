import { ProfileAvatar } from "@/components/profile-avatar"
import { heroStats } from "@/lib/hero-stats"

/**
 * Matches `templates/index.html` + `static/styles.css` (`.hero`, `.hero-text`, `.name-row`, `.eyebrow`, `.lead`, `.sublead`, `.stats`, `.stat-card`).
 * Stat copy lives in `app.py` (`HERO_STATS`) and `lib/hero-stats.ts` — keep them aligned.
 */

export function HeroSection() {
  return (
    <header className="grid grid-cols-1 gap-6 border-b border-border pb-7 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <ProfileAvatar />
          <h1 className="m-0 min-w-0 flex-1 text-[clamp(1.75rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-foreground">
            Anubhav Dhawan
          </h1>
        </div>
        <p className="my-2 ml-[88px] text-[0.8rem] font-normal uppercase leading-normal tracking-[0.08em] text-primary lg:ml-[104px]">
          AI/ML Product Manager & Consultant
        </p>
        <p className="mb-3 text-[1.1rem] leading-[1.7] text-muted-foreground">
          I turn AI/ML capabilities into real-world products that drive measurable business outcomes.
        </p>
        <p className="leading-[1.7] text-foreground">
          AI Product Leader with 10+ years across Amazon, Deloitte, and Startups — building 0 → 1 and scaled
          solutions using LLMs, RAG, and ML to automate workflows, optimize decisions, and unlock value.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {heroStats.map(({ value, label }) => (
          <article
            key={label}
            className="flex h-[148px] w-full flex-col items-center justify-center gap-1 rounded-xl border border-border bg-card px-3 py-3 text-center"
          >
            <p className="m-0 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-none text-primary">{value}</p>
            <p className="max-w-[11rem] text-pretty text-[0.88rem] leading-snug text-muted-foreground">{label}</p>
          </article>
        ))}
      </div>
    </header>
  )
}
