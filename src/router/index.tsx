import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Board from "../pages/Board";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./protectedRoute";
import { GuestRoute } from "./guestRoute";
import BlockedUsers from "../pages/BlockedUsers";

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Board />,
      },
      {
        path: "/blocked",
        element: <BlockedUsers />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
]);
