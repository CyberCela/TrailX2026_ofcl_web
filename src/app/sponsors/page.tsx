import { PublicLayout } from "@/components/layout/PublicLayout";
import { SponsorsGrid } from "@/components/sponsors/SponsorsGrid";

export default function SponsorsPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--muted)]">
            Partners
          </p>
          <h1 className="font-[var(--font-display)] text-5xl uppercase tracking-wide">
            TrailX sponsors
          </h1>
          <p className="max-w-2xl text-base text-[var(--muted)]">
            The partners powering TrailX 2026 with gear, logistics, and community
            support.
          </p>
        </div>
        <SponsorsGrid />
      </section>
    </PublicLayout>
  );
}
