import { FiBookOpen } from "react-icons/fi";

import { CARD, EYEBROW } from "../concepts.config";
import type { ConceptStats } from "../concepts.logic";

type ConceptsHeaderProps = {
  stats: ConceptStats;
};

export default function ConceptsHeader({ stats }: ConceptsHeaderProps) {
  const tiles = [
    {
      label: "Total concepts",
      value: stats.total,
      hint: `${stats.averageMastery}% average mastery`,
    },
    { label: "Due today", value: stats.dueToday, hint: "Ready for recall" },
    { label: "Learning", value: stats.learning, hint: "In progress" },
    { label: "Strong", value: stats.strong, hint: "Well retained" },
  ];

  return (
    <header className="space-y-6">
      <div>
        <p className={`mb-2 flex items-center gap-2 ${EYEBROW}`}>
          <FiBookOpen size={14} aria-hidden="true" />
          Concept library
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">Concepts</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#718096]">
          Every idea you are learning, and how well you remember it. Review what is due today to
          keep it fresh.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div key={tile.label} className={`p-4 ${CARD}`}>
            <dt className="text-xs text-[#718096]">{tile.label}</dt>
            <dd className="mt-2 text-2xl font-bold text-[#111827]">{tile.value}</dd>
            <dd className="mt-1 text-[11px] text-[#8b95a7]">{tile.hint}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}