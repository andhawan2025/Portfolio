/**
 * Matches `templates/index.html` `.contact` block (email, LinkedIn, GitHub).
 */
export function ContactSection() {
  return (
    <section className="mt-[42px] border-t border-border pt-[18px]">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Contact</h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Interested in working together or discussing AI/ML projects.
      </p>
      <ul className="mt-4 list-none space-y-2 p-0 text-foreground">
        <li>
          Email:{" "}
          <a href="mailto:andhawan@tmys.ai" className="text-primary no-underline hover:underline">
            andhawan@tmys.ai
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/anubhav-dhawan-74537617/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline hover:underline"
          >
            View
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/andhawan2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary no-underline hover:underline"
          >
            View
          </a>
        </li>
      </ul>
    </section>
  )
}
