import { Navigate, type RouteObject } from "react-router-dom";

import PlaceholderPage from "../../components/ui/PlaceholderPage";
import ConceptDetailPage from "../../features/concepts/pages/ConceptDetailPage";
import ConceptsPage from "../../features/concepts/pages/ConceptsPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import ReviewPage from "../../features/review/pages/ReviewPage";
import RoadmapCatalogPage from "../../features/roadmap/pages/RoadmapCatalogPage";
import RoadmapDetailPage from "../../features/roadmap/pages/RoadmapDetailPage";
import AppLayout from "../layouts/AppLayout";

const placeholderRoutes = [
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
    { path: "/roadmaps", element: <RoadmapCatalogPage /> },
    { path: "/roadmaps/:slug", element: <RoadmapDetailPage /> },
    { path: "/roadmap", element: <Navigate to="/roadmaps" replace /> },
    { path: "/concepts", element: <ConceptsPage /> },
    { path: "/concepts/:slug", element: <ConceptDetailPage /> },
    { path: "/review", element: <ReviewPage /> },
    ...placeholderRoutes.map(({ path, title }) => ({
      path,
      element: <PlaceholderPage title={title} />,
    })),
  ],
};