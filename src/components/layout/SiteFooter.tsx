import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[var(--font-display)] text-2xl uppercase text-[var(--ink)]">
            TrailX 2026
          </p>
          <p>All Island Hiking Competition</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.3em]">
          <Link href="/event" className="transition hover:text-[var(--ink)]">
            Event details
          </Link>
          <Link href="/leaderboard" className="transition hover:text-[var(--ink)]">
            Live scores
          </Link>
          <Link href="/register" className="transition hover:text-[var(--ink)]">
            Register
          </Link>
        </div>
        <p className="text-xs">Powered by Vercel + Firebase</p>
      </div>
    </footer>
  );
}
