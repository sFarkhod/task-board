import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { getToken } from "@/utils/authUtil";

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken();

  return token ? <Navigate to="/" /> : children;
};
