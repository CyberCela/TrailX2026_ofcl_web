"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { ActivityManager } from "@/components/activities/ActivityManager";

export default function ActivitiesPage() {
  return (
    <DashboardShell
      title="Manage activities"
      description="Create, edit, and activate TrailX scoring activities."
    >
      <RoleGate
        allowed={["admin", "organizer"]}
        title="Activity management"
      >
        <ActivityManager />
      </RoleGate>
    </DashboardShell>
  );
}
