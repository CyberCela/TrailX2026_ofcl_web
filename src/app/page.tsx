import Link from "next/link";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { EventHighlights } from "@/components/sections/EventHighlights";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { AnnouncementsFeed } from "@/components/AnnouncementsFeed";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsStrip />
      <EventHighlights />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            Real-time
          </p>
          <h2 className="font-[var(--font-display)] text-4xl uppercase tracking-wide">
            Live Scoreboard Preview
          </h2>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Keep teams motivated with instant scoring updates and category filters that
            refresh without a page reload.
          </p>
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
          <LeaderboardTable compact />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--muted)]">
            <span>Data updates instantly using Firestore listeners.</span>
            <Link
              href="/leaderboard"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-transparent hover:bg-[var(--accent)] hover:text-white"
            >
              View full leaderboard
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-20">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            Updates
          </p>
          <h2 className="font-[var(--font-display)] text-4xl uppercase tracking-wide">
            News & Announcements
          </h2>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Organizers publish live updates, safety reminders, and rally points.
          </p>
        </div>
        <AnnouncementsFeed />
      </section>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel-strong)] p-8 shadow-[var(--shadow)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
                Ready to hike
              </p>
              <h3 className="font-[var(--font-display)] text-4xl uppercase tracking-wide">
                Secure your team slot
              </h3>
              <p className="mt-2 max-w-xl text-base text-[var(--muted)]">
                Register teams, upload payment receipts, and manage rosters from a
                dedicated participant dashboard.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
            >
              Register now
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
