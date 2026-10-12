import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiLayers,
  FiRefreshCw,
  FiTarget,
} from "react-icons/fi";

export type StatIconKey = "concepts" | "streak" | "reviews" | "mastery";
export type HighlightIconKey = "time" | "sessions";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  icon: StatIconKey;
};

export type ContinueLearning = {
  title: string;
  description: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  nextLesson: string;
};

export type ReviewSummary = {
  total: number;
  completed: number;
};

export type DayActivity = {
  day: string;
  minutes: number;
};

export type RecentConcept = {
  id: string;
  title: string;
  category: string;
  mastery: number;
  status: string;
};

export type DashboardData = {
  user: { firstName: string };
  streakDays: number;
  stats: DashboardStat[];
  continueLearning: ContinueLearning;
  review: ReviewSummary;
  weeklyActivity: DayActivity[];
  sessionsThisWeek: number;
  recentConcepts: RecentConcept[];
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconType;
};

/* -------------------------------------------------------------------------- */
/*                                    Icons                                   */
/* -------------------------------------------------------------------------- */

export const STAT_ICONS: Record<StatIconKey, IconType> = {
  concepts: FiBookOpen,
  streak: FiTarget,
  reviews: FiRefreshCw,
  mastery: FiCheckCircle,
};

export const HIGHLIGHT_ICONS: Record<HighlightIconKey, IconType> = {
  time: FiClock,
  sessions: FiLayers,
};

/* -------------------------------------------------------------------------- */
/*                                Quick actions                               */
/* -------------------------------------------------------------------------- */

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "learn",
    title: "Continue learning",
    description: "Follow your learning roadmap",
    href: "/roadmap",
    icon: FiBookOpen,
  },
  {
    id: "review",
    title: "Review concepts",
    description: "Recall what you've already learned",
    href: "/review",
    icon: FiRefreshCw,
  },
  {
    id: "build",
    title: "Build something",
    description: "Apply your knowledge in practice",
    href: "/projects",
    icon: FiCode,
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Mock data                                  */
/* -------------------------------------------------------------------------- */

/** Replace with the real API response once it's available. */
export const MOCK_DASHBOARD: DashboardData = {
  user: { firstName: "Selva" },
  streakDays: 7,
  stats: [
    { id: "concepts", label: "Concepts Learned", value: "42", change: "+8 this week", icon: "concepts" },
    { id: "streak", label: "Current Streak", value: "7 days", change: "Keep it going", icon: "streak" },
    { id: "reviews", label: "Reviews Due", value: "12", change: "Today", icon: "reviews" },
    { id: "mastery", label: "Overall Mastery", value: "68%", change: "+6% this month", icon: "mastery" },
  ],
  continueLearning: {
    title: "JavaScript Fundamentals",
    description:
      "Build a strong foundation in modern JavaScript and prepare yourself for React development.",
    progress: 72,
    completedLessons: 18,
    totalLessons: 25,
    nextLesson: "Functions & Scope",
  },
  review: { total: 12, completed: 7 },
  weeklyActivity: [
    { day: "Mon", minutes: 42 },
    { day: "Tue", minutes: 65 },
    { day: "Wed", minutes: 35 },
    { day: "Thu", minutes: 78 },
    { day: "Fri", minutes: 52 },
    { day: "Sat", minutes: 90 },
    { day: "Sun", minutes: 45 },
  ],
  sessionsThisWeek: 14,
  recentConcepts: [
    { id: "closures", title: "JavaScript Closures", category: "JavaScript", mastery: 82, status: "Strong" },
    { id: "async-await", title: "Async / Await", category: "JavaScript", mastery: 74, status: "Learning" },
    { id: "react-hooks", title: "React Hooks", category: "React", mastery: 61, status: "Learning" },
  ],
};

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

export const PAGE_WRAPPER = "mx-auto w-full max-w-[1440px] p-6 pb-10 lg:p-8";
export const CARD = "rounded-xl border border-[#e7ebf2] bg-white p-6";
export const EYEBROW = "text-xs font-semibold uppercase tracking-[0.08em] text-[#0064F9]";
export const CARD_TITLE = "mt-2 text-lg font-bold text-[#111827]";
export const TRACK = "h-2 overflow-hidden rounded-full bg-[#edf1f6]";
export const ICON_TILE =
  "flex h-10 w-10 items-center justify-center rounded-lg bg-[#0064F9]/10 text-[#0064F9]";
export const FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0064F9]/30 focus-visible:ring-offset-2";

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

export function getGreeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** 407 -> "6h 47m", 45 -> "45m" */
export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${String(minutes).padStart(2, "0")}m` : `${minutes}m`;
}

/** Minimum 8% so small values stay visible. Returns 8 when there's no data. */
export function barHeightPercent(value: number, max: number): number {
  if (max <= 0) return 8;
  return Math.max((value / max) * 100, 8);
}