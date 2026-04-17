"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARDS } from "@/lib/rbac";

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <DashboardShell
      title="Dashboard overview"
      description="Quick access to your TrailX role tools and team status."
    >
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-5 text-sm text-[var(--muted)]">
          {profile ? (
            <p>
              Welcome back, {profile.displayName}. Your role dashboard is ready.
            </p>
          ) : (
            <p>Sign in to see your personalized dashboard experience.</p>
          )}
        </div>
        {profile?.role && (
          <Link
            href={ROLE_DASHBOARDS[profile.role]}
            className="w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
          >
            Go to my role dashboard
          </Link>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Live scores update instantly across checkpoints.",
            "Announcements are visible to teams as soon as posted.",
            "Payments and receipts stay verified in one place.",
            "Resources are available by role and approval status.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
