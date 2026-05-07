import type { JSX } from "react";
import { Navigate } from "react-router-dom";

import { isAuthenticated } from "@/utils/authUtil";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
