"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";

export default function VolunteerDashboard() {
  return (
    <DashboardShell
      title="Volunteer station"
      description="Track assigned tasks and update checkpoint status."
    >
      <RoleGate allowed={["volunteer", "organizer", "admin"]} title="Volunteer tools">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "View assigned checkpoint tasks",
            "Update checkpoint arrivals",
            "Report safety concerns",
            "Check supplies and timing",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </RoleGate>
    </DashboardShell>
  );
}
