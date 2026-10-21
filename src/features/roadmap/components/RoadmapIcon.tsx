import { useState } from "react";
import { FiLayers } from "react-icons/fi";

import type { RoadmapTech } from "../roadmap.data";

const DEVICON_BASE = "https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons";

const TECH_ICON_PATH: Record<RoadmapTech, string> = {
  python: "python/python-original.svg",
  javascript: "javascript/javascript-original.svg",
  typescript: "typescript/typescript-original.svg",
  react: "react/react-original.svg",
  html: "html5/html5-original.svg",
  css: "css3/css3-original.svg",
  tailwind: "tailwindcss/tailwindcss-original.svg",
  fastapi: "fastapi/fastapi-original.svg",
  postgresql: "postgresql/postgresql-original.svg",
};

const TECH_LABEL: Record<RoadmapTech, string> = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  html: "HTML5",
  css: "CSS3",
  tailwind: "Tailwind CSS",
  fastapi: "FastAPI",
  postgresql: "PostgreSQL",
};

const SIZE_CLASS = {
  md: "h-11 w-11 rounded-xl p-2",
  lg: "h-16 w-16 rounded-2xl p-3",
} as const;

const ICON_SIZE = {
  md: 22,
  lg: 30,
} as const;

type RoadmapIconProps = {
  tech?: RoadmapTech;
  title: string;
  size?: keyof typeof SIZE_CLASS;
};

export default function RoadmapIcon({ tech, title, size = "md" }: RoadmapIconProps) {
  const [failed, setFailed] = useState(false);
  const base = `flex shrink-0 items-center justify-center ${SIZE_CLASS[size]}`;

  if (!tech || failed) {
    return (
      <div aria-hidden="true" className={`${base} bg-[#0064F9]/10 text-[#0064F9]`}>
        <FiLayers size={ICON_SIZE[size]} />
      </div>
    );
  }

  return (
    <div className={`${base} border border-[#e7ebf2] bg-white shadow-sm`}>
      <img
        src={`${DEVICON_BASE}/${TECH_ICON_PATH[tech]}`}
        alt={`${TECH_LABEL[tech]} logo for ${title}`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </div>
  );
}