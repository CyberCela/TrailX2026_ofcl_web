import type { Role } from "./types";

export const ROLE_DASHBOARDS: Record<Role, string> = {
  admin: "/dashboard/admin",
  organizer: "/dashboard/organizer",
  volunteer: "/dashboard/volunteer",
  participant: "/dashboard/participant",
};

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Admin",
  organizer: "Organizer",
  volunteer: "Volunteer",
  participant: "Participant",
};

export const canAccess = (role: Role | null, allowed: Role[]) => {
  if (!role) return false;
  return allowed.includes(role);
};
