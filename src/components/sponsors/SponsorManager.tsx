"use client";

import { useMemo, useState } from "react";
import { SPONSOR_TIERS } from "@/lib/constants";
import { useSponsors } from "@/hooks/useSponsors";
import {
  createSponsor,
  deleteSponsor,
  updateSponsor,
  uploadSponsorLogo,
} from "@/services/sponsors";
import type { Sponsor, SponsorTier } from "@/lib/types";

type SponsorFormState = {
  sponsorId: string;
  name: string;
  tier: SponsorTier;
  websiteUrl: string;
  description: string;
};

const emptyForm: SponsorFormState = {
  sponsorId: "",
  name: "",
  tier: "Gold",
  websiteUrl: "",
  description: "",
};

export function SponsorManager() {
  const { items, loading, error } = useSponsors({ realtime: true });
  const [form, setForm] = useState<SponsorFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const sorted = useMemo(() => items, [items]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let logoUrl = "";

    if (logoFile) {
      logoUrl = await uploadSponsorLogo(logoFile, form.sponsorId || form.name);
    }

    if (editingId) {
      await updateSponsor(editingId, {
        sponsorId: form.sponsorId,
        name: form.name,
        tier: form.tier,
        websiteUrl: form.websiteUrl,
        description: form.description || undefined,
        ...(logoUrl ? { logoUrl } : {}),
      });
    } else {
      await createSponsor({
        sponsorId: form.sponsorId,
        name: form.name,
        tier: form.tier,
        websiteUrl: form.websiteUrl,
        description: form.description || undefined,
        logoUrl,
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setLogoFile(null);
  };

  const startEdit = (sponsor: Sponsor) => {
    setEditingId(sponsor.id ?? null);
    setForm({
      sponsorId: sponsor.sponsorId,
      name: sponsor.name,
      tier: sponsor.tier,
      websiteUrl: sponsor.websiteUrl,
      description: sponsor.description ?? "",
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
            {editingId ? "Edit sponsor" : "Add sponsor"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
                setLogoFile(null);
              }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]"
            >
              Cancel edit
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Sponsor ID
            <input
              value={form.sponsorId}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, sponsorId: event.target.value }))
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
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Tier
            <select
              value={form.tier}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  tier: event.target.value as SponsorTier,
                }))
              }
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            >
              {SPONSOR_TIERS.map((tier) => (
                <option key={tier} value={tier}>
                  {tier}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Website URL
            <input
              value={form.websiteUrl}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  websiteUrl: event.target.value,
                }))
              }
              required
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)] md:col-span-2">
            Description (optional)
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              rows={2}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)] md:col-span-2">
            Logo upload
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)}
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--ink)]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-fit rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[var(--accent-strong)]"
        >
          {editingId ? "Save sponsor" : "Add sponsor"}
        </button>
      </form>

      <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[var(--ink)]">
            Manage sponsors
          </h3>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            {sorted.length} sponsors
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--line)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--panel-strong)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Website</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--panel)]">
              {loading && (
                <tr>
                  <td className="px-4 py-6 text-[var(--muted)]" colSpan={4}>
                    Loading sponsors...
                  </td>
                </tr>
              )}
              {!loading && sorted.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-[var(--muted)]" colSpan={4}>
                    No sponsors yet.
                  </td>
                </tr>
              )}
              {sorted.map((sponsor) => (
                <tr key={sponsor.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--ink)]">
                      {sponsor.name}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      {sponsor.sponsorId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {sponsor.tier}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {sponsor.websiteUrl}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(sponsor)}
                        className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSponsor(sponsor.id ?? "")}
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
