import { useEffect } from "react";
import { FiEye } from "react-icons/fi";

import Button from "../../../components/ui/Button";
import { LEVEL_LABEL, TRACK } from "../../concepts/concepts.config";
import type { Concept } from "../../concepts/concepts.data";
import { RATINGS, CARD, EYEBROW, FOCUS_RING, type Rating } from "../review.config";

type ReviewSessionProps = {
  concept: Concept;
  position: number;
  total: number;
  revealed: boolean;
  onReveal: () => void;
  onRate: (rating: Rating) => void;
};

export default function ReviewSession({
  concept,
  position,
  total,
  revealed,
  onReveal,
  onRate,
}: ReviewSessionProps) {
  const progress = total > 0 ? Math.round(((position - 1) / total) * 100) : 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      if (!revealed && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        onReveal();
        return;
      }

      if (revealed) {
        const rating = RATINGS.find((item) => item.key === event.key);
        if (rating) {
          event.preventDefault();
          onRate(rating.value);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [revealed, onReveal, onRate]);

  return (
    <section aria-label="Review session" className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#718096]">
          <span>
            Card <span className="font-semibold text-[#374151]">{position}</span> of {total}
          </span>
          <span>{progress}% complete</span>
        </div>
        <div
          className={`h-1.5 ${TRACK}`}
          role="progressbar"
          aria-label="Review progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-[#0064F9] transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <article className={`p-6 sm:p-8 ${CARD}`}>
        <p className={EYEBROW}>
          {concept.category} · {LEVEL_LABEL[concept.level]}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
          {concept.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#718096]">
          Explain this concept in your own words before revealing the answer.
        </p>

        {revealed ? (
          <div className="mt-6 space-y-5 border-t border-[#edf1f6] pt-6">
            <p className="text-sm font-medium leading-6 text-[#111827]">{concept.summary}</p>

            <ol className="space-y-3">
              {concept.keyPoints.map((point, index) => (
                <li key={`${concept.slug}-${index}`} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0064F9]/10 text-xs font-semibold text-[#0064F9]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#374151]">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-start gap-3 rounded-lg border border-dashed border-[#d5deeb] bg-[#f8fafc] p-6">
            <p className="text-xs text-[#718096]">Press Space or Enter to reveal the answer.</p>
            <Button onClick={onReveal}>
              <FiEye size={14} aria-hidden="true" />
              Show answer
            </Button>
          </div>
        )}
      </article>

      {revealed && (
        <section aria-label="Rate your recall" className={`p-4 sm:p-5 ${CARD}`}>
          <p className="mb-3 text-xs font-medium text-[#718096]">How well did you recall it?</p>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {RATINGS.map((rating) => {
              const Icon = rating.icon;

              return (
                <button
                  key={rating.value}
                  type="button"
                  onClick={() => onRate(rating.value)}
                  className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors duration-200 ${rating.className} ${FOCUS_RING}`}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      <Icon size={15} aria-hidden="true" />
                      {rating.label}
                    </span>
                    <kbd className="rounded border border-current/20 px-1.5 py-0.5 text-[10px] font-semibold opacity-70">
                      {rating.key}
                    </kbd>
                  </span>
                  <span className="text-[11px] opacity-80">{rating.hint}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
}