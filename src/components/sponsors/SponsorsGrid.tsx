"use client";

import { SPONSOR_TIERS } from "@/lib/constants";
import { useSponsors } from "@/hooks/useSponsors";

export function SponsorsGrid() {
  const { items, loading, error } = useSponsors();

  const grouped = SPONSOR_TIERS.map((tier) => ({
    tier,
    items: items.filter((sponsor) => sponsor.tier === tier),
  }));

  return (
    <div className="flex flex-col gap-12">
      {loading && (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          Loading sponsors...
        </div>
      )}
      {grouped.map((section) => (
        <section key={section.tier} className="flex flex-col gap-6">
          <h2 className="font-[var(--font-display)] text-3xl uppercase tracking-wide">
            {section.tier} Sponsors
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.items.length === 0 ? (
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-6 text-sm text-[var(--muted)]">
                No sponsors yet.
              </div>
            ) : (
              section.items.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 text-sm text-[var(--muted)] transition hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                >
                  <div className="flex h-16 items-center justify-center rounded-xl bg-[var(--panel-strong)]">
                    {sponsor.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="max-h-10 w-auto"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-[0.3em]">
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[var(--ink)]">
                      {sponsor.name}
                    </p>
                    {sponsor.description && (
                      <p className="mt-2 text-xs text-[var(--muted)]">
                        {sponsor.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                    Visit site
                  </span>
                </a>
              ))
            )}
          </div>
        </section>
      ))}
      {error && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {error}
        </p>
      )}
    </div>
  );
}
