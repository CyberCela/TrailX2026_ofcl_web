export function StatsStrip() {
  const stats = [
    { label: "Teams", value: "220+" },
    { label: "Checkpoints", value: "9" },
    { label: "Skill Stations", value: "6" },
    { label: "Volunteer Crew", value: "150+" },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="grid gap-4 rounded-3xl border border-[var(--line)] bg-[var(--panel-strong)] p-6 text-sm shadow-[var(--shadow)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
              {stat.label}
            </span>
            <span className="font-[var(--font-display)] text-3xl uppercase tracking-wide">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
