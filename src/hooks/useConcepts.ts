import { useCallback, useDeferredValue, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { StatusFilter } from "../features/concepts/concepts.config";
import { CONCEPTS } from "../features/concepts/concepts.data";
import { filterConcepts, getCategories } from "../features/concepts/concepts.logic";

const PARAM = {
  query: "q",
  category: "category",
  status: "status",
} as const;

const MAX_QUERY_LENGTH = 80;
const STATUS_VALUES: readonly StatusFilter[] = ["all", "due", "new", "learning", "strong"];
const CATEGORIES = getCategories(CONCEPTS);

type FilterPatch = {
  query?: string;
  category?: string;
  status?: StatusFilter;
};

export function useConceptFilters() {
  const [params, setParams] = useSearchParams();

  const query = (params.get(PARAM.query) ?? "").slice(0, MAX_QUERY_LENGTH);

  const rawCategory = params.get(PARAM.category) ?? "all";
  const category = rawCategory === "all" || CATEGORIES.includes(rawCategory) ? rawCategory : "all";

  const rawStatus = params.get(PARAM.status) ?? "all";
  const status = STATUS_VALUES.includes(rawStatus as StatusFilter)
    ? (rawStatus as StatusFilter)
    : "all";

  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => filterConcepts(CONCEPTS, deferredQuery, category, status),
    [deferredQuery, category, status]
  );

  const update = useCallback(
    (patch: FilterPatch) => {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          const apply = (key: string, value: string | undefined, fallback: string) => {
            if (value === undefined) return;
            if (value === "" || value === fallback) next.delete(key);
            else next.set(key, value);
          };

          apply(PARAM.query, patch.query?.slice(0, MAX_QUERY_LENGTH), "");
          apply(PARAM.category, patch.category, "all");
          apply(PARAM.status, patch.status, "all");

          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const reset = useCallback(() => {
    update({ query: "", category: "all", status: "all" });
  }, [update]);

  return {
    query,
    category,
    status,
    categories: CATEGORIES,
    results,
    isStale: query !== deferredQuery,
    update,
    reset,
  };
}