import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PORTFOLIO_BASE } from "@/lib/site-paths"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Button asChild size="lg" className="text-base">
        <Link href={PORTFOLIO_BASE}>Portfolio</Link>
      </Button>
    </main>
  )
}
