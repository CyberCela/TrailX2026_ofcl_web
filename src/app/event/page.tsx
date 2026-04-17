import { PublicLayout } from "@/components/layout/PublicLayout";
import { EVENT_DETAILS } from "@/lib/constants";

export default function EventPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            Public event info
          </p>
          <h1 className="font-[var(--font-display)] text-5xl uppercase tracking-wide">
            TrailX 2026 details
          </h1>
          <p className="text-base text-[var(--muted)]">
            Official public information for participants, partners, and spectators.
          </p>
        </div>
        <div className="grid gap-6 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-8 shadow-[var(--shadow)]">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Date
              </p>
              <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.date}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Duration
              </p>
              <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.duration}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Hike location
              </p>
              <p className="text-lg text-[var(--ink)]">{EVENT_DETAILS.locations.hike}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Awards location
              </p>
              <p className="text-lg text-[var(--ink)]">
                {EVENT_DETAILS.locations.awards}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Participants
            </p>
            <p className="text-lg text-[var(--ink)]">
              {EVENT_DETAILS.participants}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Competition overview
            </p>
            <p className="text-base text-[var(--muted)]">
              {EVENT_DETAILS.description}
            </p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Team-based hiking competition",
            "Skill stations: navigation, survival, first aid",
            "Live scoring updates across checkpoints",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-[var(--line)] bg-[var(--panel-strong)] p-6 text-sm text-[var(--muted)] shadow-[var(--shadow)]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
