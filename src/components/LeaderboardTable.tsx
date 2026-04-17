"use client";

import { useMemo, useState } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { CategoryBadge } from "@/components/CategoryBadge";

type LeaderboardTableProps = {
  compact?: boolean;
};

export function LeaderboardTable({ compact = false }: LeaderboardTableProps) {
  const { items, loading, categories } = useLeaderboard();
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    if (category === "All") return items;
    return items.filter((item) => item.category === category);
  }, [items, category]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
        <span>Filter</span>
        <button
          type="button"
          onClick={() => setCategory("All")}
          className={`rounded-full border px-4 py-2 transition ${
            category === "All"
              ? "border-transparent bg-[var(--ink)] text-white"
              : "border-[var(--line)] text-[var(--ink)]"
          }`}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-4 py-2 transition ${
              category === item
                ? "border-transparent bg-[var(--ink)] text-white"
                : "border-[var(--line)] text-[var(--ink)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--panel-strong)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Points</th>
              {!compact && <th className="px-4 py-3 text-right">Checkpoints</th>}
            </tr>
          </thead>
          <tbody className="bg-[var(--panel)]">
            {loading && (
              <tr>
                <td className="px-4 py-6 text-[var(--muted)]" colSpan={5}>
                  Loading leaderboard...
                </td>
              </tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-[var(--muted)]" colSpan={5}>
                  No teams yet.
                </td>
              </tr>
            )}
            {filtered.map((entry, index) => (
              <tr key={entry.teamId} className="border-t border-[var(--line)]">
                <td className="px-4 py-3 font-semibold">#{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-[var(--ink)]">
                    {entry.teamName}
                  </div>
                  <div className="text-xs text-[var(--muted)]">{entry.teamId}</div>
                </td>
                <td className="px-4 py-3">
                  <CategoryBadge category={entry.category} />
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {entry.points}
                </td>
                {!compact && (
                  <td className="px-4 py-3 text-right text-[var(--muted)]">
                    {entry.checkpoints}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
