import { FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";

import { CARD, CARD_TITLE, EYEBROW, type RecentConcept } from "../dashboard.config";

type RecentConceptsCardProps = {
  concepts: RecentConcept[];
};

export default function RecentConceptsCard({ concepts }: RecentConceptsCardProps) {
  return (
    <article className={CARD}>
      <div className="flex items-center justify-between">
        <div>
          <p className={EYEBROW}>Recent concepts</p>
          <h2 className={CARD_TITLE}>Keep improving</h2>
        </div>

        <Link to="/concepts" className="text-xs font-semibold text-[#0064F9] hover:underline">
          View all
        </Link>
      </div>

      <ul className="mt-5 divide-y divide-[#edf1f6]">
        {concepts.map((concept) => (
          <li key={concept.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#111827]">{concept.title}</p>
                <p className="mt-1 text-xs text-[#8b95a7]">{concept.category}</p>
              </div>

              <span className="shrink-0 text-xs font-semibold text-[#4b5563]">{concept.mastery}%</span>
            </div>

            <div
              className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf1f6]"
              role="progressbar"
              aria-valuenow={concept.mastery}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${concept.title} mastery`}
            >
              <div className="h-full rounded-full bg-[#0064F9]" style={{ width: `${concept.mastery}%` }} />
            </div>

            <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-[#10a36a]">
              <FiCheck size={11} aria-hidden="true" />
              {concept.status}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}