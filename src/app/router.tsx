import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Welcome to CodeNest
        </h1>

        <p className="mt-2 text-base-content/60">
          Fake login successful.
        </p>
      </div>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);