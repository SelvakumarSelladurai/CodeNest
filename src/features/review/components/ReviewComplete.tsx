import { FiArrowRight, FiCalendar, FiCheckCircle, FiRotateCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import type { Concept } from "../../concepts/concepts.data";
import { formatNextReview } from "../../concepts/concepts.logic";
import { CARD, EYEBROW, RATINGS, RATING_LABEL, type Rating } from "../review.config";
import type { ReviewResult, ReviewSummary } from "../review.logic";

type ReviewCompleteProps = {
  status: "empty" | "complete";
  summary: ReviewSummary;
  results: ReviewResult[];
  upcoming: Concept[];
  onRestart: () => void;
};

const RATING_TEXT: Record<Rating, string> = {
  again: "text-rose-600",
  hard: "text-amber-600",
  good: "text-[#0064F9]",
  easy: "text-emerald-600",
};

export default function ReviewComplete({
  status,
  summary,
  results,
  upcoming,
  onRestart,
}: ReviewCompleteProps) {
  const navigate = useNavigate();

  if (status === "empty") {
    return (
      <section className={`p-8 text-center ${CARD}`}>
        <FiCheckCircle size={32} aria-hidden="true" className="mx-auto text-emerald-600" />
        <h2 className="mt-4 text-xl font-bold text-[#111827]">Nothing due today</h2>
        <p className="mt-2 text-sm text-[#718096]">
          You are all caught up. Learn something new, or come back when reviews are scheduled.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Button onClick={() => navigate("/concepts")}>
            Explore concepts
            <FiArrowRight size={14} aria-hidden="true" />
          </Button>
          <UpcomingList upcoming={upcoming} />
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className={`p-6 sm:p-8 ${CARD}`}>
        <p className={EYEBROW}>Session complete</p>
        <h2 className="mt-2 text-xl font-bold text-[#111827] sm:text-2xl">Well done</h2>
        <p className="mt-2 text-sm text-[#718096]">
          You reviewed {summary.total} {summary.total === 1 ? "concept" : "concepts"} with{" "}
          {summary.retention}% recalled.
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {RATINGS.map((rating) => (
            <div key={rating.value} className="rounded-lg border border-[#edf1f6] bg-[#f8faff] p-3">
              <dt className="text-xs text-[#718096]">{RATING_LABEL[rating.value]}</dt>
              <dd className={`mt-1 text-xl font-bold ${RATING_TEXT[rating.value]}`}>
                {summary.counts[rating.value]}
              </dd>
            </div>
          ))}
          <div className="rounded-lg border border-[#edf1f6] bg-[#f8faff] p-3">
            <dt className="text-xs text-[#718096]">Mastery change</dt>
            <dd className="mt-1 text-xl font-bold text-[#111827]">
              {summary.masteryGain > 0 ? "+" : ""}
              {summary.masteryGain}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={onRestart}>
            <FiRotateCcw size={14} aria-hidden="true" />
            Review again
          </Button>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Back to dashboard
          </Button>
        </div>
      </section>

      <section aria-labelledby="session-results-heading" className={`p-6 ${CARD}`}>
        <h2 id="session-results-heading" className="text-base font-bold text-[#111827]">
          This session
        </h2>

        <ul className="mt-4 divide-y divide-[#edf1f6]">
          {results.map((result) => (
            <li key={result.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#111827]">{result.title}</p>
                <p className="mt-0.5 text-[11px] text-[#8b95a7]">
                  {result.masteryBefore}% → {result.masteryAfter}% · next review in{" "}
                  {result.nextReviewInDays} {result.nextReviewInDays === 1 ? "day" : "days"}
                </p>
              </div>
              <span className={`text-xs font-semibold ${RATING_TEXT[result.rating]}`}>
                {RATING_LABEL[result.rating]}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <UpcomingList upcoming={upcoming} />
    </div>
  );
}

function UpcomingList({ upcoming }: { upcoming: Concept[] }) {
  if (upcoming.length === 0) return null;

  return (
    <section aria-labelledby="upcoming-heading" className={`w-full p-6 text-left ${CARD}`}>
      <h2
        id="upcoming-heading"
        className="flex items-center gap-2 text-base font-bold text-[#111827]"
      >
        <FiCalendar size={16} aria-hidden="true" className="text-[#0064F9]" />
        Coming up
      </h2>

      <ul className="mt-4 divide-y divide-[#edf1f6]">
        {upcoming.map((concept) => (
          <li key={concept.slug} className="flex items-center justify-between gap-3 py-3">
            <span className="min-w-0 truncate text-sm font-semibold text-[#111827]">
              {concept.title}
            </span>
            <span className="shrink-0 text-xs text-[#8b95a7]">
              {formatNextReview(concept.nextReviewInDays)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}