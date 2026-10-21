import { useId, useRef, type KeyboardEvent } from "react";
import { FiArrowRight, FiClock, FiExternalLink, FiLayers, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { CARD, FOCUS_RING } from "../roadmap.config";
import type { RoadmapSearchResult } from "../roadmap.logic";
import RoadmapIcon from "./RoadmapIcon";

type RoadmapSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export function RoadmapSearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search by technology or topic: react, python, backend…",
}: RoadmapSearchBarProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && value) {
      event.preventDefault();
      onClear();
    }
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div role="search" className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Search roadmaps
      </label>

      <FiSearch
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b95a7]"
      />

      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="h-12 w-full rounded-xl border border-[#dfe5ee] bg-white pl-11 pr-12 text-sm text-[#111827] shadow-sm transition-colors placeholder:text-[#9aa3b2] focus:border-[#0064F9]/50 focus:outline-none focus:ring-4 focus:ring-[#0064F9]/10 [&::-webkit-search-cancel-button]:appearance-none"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={`absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8b95a7] transition-colors hover:bg-[#f1f5f9] hover:text-[#111827] ${FOCUS_RING}`}
        >
          <FiX size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

const VISIBLE_TAGS = 4;

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "external site";
  }
}

type RoadmapCatalogCardProps = {
  result: RoadmapSearchResult;
};

export function RoadmapCatalogCard({ result }: RoadmapCatalogCardProps) {
  const { roadmap, matchedTopics } = result;
  const topicCount = roadmap.stages.reduce((count, stage) => count + stage.topics.length, 0);

  return (
    <article
      className={`group relative flex h-full flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0064F9]/30 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] motion-reduce:transform-none motion-reduce:transition-none ${CARD}`}
    >
      <div className="flex items-start gap-4">
        <RoadmapIcon tech={roadmap.tech} title={roadmap.title} />

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-[#111827]">
            <Link
              to={`/roadmaps/${roadmap.slug}`}
              className={`rounded-sm after:absolute after:inset-0 after:rounded-xl ${FOCUS_RING}`}
            >
              {roadmap.title}
            </Link>
          </h3>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {roadmap.tags.slice(0, VISIBLE_TAGS).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-[11px] font-medium text-[#64748b]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs leading-5 text-[#718096]">{roadmap.description}</p>

        {matchedTopics.length > 0 && (
          <p className="mt-3 text-xs text-[#718096]">
            <span className="font-medium text-[#374151]">Includes:</span>{" "}
            {matchedTopics.join(", ")}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#edf1f6] pt-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8b95a7]">
          <span className="inline-flex items-center gap-1">
            <FiLayers size={12} aria-hidden="true" />
            {roadmap.stages.length} stages
          </span>
          <span className="inline-flex items-center gap-1">
            <FiClock size={12} aria-hidden="true" />
            {roadmap.estimatedDuration}
          </span>
          <span className="sr-only">{topicCount} topics</span>
        </div>

        <div className="flex items-center gap-3">
          {roadmap.externalUrl && (
            <a
              href={roadmap.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compare with ${getHostname(roadmap.externalUrl)} (opens in a new tab)`}
              className={`relative z-10 inline-flex items-center gap-1 rounded text-[11px] font-medium text-[#64748b] transition-colors hover:text-[#0064F9] ${FOCUS_RING}`}
            >
              {getHostname(roadmap.externalUrl)}
              <FiExternalLink size={11} aria-hidden="true" />
            </a>
          )}

          <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#0064F9]"
          >
            View
            <FiArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

type RoadmapCatalogEmptyProps = {
  query: string;
  suggestions: string[];
  onSuggest: (tag: string) => void;
  onClear: () => void;
};

export function RoadmapCatalogEmpty({
  query,
  suggestions,
  onSuggest,
  onClear,
}: RoadmapCatalogEmptyProps) {
  return (
    <div
      role="status"
      className="rounded-xl border border-dashed border-[#d5deeb] bg-white px-6 py-14 text-center"
    >
      <FiSearch size={24} aria-hidden="true" className="mx-auto text-[#9aa3b2]" />

      <h2 className="mt-3 text-sm font-semibold text-[#111827]">
        No roadmaps match “{query.trim()}”
      </h2>
      <p className="mt-1 text-xs text-[#718096]">Try one of these topics instead:</p>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map((tag) => (
          <Button key={tag} size="sm" variant="secondary" onClick={() => onSuggest(tag)}>
            {tag}
          </Button>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <Button size="sm" variant="ghost" onClick={onClear}>
          Clear search
        </Button>
      </div>
    </div>
  );
}