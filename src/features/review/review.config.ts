import type { IconType } from "react-icons";
import { FiCheck, FiMinusCircle, FiRotateCcw, FiZap } from "react-icons/fi";

export type Rating = "again" | "hard" | "good" | "easy";

export type RatingMeta = {
  value: Rating;
  label: string;
  key: string;
  hint: string;
  icon: IconType;
  className: string;
};

export const RATINGS: readonly RatingMeta[] = [
  {
    value: "again",
    label: "Again",
    key: "1",
    hint: "Forgot it",
    icon: FiRotateCcw,
    className:
      "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 focus-visible:ring-rose-300",
  },
  {
    value: "hard",
    label: "Hard",
    key: "2",
    hint: "Recalled with effort",
    icon: FiMinusCircle,
    className:
      "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 focus-visible:ring-amber-300",
  },
  {
    value: "good",
    label: "Good",
    key: "3",
    hint: "Recalled correctly",
    icon: FiCheck,
    className:
      "border-[#0064F9]/20 bg-[#0064F9]/10 text-[#0064F9] hover:bg-[#0064F9]/15 focus-visible:ring-[#0064F9]/40",
  },
  {
    value: "easy",
    label: "Easy",
    key: "4",
    hint: "Effortless recall",
    icon: FiZap,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-300",
  },
];

export const RATING_LABEL: Record<Rating, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

export const PAGE_WRAPPER = "mx-auto w-full max-w-[1440px] space-y-6 p-6 pb-10 lg:p-8";
export const CARD = "rounded-xl border border-[#e7ebf2] bg-white";
export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.08em] text-[#0064F9]";
export const TRACK = "overflow-hidden rounded-full bg-[#edf1f6]";
export const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0064F9]/30 focus-visible:ring-offset-2";