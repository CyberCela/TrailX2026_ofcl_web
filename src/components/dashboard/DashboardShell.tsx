"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARDS, ROLE_LABELS } from "@/lib/rbac";

type DashboardShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function DashboardShell({ title, description, children }: DashboardShellProps) {
  const { profile, signOutUser } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--page-bg)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Dashboard
            </p>
            <h1 className="font-[var(--font-display)] text-4xl uppercase tracking-wide">
              {title}
            </h1>
            <p className="text-sm text-[var(--muted)]">{description}</p>
          </div>
          <div className="flex items-center gap-3">
            {profile?.role && (
              <span className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
                {ROLE_LABELS[profile.role]}
              </span>
            )}
            <button
              type="button"
              onClick={signOutUser}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
          <Link
            href="/dashboard"
            className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
          >
            Overview
          </Link>
          {profile?.role && (
            <Link
              href={ROLE_DASHBOARDS[profile.role]}
              className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
            >
              My role
            </Link>
          )}
          <Link
            href="/leaderboard"
            className="rounded-full border border-[var(--line)] px-4 py-2 transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
          >
            Live scores
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] lg:col-span-2">
            {children}
          </div>
          <aside className="flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Quick actions
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Manage your tasks, track updates, and coordinate with TrailX teams.
            </p>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li>Review latest announcements</li>
              <li>Track team status</li>
              <li>Upload or verify documents</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
