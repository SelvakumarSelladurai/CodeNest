import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { StatusFilter } from "../features/roadmap/roadmap.config";
import { ROADMAP_CATALOG, type RoadmapStage } from "../features/roadmap/roadmap.data";
import { filterStages, searchRoadmaps } from "../features/roadmap/roadmap.logic";

const QUERY_PARAM = "q";
const MAX_QUERY_LENGTH = 80;

export function useRoadmapFilters(stages: RoadmapStage[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const deferredSearch = useDeferredValue(search);

  const results = useMemo(
    () => filterStages(stages, deferredSearch, status),
    [stages, deferredSearch, status]
  );

  const reset = useCallback(() => {
    setSearch("");
    setStatus("all");
  }, []);

  return { search, setSearch, status, setStatus, results, reset };
}

export function useRoadmapSearch() {
  const [params, setParams] = useSearchParams();

  const query = params.get(QUERY_PARAM) ?? "";
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchRoadmaps(ROADMAP_CATALOG, deferredQuery),
    [deferredQuery]
  );

  const setQuery = useCallback(
    (value: string) => {
      const next = value.slice(0, MAX_QUERY_LENGTH);

      setParams(
        (previous) => {
          const updated = new URLSearchParams(previous);
          if (next) updated.set(QUERY_PARAM, next);
          else updated.delete(QUERY_PARAM);
          return updated;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  return {
    query,
    setQuery,
    results,
    isStale: query !== deferredQuery,
  };
}