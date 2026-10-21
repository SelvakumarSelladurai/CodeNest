import type { StatusFilter } from "./concepts.config";
import { type Concept, type ConceptStatus } from "./concepts.data";

export const MASTERY_STRONG_THRESHOLD = 80;

export type ConceptStats = {
  total: number;
  dueToday: number;
  learning: number;
  strong: number;
  notStarted: number;
  averageMastery: number;
};

export function deriveStatus(concept: Concept): ConceptStatus {
  if (concept.mastery === 0) return "new";
  return concept.mastery >= MASTERY_STRONG_THRESHOLD ? "strong" : "learning";
}

export function isDueToday(concept: Concept): boolean {
  return concept.nextReviewInDays === 0;
}

export function formatNextReview(days: number | null): string {
  if (days === null) return "Not scheduled";
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days} days`;
}

export function tokenize(query: string): string[] {
  return [...new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))];
}

export function getCategories(concepts: readonly Concept[]): string[] {
  return [...new Set(concepts.map((concept) => concept.category))].sort();
}

export function getConceptStats(concepts: readonly Concept[]): ConceptStats {
  const counts: Record<ConceptStatus, number> = { new: 0, learning: 0, strong: 0 };
  let masterySum = 0;

  for (const concept of concepts) {
    counts[deriveStatus(concept)] += 1;
    masterySum += concept.mastery;
  }

  const total = concepts.length;

  return {
    total,
    dueToday: concepts.filter(isDueToday).length,
    learning: counts.learning,
    strong: counts.strong,
    notStarted: counts.new,
    averageMastery: total > 0 ? Math.round(masterySum / total) : 0,
  };
}

function matchesStatus(concept: Concept, status: StatusFilter): boolean {
  if (status === "all") return true;
  if (status === "due") return isDueToday(concept);
  return deriveStatus(concept) === status;
}

/**
 * Every search term must appear somewhere in the concept's searchable text.
 * Results put due-today concepts first, then the weakest mastery.
 */
export function filterConcepts(
  concepts: readonly Concept[],
  query: string,
  category: string,
  status: StatusFilter
): Concept[] {
  const terms = tokenize(query);

  return concepts
    .filter((concept) => category === "all" || concept.category === category)
    .filter((concept) => matchesStatus(concept, status))
    .filter((concept) => {
      if (terms.length === 0) return true;

      const haystack = [concept.title, concept.summary, concept.category, concept.level, ...concept.tags]
        .join(" ")
        .toLowerCase();

      return terms.every((term) => haystack.includes(term));
    })
    .sort(
      (a, b) =>
        Number(isDueToday(b)) - Number(isDueToday(a)) ||
        a.mastery - b.mastery ||
        a.title.localeCompare(b.title)
    );
}

/** Same-category concepts first, then the rest. */
export function getRelatedConcepts(
  concept: Concept,
  concepts: readonly Concept[],
  limit = 3
): Concept[] {
  return concepts
    .filter((other) => other.slug !== concept.slug)
    .sort(
      (a, b) =>
        Number(b.category === concept.category) - Number(a.category === concept.category)
    )
    .slice(0, limit);
}