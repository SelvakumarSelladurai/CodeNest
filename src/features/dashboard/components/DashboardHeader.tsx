import { FiZap } from "react-icons/fi";

import { formatLongDate, getGreeting } from "../dashboard.config";
import PreparationTimer from "./PreparationTimer";

type DashboardHeaderProps = {
  firstName: string;
  streakDays: number;
  reviewsDue: number;
  now: Date;
};

export default function DashboardHeader({
  firstName,
  streakDays,
  reviewsDue,
  now,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-[#0064F9]">{formatLongDate(now)}</p>

          <span className="h-1 w-1 rounded-full bg-[#cbd5e1]" aria-hidden="true" />

          <div className="flex items-center gap-1 text-xs font-medium text-[#718096]">
            <FiZap size={13} aria-hidden="true" />
            {streakDays} day streak
          </div>
        </div>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          {getGreeting(now)}, {firstName}.
        </h1>

        <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#718096]">
          Keep building your knowledge. You have{" "}
          <span className="font-semibold text-[#374151]">{reviewsDue} concepts</span> ready for
          review today.
        </p>
      </div>

      <div className="shrink-0">
        <PreparationTimer />
      </div>
    </header>
  );
}