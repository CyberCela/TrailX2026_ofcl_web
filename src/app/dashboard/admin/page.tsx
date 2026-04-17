"use client";

import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RoleGate } from "@/components/dashboard/RoleGate";
import { CategoryBadge } from "@/components/CategoryBadge";

export default function AdminDashboard() {
  return (
    <DashboardShell
      title="Admin control"
      description="Manage roles, approvals, payments, and event content."
    >
      <RoleGate allowed={["admin"]} title="Admin tools">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Approve or reject registrations",
            "Assign roles to organizers and volunteers",
            "Verify payment receipts and update status",
            "Publish news, resources, and event details",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/dashboard/activities"
            className="rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-5 text-sm text-[var(--muted)]"
          >
            Manage activities
          </Link>
          <Link
            href="/dashboard/admin/sponsors"
            className="rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-5 text-sm text-[var(--muted)]"
          >
            Manage sponsors
          </Link>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Team categories
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CategoryBadge category="Scouts" />
            <CategoryBadge category="Rover Scouts" />
            <CategoryBadge category="Open" />
          </div>
        </div>
      </RoleGate>
    </DashboardShell>
  );
}
