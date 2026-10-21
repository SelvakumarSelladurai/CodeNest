import type { IconType } from "react-icons";
import { FiBookOpen, FiCheck, FiLock, FiPlay } from "react-icons/fi";

import type { RoadmapStatus } from "./roadmap.data";

export type StatusFilter = "all" | RoadmapStatus;

export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All topics" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "upcoming", label: "Upcoming" },
  { value: "locked", label: "Locked" },
];

export const STATUS_ICON: Record<RoadmapStatus, IconType> = {
  completed: FiCheck,
  "in-progress": FiPlay,
  upcoming: FiBookOpen,
  locked: FiLock,
};

export const STATUS_ICON_TILE: Record<RoadmapStatus, string> = {
  completed: "bg-emerald-50 text-emerald-600",
  "in-progress": "bg-[#0064F9]/10 text-[#0064F9]",
  upcoming: "bg-slate-100 text-slate-500",
  locked: "bg-slate-100 text-slate-400",
};

export const STATUS_BADGE: Record<RoadmapStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  "in-progress": "bg-blue-50 text-blue-700",
  upcoming: "bg-slate-100 text-slate-600",
  locked: "bg-slate-100 text-slate-500",
};

export const TOPIC_CTA: Record<Exclude<RoadmapStatus, "locked">, string> = {
  completed: "Review",
  "in-progress": "Continue",
  upcoming: "Start learning",
};

export const PATH_GUIDANCE =
  "Follow each stage in order. Build the fundamentals, practise what you learn, and use projects to turn knowledge into skill.";

export const PAGE_WRAPPER = "mx-auto w-full max-w-[1440px] space-y-6 p-6 pb-10 lg:p-8";
export const CARD = "rounded-xl border border-[#e7ebf2] bg-white";
export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.08em] text-[#0064F9]";
export const TRACK = "overflow-hidden rounded-full bg-[#edf1f6]";
export const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0064F9]/30 focus-visible:ring-offset-2";