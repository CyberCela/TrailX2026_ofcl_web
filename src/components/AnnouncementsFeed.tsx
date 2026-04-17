"use client";

import { useAnnouncements } from "@/hooks/useAnnouncements";

export function AnnouncementsFeed() {
  const { items, loading, error } = useAnnouncements();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {loading && (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          Loading announcements...
        </div>
      )}
      {!loading && items.length === 0 && (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">
          No announcements available yet.
        </div>
      )}
      {items.map((announcement) => (
        <article
          key={announcement.id}
          className="flex h-full flex-col gap-3 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]"
        >
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            <span>{announcement.authorRole}</span>
            {announcement.pinned && (
              <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] text-white">
                Pinned
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-[var(--ink)]">
            {announcement.title}
          </h3>
          <p className="text-sm text-[var(--muted)]">{announcement.body}</p>
        </article>
      ))}
      {error && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {error}
        </p>
      )}
    </div>
  );
}
