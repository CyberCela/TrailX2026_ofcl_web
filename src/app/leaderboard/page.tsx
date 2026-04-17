import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            Live
          </p>
          <h1 className="font-[var(--font-display)] text-5xl uppercase tracking-wide">
            TrailX leaderboard
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            Real-time updates for all team categories and checkpoints.
          </p>
        </div>
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
          <LeaderboardTable />
        </div>
      </section>
    </PublicLayout>
  );
}
