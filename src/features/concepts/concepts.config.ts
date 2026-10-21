import type { IconType } from "react-icons";
import { FiCheckCircle, FiCircle, FiRefreshCw } from "react-icons/fi";

import type { ConceptLevel, ConceptStatus } from "./concepts.data";

export type StatusFilter = "all" | "due" | ConceptStatus;

export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "due", label: "Due today" },
  { value: "learning", label: "Learning" },
  { value: "strong", label: "Strong" },
  { value: "new", label: "Not started" },
];

export const STATUS_META: Record<
  ConceptStatus,
  { label: string; icon: IconType; badge: string; bar: string }
> = {
  new: {
    label: "Not started",
    icon: FiCircle,
    badge: "bg-slate-100 text-slate-600",
    bar: "bg-slate-300",
  },
  learning: {
    label: "Learning",
    icon: FiRefreshCw,
    badge: "bg-blue-50 text-blue-700",
    bar: "bg-[#0064F9]",
  },
  strong: {
    label: "Strong",
    icon: FiCheckCircle,
    badge: "bg-emerald-50 text-emerald-700",
    bar: "bg-[#10b981]",
  },
};

export const LEVEL_LABEL: Record<ConceptLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const PAGE_WRAPPER = "mx-auto w-full max-w-[1440px] space-y-6 p-6 pb-10 lg:p-8";
export const CARD = "rounded-xl border border-[#e7ebf2] bg-white";
export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.08em] text-[#0064F9]";
export const TRACK = "overflow-hidden rounded-full bg-[#edf1f6]";
export const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0064F9]/30 focus-visible:ring-offset-2";