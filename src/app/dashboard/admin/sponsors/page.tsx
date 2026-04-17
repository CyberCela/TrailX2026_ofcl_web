"use client";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { SponsorManager } from "@/components/sponsors/SponsorManager";

export default function SponsorsAdminPage() {
  return (
    <DashboardShell
      title="Sponsor management"
      description="Add, edit, and manage TrailX sponsors and logos."
    >
      <RoleGate allowed={["admin"]} title="Sponsor management">
        <SponsorManager />
      </RoleGate>
    </DashboardShell>
  );
}
