"use client";

import { useMemo, useState } from "react";
import { ACTIVITY_CATEGORIES } from "@/lib/constants";
import { useActivities } from "@/hooks/useActivities";
import { createActivity, deleteActivity, updateActivity } from "@/services/activities";
import type { Activity, ActivityCategory } from "@/lib/types";

type ActivityFormState = {
  activityId: string;
  name: string;
  description: string;
  category: ActivityCategory;
  maxPoints: number;
  checkpointLocation: string;
  status: Activity["status"];
};

const emptyForm: ActivityFormState = {
  activityId: "",
  name: "",
  description: "",
  category: "Skill",
  maxPoints: 50,
  checkpointLocation: "",
  status: "active",
};

export function ActivityManager() {
  const { items, loading, error } = useActivities();
  const [form, setForm] = useState<ActivityFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Omit<Activity, "id"> = {
      activityId: form.activityId,
      name: form.name,
      description: form.description,
      category: form.category,
      maxPoints: Number(form.maxPoints),
      checkpointLocation: form.checkpointLocation || undefined,
      status: form.status,
    };

    if (editingId) {
      await updateActivity(editingId, payload);
    } else {
      await createActivity(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (activity: Activity) => {
    setEditingId(activity.id ?? null);
    setForm({
      activityId: activity.activityId,
      name: activity.name,
      description: activity.description,
      category: activity.category,
      maxPoints: activity.maxPoints,
      checkpointLocation: activity.checkpointLocation ?? "",
      status: activity.status,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <form
        className="grid gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-5 text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            {editingId ? "Edit activity" : "Add new activity"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]"
            >
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Activity ID
            <input
              value={form.activityId}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, activityId: event.target.value }))
              }
              required
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Name
            <input
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)] md:col-span-2">
            Description
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              required
              rows={3}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Category
            <select
              value={form.category}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  category: event.target.value as ActivityCategory,
                }))
              }
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              {ACTIVITY_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Max points
            <input
              type="number"
              value={form.maxPoints}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  maxPoints: Number(event.target.value),
                }))
              }
              min={0}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Checkpoint location
            <input
              value={form.checkpointLocation}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  checkpointLocation: event.target.value,
                }))
              }
              placeholder="Optional"
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: event.target.value as Activity["status"],
                }))
              }
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
        >
          {editingId ? "Save activity" : "Add activity"}
        </button>
      </form>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            Manage activities
          </h3>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            {sorted.length} activities
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--panel-strong)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Max points</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--panel)]">
              {loading && (
                <tr>
                  <td className="px-4 py-6 text-[var(--muted)]" colSpan={5}>
                    Loading activities...
                  </td>
                </tr>
              )}
              {!loading && sorted.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-[var(--muted)]" colSpan={5}>
                    No activities yet.
                  </td>
                </tr>
              )}
              {sorted.map((activity) => (
                <tr key={activity.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--ink)]">
                      {activity.name}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      {activity.activityId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {activity.category}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {activity.maxPoints}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (!activity.id) return;
                        updateActivity(activity.id, {
                          status:
                            activity.status === "active" ? "inactive" : "active",
                        });
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                        activity.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {activity.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(activity)}
                        className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!activity.id) return;
                          deleteActivity(activity.id);
                        }}
                        className="rounded-full border border-transparent bg-[var(--accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && (
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
