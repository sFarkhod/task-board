import { api } from "./axios";
import type { AuthResponse } from "@/types/auth";

export const loginRequest = (data: { nickname: string; password: string }) =>
  api.post<AuthResponse>("/auth/login", data);

export const registerRequest = (data: {
  nickname: string;
  email?: string;
  password: string;
}) => api.post<AuthResponse>("/auth/register", data);
