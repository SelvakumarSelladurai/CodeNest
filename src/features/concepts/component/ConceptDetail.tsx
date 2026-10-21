import { FiArrowLeft, FiArrowRight, FiPlay } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import {
  CARD,
  EYEBROW,
  FOCUS_RING,
  LEVEL_LABEL,
  TRACK,
  STATUS_META,
} from "../concepts.config";
import type { Concept } from "../concepts.data";
import { deriveStatus, formatNextReview } from "../concepts.logic";
import { ConceptStatusBadge } from "./ConceptLibrary";

type ConceptDetailProps = {
  concept: Concept;
  related: Concept[];
};

export default function ConceptDetail({ concept, related }: ConceptDetailProps) {
  const navigate = useNavigate();
  const status = deriveStatus(concept);
  const meta = STATUS_META[status];

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 self-start"
        onClick={() => navigate("/concepts")}
      >
        <FiArrowLeft size={14} aria-hidden="true" />
        All concepts
      </Button>

      <section className={`p-6 sm:p-8 ${CARD}`}>
        <p className={EYEBROW}>
          {concept.category} · {LEVEL_LABEL[concept.level]}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          {concept.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">{concept.summary}</p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#374151]">Mastery</span>
              <span className="font-semibold text-[#374151]">{concept.mastery}%</span>
            </div>
            <div
              className={`mt-2 h-2 ${TRACK}`}
              role="progressbar"
              aria-label={`${concept.title} mastery`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={concept.mastery}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none ${meta.bar}`}
                style={{ width: `${concept.mastery}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ConceptStatusBadge status={status} />
              <span className="text-xs text-[#8b95a7]">
                {formatNextReview(concept.nextReviewInDays)}
              </span>
            </div>
          </div>

          <Button className="shrink-0" onClick={() => navigate("/review")}>
            <FiPlay size={14} aria-hidden="true" />
            Review now
          </Button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section aria-labelledby="key-points-heading" className={`p-6 ${CARD}`}>
          <h2 id="key-points-heading" className="text-base font-bold text-[#111827]">
            Key points
          </h2>

          <ol className="mt-4 space-y-4">
            {concept.keyPoints.map((point, index) => (
              <li key={`${concept.slug}-${index}`} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0064F9]/10 text-xs font-semibold text-[#0064F9]">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[#374151]">{point}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-6">
          <section aria-labelledby="topics-heading" className={`p-6 ${CARD}`}>
            <h2 id="topics-heading" className="text-base font-bold text-[#111827]">
              Topics
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {concept.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-medium text-[#64748b]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="related-heading" className={`p-6 ${CARD}`}>
            <h2 id="related-heading" className="text-base font-bold text-[#111827]">
              Related concepts
            </h2>

            {related.length === 0 ? (
              <p className="mt-3 text-xs text-[#718096]">No related concepts yet.</p>
            ) : (
              <ul className="mt-3 divide-y divide-[#edf1f6]">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/concepts/${item.slug}`}
                      className={`flex items-center justify-between gap-3 rounded py-3 text-sm font-semibold text-[#111827] transition-colors hover:text-[#0064F9] ${FOCUS_RING}`}
                    >
                      <span className="min-w-0 truncate">{item.title}</span>
                      <FiArrowRight size={14} aria-hidden="true" className="shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </>
  );
}