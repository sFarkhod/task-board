import type { AuthResponse } from "@/types/auth";

import { api } from "./axios";

export const loginRequest = (data: { nickname: string; password: string }) =>
  api.post<AuthResponse>("/auth/login", data);

export const registerRequest = (data: {
  nickname: string;
  email?: string;
  password: string;
}) => api.post<AuthResponse>("/auth/register", data);

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => api.patch("/auth/password", data);
