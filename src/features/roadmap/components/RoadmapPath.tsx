import { useId } from "react";
import { FiArrowRight, FiClock, FiFilter, FiLock, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";
import {
  CARD,
  FOCUS_RING,
  STATUS_BADGE,
  STATUS_FILTERS,
  STATUS_ICON,
  STATUS_ICON_TILE,
  TOPIC_CTA,
  TRACK,
  type StatusFilter,
} from "../roadmap.config";
import { statusLabels, type RoadmapTopic } from "../roadmap.data";
import { getStageProgress, type FilteredStage } from "../roadmap.logic";

type RoadmapToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
};

export function RoadmapToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: RoadmapToolbarProps) {
  const inputId = useId();

  return (
    <section
      aria-label="Find roadmap topics"
      className={`flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between ${CARD}`}
    >
      <div className="relative w-full lg:max-w-sm">
        <label htmlFor={inputId} className="sr-only">
          Search roadmap topics
        </label>
        <FiSearch
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b95a7]"
        />
        <input
          id={inputId}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search technologies or topics..."
          className="h-10 w-full rounded-lg border border-[#dfe5ee] bg-white pl-9 pr-3 text-sm text-[#111827] placeholder:text-[#9aa3b2] transition-colors focus:border-[#0064F9]/50 focus:outline-none focus:ring-2 focus:ring-[#0064F9]/10"
        />
      </div>

      <div role="group" aria-label="Filter by status" className="flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#718096]">
          <FiFilter size={14} aria-hidden="true" />
          Filter
        </span>

        {STATUS_FILTERS.map((filter) => {
          const isActive = status === filter.value;

          return (
            <Button
              key={filter.value}
              size="sm"
              variant={isActive ? "primary" : "secondary"}
              aria-pressed={isActive}
              onClick={() => onStatusChange(filter.value)}
            >
              {filter.label}
            </Button>
          );
        })}
      </div>
    </section>
  );
}

type RoadmapEmptyStateProps = {
  onReset: () => void;
};

export function RoadmapEmptyState({ onReset }: RoadmapEmptyStateProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-[#d5deeb] bg-white px-6 py-14 text-center"
    >
      <FiSearch size={24} className="mx-auto text-[#9aa3b2]" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold text-[#111827]">No topics found</h3>
      <p className="mt-1 text-xs text-[#718096]">
        Try another search term or change the status filter.
      </p>
      <div className="mt-4 flex justify-center">
        <Button variant="ghost" size="sm" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}

export function RoadmapStageCard({ stage, topics }: FilteredStage) {
  const headingId = useId();
  const Icon = stage.icon;
  const progress = getStageProgress(stage);
  const isFiltered = topics.length !== stage.topics.length;

  return (
    <section aria-labelledby={headingId} className={`overflow-hidden ${CARD}`}>
      <header className="flex flex-col gap-4 border-b border-[#edf1f6] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0064F9]/10 text-[#0064F9]">
            <Icon size={20} aria-hidden="true" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b95a7]">
              Stage {stage.number}
            </p>
            <h2 id={headingId} className="mt-1 text-base font-bold text-[#111827]">
              {stage.title}
            </h2>
            <p className="mt-1 text-xs leading-5 text-[#718096]">{stage.description}</p>
            {isFiltered && (
              <p className="mt-1 text-[11px] text-[#8b95a7]">
                Showing {topics.length} of {stage.topics.length} topics
              </p>
            )}
          </div>
        </div>

        <div className="w-full sm:max-w-[150px]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#718096]">Stage progress</span>
            <span className="font-semibold text-[#374151]">{progress}%</span>
          </div>

          <div
            className={`mt-2 h-1.5 ${TRACK}`}
            role="progressbar"
            aria-label={`${stage.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-[#0064F9] transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-3 p-4 lg:grid-cols-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <RoadmapTopicCard topic={topic} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type RoadmapTopicCardProps = {
  topic: RoadmapTopic;
};

function RoadmapTopicCard({ topic }: RoadmapTopicCardProps) {
  const Icon = STATUS_ICON[topic.status];
  const isLocked = topic.status === "locked";

  return (
    <article
      className={`h-full rounded-xl border p-4 transition-all duration-200 motion-reduce:transition-none ${
        isLocked
          ? "border-slate-100 bg-slate-50/70"
          : "border-[#e7ebf2] bg-white hover:-translate-y-0.5 hover:border-[#0064F9]/30 hover:shadow-sm motion-reduce:transform-none"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${STATUS_ICON_TILE[topic.status]}`}
        >
          <Icon size={17} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`text-sm font-semibold ${isLocked ? "text-slate-500" : "text-[#111827]"}`}>
              {topic.title}
            </h3>

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[topic.status]}`}
            >
              {statusLabels[topic.status]}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-[#718096]">{topic.description}</p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#8b95a7]">
              <FiClock size={12} aria-hidden="true" />
              {topic.duration}
            </span>

            {isLocked ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <FiLock size={12} aria-hidden="true" />
                Complete prerequisites
              </span>
            ) : (
              <Link
                to={topic.href}
                className={`inline-flex items-center gap-1 rounded text-xs font-semibold text-[#0064F9] hover:underline ${FOCUS_RING}`}
              >
                {TOPIC_CTA[topic.status]}
                <FiArrowRight size={13} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}