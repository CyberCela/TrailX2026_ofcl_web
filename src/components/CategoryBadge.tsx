import type { TeamCategory } from "@/lib/types";

const categoryStyles: Record<TeamCategory, string> = {
  Scouts: "bg-emerald-100 text-emerald-700",
  "Rover Scouts": "bg-blue-100 text-blue-700",
  Open: "bg-amber-100 text-amber-700",
};

type CategoryBadgeProps = {
  category: TeamCategory;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
        categoryStyles[category]
      }`}
    >
      {category}
    </span>
  );
}
