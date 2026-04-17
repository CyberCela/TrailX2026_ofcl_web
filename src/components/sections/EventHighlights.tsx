import Link from "next/link";

const highlights = [
  {
    title: "Team-based challenges",
    description:
      "Coordinate route strategy, pacing, and collaboration across the full trail day.",
  },
  {
    title: "Skill stations",
    description:
      "Navigation, survival, and first-aid stations add points and skills to every route.",
  },
  {
    title: "Live checkpoints",
    description:
      "Organizers and volunteers update status in real time for instant leaderboards.",
  },
];

export function EventHighlights() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
          Experience
        </p>
        <h2 className="font-[var(--font-display)] text-4xl uppercase tracking-wide">
          Build the journey together
        </h2>
        <p className="max-w-2xl text-base text-[var(--muted)]">
          TrailX combines competition with community. Teams take on tough terrain, team
          challenges, and live scoring in a single epic day.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="flex flex-col gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]"
          >
            <h3 className="text-lg font-semibold text-[var(--ink)]">
              {highlight.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{highlight.description}</p>
          </div>
        ))}
      </div>
      <Link
        href="/event"
        className="w-fit rounded-full border border-[var(--line)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink)] transition hover:border-transparent hover:bg-[var(--ink)] hover:text-white"
      >
        See event details
      </Link>
    </section>
  );
}
