import { FOCUS_RING, ICON_TILE, STAT_ICONS, type StatIconKey } from "../dashboard.config";

type StatCardProps = {
  label: string;
  value: string;
  change: string;
  icon: StatIconKey;
};

export default function StatCard({ label, value, change, icon }: StatCardProps) {
  const Icon = STAT_ICONS[icon];

  return (
    <article className="rounded-xl border border-[#e7ebf2] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0064F9]/20 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between">
        <div className={ICON_TILE}>
          <Icon size={19} aria-hidden="true" />
        </div>

        <span className="text-xs font-medium text-[#10a36a]">{change}</span>
      </div>

      <div className="mt-5">
        <p className="text-[13px] font-medium text-[#718096]">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-[#111827]">{value}</p>
      </div>
    </article>
  );
}