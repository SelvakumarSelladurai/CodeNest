import type { RouteObject } from "react-router-dom";

import PlaceholderPage from "../../components/ui/PlaceholderPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import AppLayout from "../layouts/AppLayout";

const placeholderRoutes = [
  { path: "/roadmap", title: "Roadmap" },
  { path: "/concepts", title: "Concepts" },
  { path: "/review", title: "Review" },
  { path: "/sessions", title: "Learning Sessions" },
  { path: "/projects", title: "Projects" },
  { path: "/english", title: "English" },
  { path: "/insights", title: "Insights" },
  { path: "/settings", title: "Settings" },
];

export const appRoutes: RouteObject = {
  element: <AppLayout />,
  children: [
    { path: "/dashboard", element: <DashboardPage /> },
    ...placeholderRoutes.map(({ path, title }) => ({
      path,
      element: <PlaceholderPage title={title} />,
    })),
  ],
};