import ConceptsHeader from "../component/ConceptsHeader";
import { ConceptCard, ConceptEmptyState, ConceptToolbar } from "../component/ConceptLibrary";
import { PAGE_WRAPPER } from "../concepts.config";
import { CONCEPTS } from "../concepts.data";
import { getConceptStats } from "../concepts.logic";
import { useConceptFilters } from "../../../hooks/useConcepts";

const STATS = getConceptStats(CONCEPTS);

export default function ConceptsPage() {
  const { query, category, status, categories, results, isStale, update, reset } =
    useConceptFilters();

  const hasFilters = query !== "" || category !== "all" || status !== "all";

  return (
    <div className={PAGE_WRAPPER}>
      <ConceptsHeader stats={STATS} />

      <ConceptToolbar
        query={query}
        onQueryChange={(value) => update({ query: value })}
        categories={categories}
        category={category}
        onCategoryChange={(value) => update({ category: value })}
        status={status}
        onStatusChange={(value) => update({ status: value })}
      />

      <section aria-label="Concept results" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-[#8b95a7]" aria-live="polite">
            Showing {results.length} of {CONCEPTS.length} concepts
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold text-[#0064F9] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <ConceptEmptyState onReset={reset} />
        ) : (
          <ul
            className={`grid gap-4 transition-opacity duration-200 motion-reduce:transition-none md:grid-cols-2 xl:grid-cols-3 ${
              isStale ? "opacity-60" : "opacity-100"
            }`}
          >
            {results.map((concept) => (
              <li key={concept.slug} className="h-full">
                <ConceptCard concept={concept} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}