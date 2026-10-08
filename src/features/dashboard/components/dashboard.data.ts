export const DASHBOARD_USER_NAME = "Selvakumar";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  hint: string;
};

/** Replace with data from your API once it's available. */
export const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "plan",
    label: "Today's plan",
    value: "2h 05m",
    hint: "6 learning activities",
  },
  {
    id: "health",
    label: "Knowledge health",
    value: "58%",
    hint: "Overall mastery",
  },
  {
    id: "review",
    label: "Due for review",
    value: "14",
    hint: "Concepts waiting for recall",
  },
];