import Link from "next/link";
import { EVENT_DETAILS } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="trailx-grid absolute inset-0 opacity-40" />
      <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />
      <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-[var(--accent-alt)] opacity-20 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            All Island Hiking Competition
          </p>
          <h1 className="max-w-3xl font-[var(--font-display)] text-5xl uppercase tracking-wide sm:text-6xl">
            {EVENT_DETAILS.name}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--muted)]">
            {EVENT_DETAILS.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
          >
            Register now
          </Link>
          <Link
            href="/event"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--ink)] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
          >
            Event details
          </Link>
        </div>
        <div className="grid gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)] shadow-[var(--shadow)] sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Date</p>
            <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.date}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Location</p>
            <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.locations.hike}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">Participants</p>
            <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.participants}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
