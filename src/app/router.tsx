import { createBrowserRouter } from "react-router-dom";

import { appRoutes } from "./routes/appRoutes";
import { authRoutes } from "./routes/authRoutes";

export const router = createBrowserRouter([...authRoutes, appRoutes]);