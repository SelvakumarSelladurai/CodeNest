import { useCallback, useMemo, useReducer } from "react";

import type { Concept } from "../features/concepts/concepts.data";
import type { Rating } from "../features/review/review.config";
import {
  buildReviewQueue,
  createResult,
  summarizeSession,
  type ReviewResult,
} from "../features/review/review.logic";

type SessionState = {
  queue: Concept[];
  index: number;
  revealed: boolean;
  results: ReviewResult[];
};

type SessionAction = { type: "reveal" } | { type: "rate"; rating: Rating } | { type: "restart" };

function reducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "reveal": {
      if (state.revealed || state.index >= state.queue.length) return state;
      return { ...state, revealed: true };
    }

    case "rate": {
      const current = state.queue[state.index];
      if (!state.revealed || !current) return state;

      return {
        ...state,
        index: state.index + 1,
        revealed: false,
        results: [...state.results, createResult(current, action.rating)],
      };
    }

    case "restart":
      return { ...state, index: 0, revealed: false, results: [] };

    default:
      return state;
  }
}

function init(concepts: readonly Concept[]): SessionState {
  return {
    queue: buildReviewQueue(concepts),
    index: 0,
    revealed: false,
    results: [],
  };
}

export type ReviewStatus = "empty" | "active" | "complete";

export function useReviewSession(concepts: readonly Concept[]) {
  const [state, dispatch] = useReducer(reducer, concepts, init);

  const reveal = useCallback(() => dispatch({ type: "reveal" }), []);
  const rate = useCallback((rating: Rating) => dispatch({ type: "rate", rating }), []);
  const restart = useCallback(() => dispatch({ type: "restart" }), []);

  const status: ReviewStatus =
    state.queue.length === 0 ? "empty" : state.index >= state.queue.length ? "complete" : "active";

  const current = status === "active" ? state.queue[state.index] : undefined;

  const summary = useMemo(() => summarizeSession(state.results), [state.results]);

  return {
    status,
    current,
    position: state.index + 1,
    total: state.queue.length,
    completed: state.results.length,
    revealed: state.revealed,
    results: state.results,
    summary,
    reveal,
    rate,
    restart,
  };
}