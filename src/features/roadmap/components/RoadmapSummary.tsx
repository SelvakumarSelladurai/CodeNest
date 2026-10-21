import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight, FiCheckCircle, FiPlay, FiTarget } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { CARD, EYEBROW, FOCUS_RING, PATH_GUIDANCE, TRACK } from "../roadmap.config";
import type { RoadmapStats } from "../roadmap.logic";

type RoadmapHeaderProps = {
  description: string;
};

export function RoadmapHeader({ description }: RoadmapHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className={`mb-2 flex items-center gap-2 ${EYEBROW}`}>
          <FiTarget size={14} aria-hidden="true" />
          Your learning journey
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Learning roadmap
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">{description}</p>
      </div>

      <Button className="shrink-0 gap-2" onClick={() => navigate("/concepts")}>
        Explore concepts
        <FiArrowRight size={15} aria-hidden="true" />
      </Button>
    </header>
  );
}

type RoadmapOverviewProps = {
  title: string;
  estimatedDuration: string;
  weeklyGoal: string;
  stats: RoadmapStats;
  icon?: ReactNode;
};

export function RoadmapOverview({
  title,
  estimatedDuration,
  weeklyGoal,
  stats,
  icon,
}: RoadmapOverviewProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce7fb] bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0064F9]">
              Main learning path
            </span>
            <span className="text-xs text-[#8b95a7]">{estimatedDuration}</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            {icon}
            <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">{title}</h2>
          </div>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#718096]">{PATH_GUIDANCE}</p>

          <div className="mt-6 max-w-2xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-[#374151]">Overall completion</span>
              <span className="text-sm font-bold text-[#0064F9]">{stats.percent}%</span>
            </div>

            <div
              className={`mt-2 h-2.5 ${TRACK}`}
              role="progressbar"
              aria-label="Overall roadmap completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={stats.percent}
            >
              <div
                className="h-full rounded-full bg-[#0064F9] transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${stats.percent}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-[#8b95a7]">
              {stats.completedTopics} of {stats.totalTopics} topics completed
            </p>
          </div>
        </div>

        <aside className="grid grid-cols-2 gap-3 border-t border-[#edf1f6] bg-[#f8faff] p-5 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:p-6">
          <OverviewTile
            icon={FiCheckCircle}
            iconClassName="text-emerald-600"
            label="Completed"
            value={stats.completedTopics}
            hint="Topics finished"
          />
          <OverviewTile
            icon={FiPlay}
            iconClassName="text-[#0064F9]"
            label="In progress"
            value={stats.inProgressTopics}
            hint="Current topics"
          />

          <div className={`col-span-2 flex items-center justify-between p-4 lg:col-span-1 ${CARD}`}>
            <div>
              <p className="text-xs text-[#718096]">Weekly learning goal</p>
              <p className="mt-1 text-sm font-semibold text-[#111827]">{weeklyGoal}</p>
            </div>
            <FiTarget size={20} className="text-[#0064F9]" aria-hidden="true" />
          </div>
        </aside>
      </div>
    </section>
  );
}

type OverviewTileProps = {
  icon: IconType;
  iconClassName: string;
  label: string;
  value: number;
  hint: string;
};

function OverviewTile({ icon: Icon, iconClassName, label, value, hint }: OverviewTileProps) {
  return (
    <div className={`p-4 ${CARD}`}>
      <div className="flex items-center gap-2 text-xs text-[#718096]">
        <Icon size={15} className={iconClassName} aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-bold text-[#111827]">{value}</p>
      <p className="mt-1 text-[11px] text-[#8b95a7]">{hint}</p>
    </div>
  );
}

export function ConsistencyBanner() {
  return (
    <aside className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#0064F9] shadow-sm">
          <FiTarget size={19} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#111827]">Consistency beats cramming</h2>
          <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748b]">
            Learn a concept, practise it, recall it without notes, and review it later. Small daily
            sessions help build lasting understanding.
          </p>
        </div>
      </div>

      <Link
        to="/review"
        className={`inline-flex shrink-0 items-center gap-1.5 rounded text-xs font-semibold text-[#0064F9] hover:underline ${FOCUS_RING}`}
      >
        Go to review
        <FiArrowRight size={14} aria-hidden="true" />
      </Link>
    </aside>
  );
}