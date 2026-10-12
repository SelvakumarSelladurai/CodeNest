import { useId } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiPlay } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { CARD, CARD_TITLE, EYEBROW, ICON_TILE, TRACK, type ReviewSummary } from "../dashboard.config";

type ReviewCardProps = {
  data: ReviewSummary;
};

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return count === 1 ? singular : pluralForm;
}

export default function ReviewCard({ data }: ReviewCardProps) {
  const headingId = useId();
  const navigate = useNavigate();

  // Guard against bad input: negative values, or more completed than due.
  const total = Math.max(0, data.total);
  const completed = Math.min(Math.max(0, data.completed), total);
  const remaining = total - completed;
  const isEmpty = total === 0;
  const isDone = !isEmpty && remaining === 0;
  const progress = isEmpty ? 0 : Math.round((completed / total) * 100);

  return (
    <section aria-labelledby={headingId} className={CARD}>
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={EYEBROW}>Today's review</p>
          <h2 id={headingId} className={CARD_TITLE}>
            Strengthen your memory
          </h2>
        </div>

        <div className={ICON_TILE} aria-hidden="true">
          {isDone || isEmpty ? <FiCheckCircle size={19} /> : <FiClock size={19} />}
        </div>
      </header>

      {isEmpty || isDone ? (
        <div className="mt-7">
          <p className="text-3xl font-bold tracking-tight text-[#111827]">
            {isEmpty ? "0" : "Done"}
          </p>

          <p className="mt-1 text-xs text-[#718096]">
            {isEmpty
              ? "Nothing scheduled for review today."
              : `You reviewed ${completed} ${plural(completed, "concept")} today.`}
          </p>

          <Button
            variant="secondary"
            fullWidth
            className="mt-5 gap-2"
            onClick={() => navigate("/concepts")}
          >
            Explore new concepts
            <FiArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-bold tracking-tight text-[#111827]">{remaining}</p>
              <p className="mt-1 text-xs text-[#718096]">
                {plural(remaining, "concept")} left to review today
              </p>
            </div>

            <p className="text-right text-xs font-medium text-[#10a36a]">
              {completed} of {total} done
            </p>
          </div>

          <div
            className={`mt-5 ${TRACK}`}
            role="progressbar"
            aria-label="Today's review progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${completed} of ${total} ${plural(total, "concept")} reviewed`}
          >
            <div
              className="h-full rounded-full bg-[#10b981] transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          <Button
            fullWidth
            className="mt-5 gap-2"
            onClick={() => navigate("/review")}
          >
            <FiPlay size={14} aria-hidden="true" />
            Review now
          </Button>
        </>
      )}
    </section>
  );
}