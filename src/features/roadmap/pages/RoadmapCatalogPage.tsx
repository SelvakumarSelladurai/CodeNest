import { FiMap } from "react-icons/fi";

import Button from "../../../components/ui/Button";
import {
  RoadmapCatalogCard,
  RoadmapCatalogEmpty,
  RoadmapSearchBar,
} from "../components/RoadmapCatalog";
import { EYEBROW, PAGE_WRAPPER } from "../roadmap.config";
import { ROADMAP_CATALOG } from "../roadmap.data";
import { getPopularTags } from "../roadmap.logic";
import { useRoadmapSearch } from "../../../hooks/useRoadmap";

const POPULAR_TAGS = getPopularTags(ROADMAP_CATALOG);

function pluralRoadmaps(count: number): string {
  return count === 1 ? "roadmap" : "roadmaps";
}

export default function RoadmapCatalogPage() {
  const { query, setQuery, results, isStale } = useRoadmapSearch();

  const trimmed = query.trim();
  const normalized = trimmed.toLowerCase();
  const hasQuery = trimmed.length > 0;

  const handleTagClick = (tag: string) => {
    setQuery(normalized === tag ? "" : tag);
  };

  return (
    <div className={PAGE_WRAPPER}>
      <header className="space-y-2">
        <p className={`flex items-center gap-2 ${EYEBROW}`}>
          <FiMap size={14} aria-hidden="true" />
          Roadmaps
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Explore roadmaps
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[#718096]">
          Search by technology, role, or topic to find a structured path from where you are to
          where you want to be.
        </p>
      </header>

      <RoadmapSearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />

      <div role="group" aria-label="Popular topics" className="flex flex-wrap gap-2">
        {POPULAR_TAGS.map((tag) => {
          const isActive = normalized === tag;

          return (
            <Button
              key={tag}
              size="sm"
              variant={isActive ? "primary" : "secondary"}
              aria-pressed={isActive}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </Button>
          );
        })}
      </div>

      <section aria-label="Search results" className="space-y-4">
        <p className="text-xs text-[#8b95a7]" aria-live="polite">
          {hasQuery
            ? `${results.length} ${pluralRoadmaps(results.length)} for “${trimmed}”`
            : `${ROADMAP_CATALOG.length} ${pluralRoadmaps(ROADMAP_CATALOG.length)} available`}
        </p>

        {results.length === 0 ? (
          <RoadmapCatalogEmpty
            query={trimmed}
            suggestions={POPULAR_TAGS.slice(0, 4)}
            onSuggest={setQuery}
            onClear={() => setQuery("")}
          />
        ) : (
          <div
            className={`grid gap-4 transition-opacity duration-200 motion-reduce:transition-none md:grid-cols-2 xl:grid-cols-3 ${
              isStale ? "opacity-60" : "opacity-100"
            }`}
          >
            {results.map((result) => (
              <RoadmapCatalogCard key={result.roadmap.slug} result={result} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}