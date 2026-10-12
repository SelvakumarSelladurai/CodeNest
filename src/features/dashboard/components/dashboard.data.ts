import {
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiLayers,
  FiRefreshCw,
  FiTarget,
} from "react-icons/fi";

export const dashboardStats = [
  {
    id: "concepts",
    label: "Concepts Learned",
    value: "42",
    change: "+8 this week",
    icon: FiBookOpen,
  },
  {
    id: "streak",
    label: "Current Streak",
    value: "7 days",
    change: "Keep it going",
    icon: FiTarget,
  },
  {
    id: "reviews",
    label: "Reviews Due",
    value: "12",
    change: "Today",
    icon: FiRefreshCw,
  },
  {
    id: "mastery",
    label: "Overall Mastery",
    value: "68%",
    change: "+6% this month",
    icon: FiCheckCircle,
  },
];

export const continueLearning = {
  title: "JavaScript Fundamentals",
  description:
    "Build a strong foundation in modern JavaScript and prepare yourself for React development.",
  progress: 72,
  completed: 18,
  total: 25,
  nextLesson: "Functions & Scope",
};

export const reviewData = {
  dueToday: 12,
  completed: 7,
  progress: 58,
};

export const weeklyActivity = [
  {
    day: "Mon",
    minutes: 42,
  },
  {
    day: "Tue",
    minutes: 65,
  },
  {
    day: "Wed",
    minutes: 35,
  },
  {
    day: "Thu",
    minutes: 78,
  },
  {
    day: "Fri",
    minutes: 52,
  },
  {
    day: "Sat",
    minutes: 90,
  },
  {
    day: "Sun",
    minutes: 45,
  },
];

export const recentConcepts = [
  {
    id: "closures",
    title: "JavaScript Closures",
    category: "JavaScript",
    mastery: 82,
    status: "Strong",
  },
  {
    id: "async-await",
    title: "Async / Await",
    category: "JavaScript",
    mastery: 74,
    status: "Learning",
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    category: "React",
    mastery: 61,
    status: "Learning",
  },
];

export const quickActions = [
  {
    id: "learn",
    title: "Learn",
    description: "Continue your roadmap",
    icon: FiBookOpen,
    href: "/roadmap",
  },
  {
    id: "review",
    title: "Review",
    description: "Strengthen your memory",
    icon: FiRefreshCw,
    href: "/review",
  },
  {
    id: "build",
    title: "Build",
    description: "Practice with projects",
    icon: FiCode,
    href: "/projects",
  },
];

export const dashboardHighlights = [
  {
    icon: FiClock,
    label: "Learning time",
    value: "6h 27m",
  },
  {
    icon: FiLayers,
    label: "Sessions",
    value: "14",
  },
];