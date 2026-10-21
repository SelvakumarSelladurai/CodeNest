import { FiClock } from "react-icons/fi";

import { CARD, EYEBROW } from "../review.config";

type ReviewHeaderProps = {
  total: number;
  completed: number;
};

function plural(count: number, singular: string): string {
  return `${count} ${count === 1 ? singular : `${singular}s`}`;
}

export default function ReviewHeader({ total, completed }: ReviewHeaderProps) {
  const remaining = Math.max(0, total - completed);

  return (
    <header className="space-y-6">
      <div>
        <p className={`mb-2 flex items-center gap-2 ${EYEBROW}`}>
          <FiClock size={14} aria-hidden="true" />
          Daily review
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">Review</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">
          Recall each concept from memory before you reveal the answer. Honest ratings keep your
          schedule accurate.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <div className={`p-4 ${CARD}`}>
          <dt className="text-xs text-[#718096]">Due today</dt>
          <dd className="mt-2 text-2xl font-bold text-[#111827]">{total}</dd>
          <dd className="mt-1 text-[11px] text-[#8b95a7]">{plural(total, "concept")} in this session</dd>
        </div>
        <div className={`p-4 ${CARD}`}>
          <dt className="text-xs text-[#718096]">Reviewed</dt>
          <dd className="mt-2 text-2xl font-bold text-[#111827]">{completed}</dd>
          <dd className="mt-1 text-[11px] text-[#8b95a7]">Rated so far</dd>
        </div>
        <div className={`col-span-2 p-4 lg:col-span-1 ${CARD}`}>
          <dt className="text-xs text-[#718096]">Remaining</dt>
          <dd className="mt-2 text-2xl font-bold text-[#111827]">{remaining}</dd>
          <dd className="mt-1 text-[11px] text-[#8b95a7]">Left in this session</dd>
        </div>
      </dl>
    </header>
  );
}