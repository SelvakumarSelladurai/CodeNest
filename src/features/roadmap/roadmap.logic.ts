import type { StatusFilter } from "../roadmap/roadmap.config";
import type {
  RoadmapCatalogItem,
  RoadmapStage,
  RoadmapStatus,
  RoadmapTopic,
} from "./roadmap.data";

export type RoadmapStats = {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  percent: number;
};

export type FilteredStage = {
  stage: RoadmapStage;
  topics: RoadmapTopic[];
};

export type RoadmapSearchResult = {
  roadmap: RoadmapCatalogItem;
  score: number;
  matchedTopics: string[];
};

const MAX_MATCHED_TOPICS = 3;

export function toPercent(part: number, whole: number): number {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

export function countByStatus(topics: RoadmapTopic[], status: RoadmapStatus): number {
  return topics.filter((topic) => topic.status === status).length;
}

export function getRoadmapStats(stages: RoadmapStage[]): RoadmapStats {
  const topics = stages.flatMap((stage) => stage.topics);
  const completedTopics = countByStatus(topics, "completed");

  return {
    totalTopics: topics.length,
    completedTopics,
    inProgressTopics: countByStatus(topics, "in-progress"),
    percent: toPercent(completedTopics, topics.length),
  };
}

export function getStageProgress(stage: RoadmapStage): number {
  return toPercent(countByStatus(stage.topics, "completed"), stage.topics.length);
}

export function filterStages(
  stages: RoadmapStage[],
  query: string,
  status: StatusFilter
): FilteredStage[] {
  const needle = query.trim().toLowerCase();
  const results: FilteredStage[] = [];

  for (const stage of stages) {
    const stageMatches = needle !== "" && stage.title.toLowerCase().includes(needle);

    const topics = stage.topics.filter((topic) => {
      const matchesStatus = status === "all" || topic.status === status;
      const matchesSearch =
        needle === "" ||
        stageMatches ||
        topic.title.toLowerCase().includes(needle) ||
        topic.description.toLowerCase().includes(needle);

      return matchesStatus && matchesSearch;
    });

    if (topics.length > 0) {
      results.push({ stage, topics });
    }
  }

  return results;
}

export function tokenize(query: string): string[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return [...new Set(terms)];
}

function scoreTerm(roadmap: RoadmapCatalogItem, term: string): number {
  let best = 0;
  const award = (points: number) => {
    best = Math.max(best, points);
  };

  const title = roadmap.title.toLowerCase();
  if (title.startsWith(term)) award(100);
  else if (title.includes(term)) award(60);

  for (const tag of roadmap.tags) {
    if (tag === term) award(50);
    else if (tag.includes(term)) award(30);
  }

  if (roadmap.description.toLowerCase().includes(term)) award(15);

  for (const stage of roadmap.stages) {
    if (stage.title.toLowerCase().includes(term)) award(8);

    for (const topic of stage.topics) {
      if (topic.title.toLowerCase().includes(term)) award(10);
      else if (topic.description.toLowerCase().includes(term)) award(4);
    }
  }

  return best;
}

function findMatchingTopics(roadmap: RoadmapCatalogItem, terms: string[]): string[] {
  const matches = new Set<string>();

  for (const stage of roadmap.stages) {
    for (const topic of stage.topics) {
      const haystack = topic.title.toLowerCase();
      if (terms.some((term) => haystack.includes(term))) {
        matches.add(topic.title);
      }
    }
  }

  return [...matches].slice(0, MAX_MATCHED_TOPICS);
}

export function searchRoadmaps(
  catalog: readonly RoadmapCatalogItem[],
  query: string
): RoadmapSearchResult[] {
  const terms = tokenize(query);

  if (terms.length === 0) {
    return catalog.map((roadmap) => ({ roadmap, score: 0, matchedTopics: [] }));
  }

  const results: RoadmapSearchResult[] = [];

  for (const roadmap of catalog) {
    let score = 0;
    let matchesAll = true;

    for (const term of terms) {
      const termScore = scoreTerm(roadmap, term);
      if (termScore === 0) {
        matchesAll = false;
        break;
      }
      score += termScore;
    }

    if (matchesAll) {
      results.push({
        roadmap,
        score,
        matchedTopics: findMatchingTopics(roadmap, terms),
      });
    }
  }

  return results.sort(
    (a, b) => b.score - a.score || a.roadmap.title.localeCompare(b.roadmap.title)
  );
}

export function getPopularTags(catalog: readonly RoadmapCatalogItem[], limit = 6): string[] {
  const counts = new Map<string, number>();

  for (const roadmap of catalog) {
    for (const tag of roadmap.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}