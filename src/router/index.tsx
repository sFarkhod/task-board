import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import BlockedUsers from "@/pages/BlockedUsers";
import Board from "@/pages/Board";
import NotFound from "@/pages/NotFound";

import { GuestRoute } from "./guestRoute";
import { ProtectedRoute } from "./protectedRoute";

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
