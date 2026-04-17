"use client";

import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/lib/types";

type RoleGateProps = {
  allowed: Role[];
  title: string;
  children: React.ReactNode;
};

export function RoleGate({ allowed, title, children }: RoleGateProps) {
  const { profile, loading } = useAuth();

  if (loading) {
    return <p className="text-sm text-[var(--muted)]">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
        <p>Sign in to access this dashboard.</p>
      </div>
    );
  }

  if (!allowed.includes(profile.role)) {
    return (
      <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
        <p>Access denied for your role.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-[var(--ink)]">{title}</h2>
      {children}
    </div>
  );
}
