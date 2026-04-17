"use client";

import { useMemo, useState } from "react";
import { TEAM_CATEGORIES } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useTeam } from "@/hooks/useTeam";
import { createTeam } from "@/services/teams";
import { updateScore } from "@/services/scores";
import { updateUserTeam } from "@/services/users";
import { CategoryBadge } from "@/components/CategoryBadge";
import type { Gender, TeamCategory, TeamMember } from "@/lib/types";

export function TeamRegistrationCard() {
  const { user, profile } = useAuth();
  const { team, loading } = useTeam(profile?.teamId);
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState<TeamCategory>("Scouts");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const leaderGender = profile?.gender;

  const roster = useMemo(() => {
    if (!user || !leaderGender) return [] as TeamMember[];
    return [
      { name: profile?.displayName || "Leader", gender: leaderGender, isLeader: true },
      ...members,
    ];
  }, [leaderGender, members, profile?.displayName, user]);

  const femaleCount = useMemo(
    () => roster.filter((member) => member.gender === "Female").length,
    [roster]
  );

  const memberCount = roster.length;

  const updateMember = (index: number, field: "name" | "gender", value: string) => {
    setMembers((prev) =>
      prev.map((member, idx) =>
        idx === index ? { ...member, [field]: value } : member
      )
    );
  };

  const addMemberField = () => {
    if (members.length >= 7) return;
    setMembers((prev) => [...prev, { name: "", gender: "Male" as Gender }]);
  };

  const removeMemberField = (index: number) => {
    setMembers((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleCreateTeam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    if (!leaderGender) {
      setStatus("Set your gender in your profile before creating a team.");
      return;
    }
    if (members.some((member) => !member.name.trim())) {
      setStatus("Enter names for all members.");
      return;
    }
    if (memberCount > 8) {
      setStatus("Teams can have a maximum of 8 members.");
      return;
    }
    if (femaleCount < 3) {
      setStatus("Teams must include at least 3 female members.");
      return;
    }

    const trimmedMembers = members.map((member) => ({
      ...member,
      name: member.name.trim(),
    }));
    const teamMembers = [
      { name: profile?.displayName || "Leader", gender: leaderGender, isLeader: true },
      ...trimmedMembers,
    ];
    const teamId = await createTeam({
      name: teamName,
      leaderId: user.uid,
      memberIds: [user.uid],
      category,
      members: teamMembers,
      memberCount: teamMembers.length,
      femaleCount: teamMembers.filter((member) => member.gender === "Female").length,
    });

    if (teamId) {
      await updateUserTeam(user.uid, teamId);
      await updateScore({
        teamId,
        teamName,
        category,
        points: 0,
        checkpoints: 0,
      });
      setTeamName("");
      setMembers([]);
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
          <div className="mt-3 rounded-xl border border-[var(--line)] bg-[var(--panel-strong)] p-3 text-xs text-[var(--muted)]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]">
              Roster ({team.memberCount ?? team.members?.length ?? 0})
            </p>
            <ul className="mt-3 space-y-2">
              {(team.members ?? []).map((member, index) => (
                <li key={`${member.name}-${index}`} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--ink)]">
                    {member.name}
                    {member.isLeader ? " (Leader)" : ""}
                  </span>
                  <span className="text-xs text-[var(--muted)]">{member.gender}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Female members: {team.femaleCount ?? 0}
            </p>
          </div>
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
          <div className="rounded-xl border border-[var(--line)] bg-[var(--panel-strong)] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                  Team roster
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Max 8 members (including leader). At least 3 female members.
                </p>
              </div>
              <button
                type="button"
                onClick={addMemberField}
                disabled={members.length >= 7}
                className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Add member
              </button>
            </div>
            {members.length === 0 && (
              <p className="mt-3 text-xs text-[var(--muted)]">
                Add the other team members here.
              </p>
            )}
            <div className="mt-3 grid gap-3">
              {members.map((member, index) => (
                <div
                  key={`member-${index}`}
                  className="grid gap-3 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 md:grid-cols-[1fr_160px_auto]"
                >
                  <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                    Name
                    <input
                      value={member.name}
                      onChange={(event) =>
                        updateMember(index, "name", event.target.value)
                      }
                      required
                      className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                    Gender
                    <select
                      value={member.gender}
                      onChange={(event) =>
                        updateMember(index, "gender", event.target.value)
                      }
                      className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeMemberField(index)}
                    className="mt-6 h-10 rounded-full border border-[var(--line)] px-3 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
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
