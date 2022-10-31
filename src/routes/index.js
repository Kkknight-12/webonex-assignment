import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardLayout from "../layout";
import Home from "../pages/dashboard/Home";
import Users from "../pages/users/Users";
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",

      children: [
        { element: <Navigate to="/login" replace />, index: true },
        {
          path: "/login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // OUTLET
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: "home", element: <Home /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);
}