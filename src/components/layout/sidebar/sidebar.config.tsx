import {
  FiBarChart2,
  FiCalendar,
  FiFolder,
  FiGlobe,
  FiLayers,
  FiMap,
  FiRefreshCw,
  FiSliders,
  FiSun,
} from "react-icons/fi";

import type { NavSection, SidebarUser } from "./sidebar.types";

export const SIDEBAR_STORAGE_KEY = "codenest.sidebar.collapsed";

export const XL_BREAKPOINT_QUERY = "(min-width: 1280px)";

export const CURRENT_USER: SidebarUser = {
  name: "Selvakumar",
  email: "selvakumar@gmail.com",
  initial: "S",
};

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "main",
    items: [{ label: "Today", to: "/dashboard", icon: <FiSun size={18} /> }],
  },
  {
    id: "learn",
    label: "Learn",
    items: [
      { label: "Roadmap", to: "/roadmap", icon: <FiMap size={18} /> },
      { label: "Concepts", to: "/concepts", icon: <FiLayers size={18} /> },
      { label: "Review", to: "/review", icon: <FiRefreshCw size={18} /> },
      { label: "Sessions", to: "/sessions", icon: <FiCalendar size={18} /> },
    ],
  },
  {
    id: "build",
    label: "Build",
    items: [{ label: "Projects", to: "/projects", icon: <FiFolder size={18} /> }],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { label: "English", to: "/english", icon: <FiGlobe size={18} /> },
      { label: "Insights", to: "/insights", icon: <FiBarChart2 size={18} /> },
      { label: "Settings", to: "/settings", icon: <FiSliders size={18} /> },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_SECTIONS.flatMap((section) => section.items);

export const FLOAT_BUTTON = "size-11 rounded-2xl shadow-md";

export const FLOAT_ACTIVE = "bg-sky-50 text-sky-600 ring-1 ring-sky-200 shadow-sky-100/70";

export const FLOAT_INACTIVE =
  "bg-white text-slate-500 shadow-slate-200/70 hover:bg-sky-50 hover:text-sky-600";

export const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2";

/** Dark tooltip. Appears on hover or keyboard focus of the parent `group`. */
export const TOOLTIP_CLASS = [
  "pointer-events-none absolute left-full top-1/2 z-[60] ml-3 -translate-y-1/2",
  "whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg",
  "-translate-x-1 opacity-0 transition-all duration-150",
  "group-hover:translate-x-0 group-hover:opacity-100",
  "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
].join(" ");

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}