"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[color:rgba(11,17,24,0.92)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-3xl font-[var(--font-display)] uppercase tracking-wide">
            TrailX
          </span>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            2026
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)] md:flex">
          <Link href="/event" className="transition hover:text-[var(--ink)]">
            Event
          </Link>
          <Link href="/leaderboard" className="transition hover:text-[var(--ink)]">
            Live Scores
          </Link>
          <Link href="/sponsors" className="transition hover:text-[var(--ink)]">
            Sponsors
          </Link>
          {!user && (
            <Link href="/register" className="transition hover:text-[var(--ink)]">
              Register
            </Link>
          )}
          <Link href="/dashboard" className="transition hover:text-[var(--ink)]">
            Dashboard
          </Link>
        </nav>
        {user ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
          >
            Register now
          </Link>
        )}
      </div>
    </header>
  );
}
