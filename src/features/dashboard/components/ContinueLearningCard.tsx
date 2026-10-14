import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import {
  CARD,
  CARD_TITLE,
  EYEBROW,
  FOCUS_RING,
  TRACK,
  type ContinueLearning,
} from "../dashboard.config";

type ContinueLearningCardProps = {
  data: ContinueLearning;
};

export default function ContinueLearningCard({ data }: ContinueLearningCardProps) {
  return (
    <article className={CARD}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={EYEBROW}>Continue learning</p>
          <h2 className={CARD_TITLE}>{data.title}</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#718096]">{data.description}</p>
        </div>

        <span className="shrink-0 rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#0064F9]">
          {data.progress}% complete
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-[#4b5563]">Roadmap progress</span>
          <span className="text-[#718096]">
            {data.completedLessons} / {data.totalLessons} lessons
          </span>
        </div>

        <div
          className={`mt-2 ${TRACK}`}
          role="progressbar"
          aria-valuenow={data.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${data.title} progress`}
        >
          <div
            className="h-full rounded-full bg-[#0064F9] transition-all duration-500"
            style={{ width: `${data.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-[#edf1f6] bg-[#f8fafc] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-[#718096]">Up next</p>
          <p className="mt-1 text-sm font-semibold text-[#111827]">{data.nextLesson}</p>
        </div>

        <Link
          to="/roadmap"
          className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dfe5ee] bg-white px-3.5 text-xs font-semibold text-[#374151] transition-colors hover:border-[#0064F9]/30 hover:text-[#0064F9] ${FOCUS_RING}`}
        >
          Continue
          <FiArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}