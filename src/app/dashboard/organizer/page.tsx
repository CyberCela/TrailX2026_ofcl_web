"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { useActivities } from "@/hooks/useActivities";

export default function OrganizerDashboard() {
  const { items, loading } = useActivities();

  return (
    <DashboardShell
      title="Organizer ops"
      description="Coordinate checkpoints, scoring, and announcements."
    >
      <RoleGate allowed={["organizer", "admin"]} title="Organizer tools">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Update live team scores",
            "Manage checkpoint status",
            "Publish announcements and safety alerts",
            "Maintain event schedules",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
        <Link
          href="/dashboard/activities"
          className="rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-5 text-sm text-[var(--muted)]"
        >
          Manage activities
        </Link>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            Score update
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Select an activity to assign points at checkpoints.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Activity
              <select className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]">
                {loading && <option>Loading activities...</option>}
                {!loading && items.length === 0 && (
                  <option>No activities</option>
                )}
                {items.map((activity) => (
                  <option key={activity.id} value={activity.activityId}>
                    {activity.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Points
              <input
                type="number"
                min={0}
                className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </label>
          </div>
        </div>
      </RoleGate>
    </DashboardShell>
  );
}
