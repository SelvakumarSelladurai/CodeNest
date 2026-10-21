export type ConceptLevel = "beginner" | "intermediate" | "advanced";
export type ConceptStatus = "new" | "learning" | "strong";

export type Concept = {
  slug: string;
  title: string;
  category: string;
  level: ConceptLevel;
  summary: string;
  keyPoints: string[];
  tags: string[];
  mastery: number;
  nextReviewInDays: number | null;
};

export const CONCEPTS: readonly Concept[] = [
  {
    slug: "closures",
    title: "JavaScript Closures",
    category: "JavaScript",
    level: "intermediate",
    summary: "A function that remembers the variables from the scope where it was created.",
    keyPoints: [
      "Functions capture their lexical scope at the moment they are created.",
      "Closures keep private state alive after the outer function has returned.",
      "Common uses include factories, event handlers, and memoization.",
    ],
    tags: ["scope", "functions", "lexical"],
    mastery: 82,
    nextReviewInDays: 2,
  },
  {
    slug: "async-await",
    title: "Async / Await",
    category: "JavaScript",
    level: "intermediate",
    summary: "Syntax for promise-based code that reads from top to bottom.",
    keyPoints: [
      "An async function always returns a promise.",
      "await pauses the current function, not the whole thread.",
      "Run independent requests together with Promise.all instead of awaiting them one by one.",
    ],
    tags: ["promises", "async", "fetch"],
    mastery: 74,
    nextReviewInDays: 0,
  },
  {
    slug: "event-loop",
    title: "The Event Loop",
    category: "JavaScript",
    level: "advanced",
    summary: "How JavaScript schedules callbacks while running on a single thread.",
    keyPoints: [
      "The call stack runs synchronous code before anything else.",
      "Microtasks such as promise callbacks run before the next timer callback.",
      "Long synchronous work blocks rendering and user input.",
    ],
    tags: ["runtime", "microtasks", "timers"],
    mastery: 40,
    nextReviewInDays: 0,
  },
  {
    slug: "react-hooks",
    title: "React Hooks",
    category: "React",
    level: "intermediate",
    summary: "Functions that let components hold state and run side effects.",
    keyPoints: [
      "Call hooks only at the top level of a component or custom hook.",
      "useEffect synchronises with external systems and depends on its dependency list.",
      "Move reusable logic into custom hooks whose names start with use.",
    ],
    tags: ["useState", "useEffect", "custom hooks"],
    mastery: 61,
    nextReviewInDays: 0,
  },
  {
    slug: "controlled-components",
    title: "Controlled Components",
    category: "React",
    level: "beginner",
    summary: "Form inputs whose value is owned by React state.",
    keyPoints: [
      "Pairing value with onChange makes React the single source of truth.",
      "Use controlled inputs when other parts of the UI depend on the value.",
      "Uncontrolled inputs read through refs suit simple, one-off reads.",
    ],
    tags: ["forms", "state", "inputs"],
    mastery: 90,
    nextReviewInDays: 6,
  },
  {
    slug: "ts-narrowing",
    title: "Type Narrowing",
    category: "TypeScript",
    level: "intermediate",
    summary: "Refining a broad type to a specific one with checks in code.",
    keyPoints: [
      "typeof, instanceof, and the in operator narrow union types.",
      "Discriminated unions use a shared literal field to tell variants apart.",
      "An exhaustive switch ending in a never check catches missing cases at compile time.",
    ],
    tags: ["unions", "guards", "type checks"],
    mastery: 55,
    nextReviewInDays: 1,
  },
  {
    slug: "ts-generics",
    title: "Generics",
    category: "TypeScript",
    level: "advanced",
    summary: "Type parameters that let functions and types work safely across many types.",
    keyPoints: [
      "Declare a type parameter in angle brackets, for example <T>.",
      "Use extends to constrain a parameter to types that have certain properties.",
      "Let the compiler infer type arguments whenever it can.",
    ],
    tags: ["generics", "reusable", "types"],
    mastery: 0,
    nextReviewInDays: null,
  },
  {
    slug: "css-flexbox",
    title: "Flexbox",
    category: "CSS",
    level: "beginner",
    summary: "A one-dimensional layout model for aligning items in a row or column.",
    keyPoints: [
      "display: flex turns the element's children into flex items.",
      "justify-content aligns along the main axis, and align-items along the cross axis.",
      "gap spaces items without margin workarounds.",
    ],
    tags: ["layout", "alignment", "responsive"],
    mastery: 95,
    nextReviewInDays: 10,
  },
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return CONCEPTS.find((concept) => concept.slug === slug);
}