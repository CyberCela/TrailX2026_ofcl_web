"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { TeamRegistrationCard } from "@/components/team/TeamRegistrationCard";
import { useActivities } from "@/hooks/useActivities";

export default function ParticipantDashboard() {
  const { items, loading } = useActivities();

  return (
    <DashboardShell
      title="Participant hub"
      description="Manage team details, payments, and live scoring."
    >
      <RoleGate
        allowed={["participant", "admin"]}
        title="Participant tools"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Create and manage team roster",
            "Upload payment receipts",
            "Track live leaderboard updates",
            "Access event materials",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
        <TeamRegistrationCard />
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            Activity catalog
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Browse activities that impact scoring and checkpoints.
          </p>
          <div className="mt-4 grid gap-3">
            {loading && <p>Loading activities...</p>}
            {!loading && items.length === 0 && (
              <p>No activities published yet.</p>
            )}
            {items.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-[var(--line)] bg-[var(--panel-strong)] p-4"
              >
                <p className="text-sm font-semibold text-[var(--ink)]">
                  {activity.name}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {activity.category} · Max {activity.maxPoints} pts
                </p>
              </div>
            ))}
          </div>
        </div>
      </RoleGate>
    </DashboardShell>
  );
}
