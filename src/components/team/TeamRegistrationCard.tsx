"use client";

import { useState } from "react";
import { TEAM_CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useTeam } from "@/hooks/useTeam";
import { createTeam } from "@/services/teams";
import { updateUserTeam } from "@/services/users";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { TeamCategory } from "@/lib/types";

export function TeamRegistrationCard() {
  const { user, profile } = useAuth();
  const { team, loading } = useTeam(profile?.teamId);
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState<TeamCategory>("Scouts");
  const [status, setStatus] = useState<string | null>(null);

  const handleCreateTeam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    const teamId = await createTeam({
      name: teamName,
      leaderId: user.uid,
      memberIds: [user.uid],
      category,
    });

    if (teamId) {
      await updateUserTeam(user.uid, teamId);
      setTeamName("");
      setStatus("Team created and linked to your profile.");
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)]">
      <h3 className="text-base font-semibold text-[var(--ink)]">
        Team registration
      </h3>
      {loading && <p className="mt-3">Loading team...</p>}
      {!loading && team && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-sm text-[var(--muted)]">Your team</p>
          <p className="text-lg font-semibold text-[var(--ink)]">{team.name}</p>
          <CategoryBadge category={team.category} />
        </div>
      )}
      {!loading && !team && (
        <form className="mt-4 grid gap-4" onSubmit={handleCreateTeam}>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Team name
            <input
              value={teamName}
              onChange={(event) => setTeamName(event.target.value)}
              required
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as TeamCategory)}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              {TEAM_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
          >
            Create team
          </button>
        </form>
      )}
      {status && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {status}
        </p>
      )}
    </div>
  );
}
