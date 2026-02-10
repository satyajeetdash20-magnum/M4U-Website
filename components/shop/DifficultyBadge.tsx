interface DifficultyBadgeProps {
  tier?: "bronze" | "silver" | "gold";
  labelOverride?: "NEW" | "BESTSELLER";
}

const tierStyles: Record<NonNullable<DifficultyBadgeProps["tier"]>, string> = {
  bronze: "bg-amber-100 text-amber-900 border-amber-300",
  silver: "bg-slate-100 text-slate-800 border-slate-300",
  gold: "bg-yellow-100 text-yellow-900 border-yellow-300",
};

export function DifficultyBadge({ tier, labelOverride }: DifficultyBadgeProps) {
  if (labelOverride) {
    const className =
      labelOverride === "BESTSELLER"
        ? "bg-navy text-white border-navy"
        : "bg-emerald-100 text-emerald-900 border-emerald-300";
    return (
      <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
        {labelOverride}
      </span>
    );
  }

  if (!tier) {
    return null;
  }

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${tierStyles[tier]}`}>
      {tier}
    </span>
  );
}
