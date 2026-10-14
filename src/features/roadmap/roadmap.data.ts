import {
  FiCode,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiServer,
  type IconType,
} from "react-icons/fi";

export type RoadmapStatus = "completed" | "in-progress" | "upcoming" | "locked";

export type RoadmapTech =
  | "python"
  | "javascript"
  | "typescript"
  | "react"
  | "html"
  | "css"
  | "tailwind"
  | "fastapi"
  | "postgresql";

export type RoadmapTopic = {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: RoadmapStatus;
  href: string;
};

export type RoadmapStage = {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: IconType;
  topics: RoadmapTopic[];
};

export type RoadmapCatalogItem = {
  slug: string;
  title: string;
  description: string;
  estimatedDuration: string;
  weeklyGoal: string;
  tags: string[];
  stages: RoadmapStage[];
  tech?: RoadmapTech;
  externalUrl?: string;
};

export const statusLabels: Record<RoadmapStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  upcoming: "Upcoming",
  locked: "Locked",
};

export const roadmapStages: RoadmapStage[] = [
  {
    id: "web-foundations",
    number: 1,
    title: "Web Foundations",
    description: "Understand how websites are structured and styled.",
    icon: FiGlobe,
    topics: [
      {
        id: "html",
        title: "HTML5",
        description: "Semantic HTML, forms, accessibility, and page structure.",
        duration: "8 lessons",
        status: "completed",
        href: "/concepts",
      },
      {
        id: "css",
        title: "CSS & Responsive Design",
        description: "Layouts, Flexbox, Grid, responsive design, and styling.",
        duration: "12 lessons",
        status: "completed",
        href: "/concepts",
      },
      {
        id: "tailwind",
        title: "Tailwind CSS",
        description: "Utility-first styling, responsive utilities, and design systems.",
        duration: "8 lessons",
        status: "completed",
        href: "/concepts",
      },
    ],
  },
  {
    id: "javascript",
    number: 2,
    title: "JavaScript",
    description: "Build strong programming fundamentals before moving to React.",
    icon: FiCode,
    topics: [
      {
        id: "js-fundamentals",
        title: "JavaScript Fundamentals",
        description: "Variables, data types, operators, conditions, and loops.",
        duration: "10 lessons",
        status: "completed",
        href: "/concepts",
      },
      {
        id: "js-functions",
        title: "Functions & Scope",
        description: "Functions, closures, scope, callbacks, and execution context.",
        duration: "9 lessons",
        status: "in-progress",
        href: "/concepts",
      },
      {
        id: "js-async",
        title: "Asynchronous JavaScript",
        description: "Promises, async/await, the event loop, and API requests.",
        duration: "8 lessons",
        status: "upcoming",
        href: "/concepts",
      },
    ],
  },
  {
    id: "typescript",
    number: 3,
    title: "TypeScript",
    description: "Write safer, maintainable JavaScript applications.",
    icon: FiLayers,
    topics: [
      {
        id: "ts-basics",
        title: "TypeScript Fundamentals",
        description: "Types, interfaces, unions, narrowing, and type inference.",
        duration: "9 lessons",
        status: "upcoming",
        href: "/concepts",
      },
      {
        id: "ts-advanced",
        title: "Advanced Types",
        description: "Generics, utility types, and typing reusable functions.",
        duration: "8 lessons",
        status: "locked",
        href: "/concepts",
      },
    ],
  },
  {
    id: "react",
    number: 4,
    title: "React Development",
    description: "Build interactive interfaces with reusable components.",
    icon: FiMonitor,
    topics: [
      {
        id: "react-basics",
        title: "React Fundamentals",
        description: "Components, JSX, props, events, and rendering.",
        duration: "10 lessons",
        status: "locked",
        href: "/concepts",
      },
      {
        id: "react-state",
        title: "State & Hooks",
        description: "useState, useEffect, custom hooks, and component state.",
        duration: "10 lessons",
        status: "locked",
        href: "/concepts",
      },
      {
        id: "react-apps",
        title: "Routing & Application Architecture",
        description: "Routes, layouts, forms, and feature-based organization.",
        duration: "8 lessons",
        status: "locked",
        href: "/concepts",
      },
    ],
  },
  {
    id: "backend",
    number: 5,
    title: "Backend & Databases",
    description: "Build APIs and work with persistent application data.",
    icon: FiServer,
    topics: [
      {
        id: "python",
        title: "Python Fundamentals",
        description: "Data structures, functions, modules, and exceptions.",
        duration: "12 lessons",
        status: "locked",
        href: "/concepts",
      },
      {
        id: "fastapi",
        title: "FastAPI",
        description: "API endpoints, validation, authentication, and dependencies.",
        duration: "10 lessons",
        status: "locked",
        href: "/concepts",
      },
      {
        id: "postgresql",
        title: "PostgreSQL",
        description: "SQL, relationships, indexes, and database design.",
        duration: "8 lessons",
        status: "locked",
        href: "/concepts",
      },
    ],
  },
  {
    id: "projects",
    number: 6,
    title: "Production Projects",
    description: "Apply your knowledge to real-world applications.",
    icon: FiDatabase,
    topics: [
      {
        id: "project-auth",
        title: "Authentication System",
        description: "Registration, login, validation, and protected routes.",
        duration: "1 project",
        status: "locked",
        href: "/projects",
      },
      {
        id: "project-fullstack",
        title: "Full-Stack Application",
        description: "Connect React, FastAPI, and PostgreSQL.",
        duration: "1 project",
        status: "locked",
        href: "/projects",
      },
      {
        id: "project-deployment",
        title: "Testing & Deployment",
        description: "Automated tests, environment configuration, and deployment.",
        duration: "1 project",
        status: "locked",
        href: "/projects",
      },
    ],
  },
];

