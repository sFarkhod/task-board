import type { JSX } from "react";
import { isAuthenticated } from "@/utils/authUtil";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
