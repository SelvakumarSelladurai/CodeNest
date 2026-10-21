import type { Concept } from "../concepts/concepts.data";
import type { Rating } from "./review.config";

export type ReviewResult = {
  slug: string;
  title: string;
  rating: Rating;
  masteryBefore: number;
  masteryAfter: number;
  nextReviewInDays: number;
};

export type ReviewSummary = {
  total: number;
  counts: Record<Rating, number>;
  retention: number;
  masteryGain: number;
};

const MASTERY_DELTA: Record<Rating, number> = {
  again: -15,
  hard: 2,
  good: 8,
  easy: 12,
};

const NEXT_INTERVAL_DAYS: Record<Rating, number> = {
  again: 1,
  hard: 2,
  good: 4,
  easy: 7,
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function applyRating(mastery: number, rating: Rating): number {
  return clamp(mastery + MASTERY_DELTA[rating], 0, 100);
}

/** Concepts due today, weakest first so the hardest ones get attention early. */
export function buildReviewQueue(concepts: readonly Concept[]): Concept[] {
  return concepts
    .filter((concept) => concept.nextReviewInDays === 0)
    .sort((a, b) => a.mastery - b.mastery || a.title.localeCompare(b.title));
}

/** Next scheduled reviews after today, soonest first. */
export function getUpcomingReviews(concepts: readonly Concept[], limit = 3): Concept[] {
  return concepts
    .filter((concept) => concept.nextReviewInDays !== null && concept.nextReviewInDays > 0)
    .sort((a, b) => (a.nextReviewInDays ?? 0) - (b.nextReviewInDays ?? 0))
    .slice(0, limit);
}

export function createResult(concept: Concept, rating: Rating): ReviewResult {
  return {
    slug: concept.slug,
    title: concept.title,
    rating,
    masteryBefore: concept.mastery,
    masteryAfter: applyRating(concept.mastery, rating),
    nextReviewInDays: NEXT_INTERVAL_DAYS[rating],
  };
}

export function summarizeSession(results: readonly ReviewResult[]): ReviewSummary {
  const counts: Record<Rating, number> = { again: 0, hard: 0, good: 0, easy: 0 };
  let masteryGain = 0;

  for (const result of results) {
    counts[result.rating] += 1;
    masteryGain += result.masteryAfter - result.masteryBefore;
  }

  const total = results.length;
  const recalled = counts.good + counts.easy;

  return {
    total,
    counts,
    retention: total > 0 ? Math.round((recalled / total) * 100) : 0,
    masteryGain,
  };
}