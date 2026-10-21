import { useId, type KeyboardEvent } from "react";
import { FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";
import {
  CARD,
  FOCUS_RING,
  LEVEL_LABEL,
  STATUS_FILTERS,
  STATUS_META,
  TRACK,
  type StatusFilter,
} from "../concepts.config";
import type { Concept, ConceptStatus } from "../concepts.data";
import { deriveStatus, formatNextReview, isDueToday } from "../concepts.logic";

export function ConceptStatusBadge({ status }: { status: ConceptStatus }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.badge}`}
    >
      <Icon size={11} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

type ConceptToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
};

export function ConceptToolbar({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: ConceptToolbarProps) {
  const inputId = useId();
  const hasQuery = query.length > 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && hasQuery) {
      event.preventDefault();
      onQueryChange("");
    }
  };

  return (
    <section aria-label="Find concepts" className={`space-y-4 p-4 sm:p-5 ${CARD}`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label htmlFor={inputId} className="sr-only">
            Search concepts
          </label>
          <FiSearch
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8b95a7]"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by name, topic, or keyword…"
            autoComplete="off"
            spellCheck={false}
            className="h-10 w-full rounded-lg border border-[#dfe5ee] bg-white pl-9 pr-10 text-sm text-[#111827] placeholder:text-[#9aa3b2] transition-colors focus:border-[#0064F9]/50 focus:outline-none focus:ring-2 focus:ring-[#0064F9]/10 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className={`absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#8b95a7] transition-colors hover:bg-[#f1f5f9] hover:text-[#111827] ${FOCUS_RING}`}
            >
              <FiX size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
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
      </div>

      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {["all", ...categories].map((value) => {
          const isActive = category === value;

          return (
            <Button
              key={value}
              size="sm"
              variant={isActive ? "primary" : "ghost"}
              aria-pressed={isActive}
              onClick={() => onCategoryChange(value)}
            >
              {value === "all" ? "All categories" : value}
            </Button>
          );
        })}
      </div>
    </section>
  );
}

export function ConceptCard({ concept }: { concept: Concept }) {
  const status = deriveStatus(concept);
  const meta = STATUS_META[status];
  const dueToday = isDueToday(concept);

  return (
    <article
      className={`group relative flex h-full flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0064F9]/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] motion-reduce:transform-none motion-reduce:transition-none ${CARD}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0064F9]">
          {concept.category}
        </span>
        <span className="text-[11px] text-[#8b95a7]">{LEVEL_LABEL[concept.level]}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-[#111827]">
          <Link
            to={`/concepts/${concept.slug}`}
            className={`rounded-sm after:absolute after:inset-0 after:rounded-xl ${FOCUS_RING}`}
          >
            {concept.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#718096]">{concept.summary}</p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#718096]">Mastery</span>
          <span className="font-semibold text-[#374151]">{concept.mastery}%</span>
        </div>
        <div
          className={`mt-1.5 h-1.5 ${TRACK}`}
          role="progressbar"
          aria-label={`${concept.title} mastery`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={concept.mastery}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${meta.bar}`}
            style={{ width: `${concept.mastery}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#edf1f6] pt-4">
        <ConceptStatusBadge status={status} />
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-medium ${
            dueToday ? "text-amber-600" : "text-[#8b95a7]"
          }`}
        >
          {formatNextReview(concept.nextReviewInDays)}
          <FiArrowRight size={11} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
        </span>
      </div>
    </article>
  );
}

export function ConceptEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-[#d5deeb] bg-white px-6 py-14 text-center"
    >
      <FiSearch size={24} aria-hidden="true" className="mx-auto text-[#9aa3b2]" />
      <h2 className="mt-3 text-sm font-semibold text-[#111827]">No concepts match your filters</h2>
      <p className="mt-1 text-xs text-[#718096]">
        Try a different keyword, or clear the filters to see everything.
      </p>
      <div className="mt-4 flex justify-center">
        <Button size="sm" variant="ghost" onClick={onReset}>
          Clear filters
        </Button>
      </div>
    </div>
  );
}