export const roadmapOverview = {
  title: "Full-Stack Developer",
  description:
    "Your structured path from frontend fundamentals to production-ready full-stack applications.",
  estimatedDuration: "6–9 months",
  weeklyGoal: "8 hours / week",
};

const fullStackRoadmap: RoadmapCatalogItem = {
  slug: "full-stack",
  title: roadmapOverview.title,
  description: roadmapOverview.description,
  estimatedDuration: roadmapOverview.estimatedDuration,
  weeklyGoal: roadmapOverview.weeklyGoal,
  tags: [
    "full-stack",
    "frontend",
    "backend",
    "web",
    "javascript",
    "typescript",
    "react",
    "python",
    "fastapi",
    "postgresql",
  ],
  stages: roadmapStages,
};

const frontendRoadmap: RoadmapCatalogItem = {
  slug: "frontend",
  title: "Frontend Developer",
  description:
    "Master the browser, modern JavaScript, TypeScript, and React to build production user interfaces.",
  estimatedDuration: "3–5 months",
  weeklyGoal: "8 hours / week",
  tags: ["frontend", "web", "html", "css", "tailwind", "javascript", "typescript", "react"],
  stages: roadmapStages.slice(0, 4),
  tech: "react",
  externalUrl: "https://roadmap.sh/frontend",
};

const pythonRoadmap: RoadmapCatalogItem = {
  slug: "python",
  title: "Python Developer",
  description:
    "Learn Python from the basics through APIs and databases, and build back-end services you can ship.",
  estimatedDuration: "3–4 months",
  weeklyGoal: "8 hours / week",
  tags: ["python", "backend", "fastapi", "postgresql", "api", "databases"],
  stages: roadmapStages.slice(4, 5),
  tech: "python",
  externalUrl: "https://roadmap.sh/python",
};

export const ROADMAP_CATALOG: readonly RoadmapCatalogItem[] = [
  fullStackRoadmap,
  frontendRoadmap,
  pythonRoadmap,
];

export function getRoadmapBySlug(slug: string): RoadmapCatalogItem | undefined {
  return ROADMAP_CATALOG.find((roadmap) => roadmap.slug === slug);
}