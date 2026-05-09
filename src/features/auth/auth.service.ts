import { loginRequest, registerRequest } from "@/api/auth";

import type { RegisterFormData } from "./schema";

export async function registerUser(data: RegisterFormData) {
  const res = await registerRequest({
    nickname: data.nickname,
    email: data.email || undefined,
    password: data.password,
  });

  return res.data;
}

export async function loginUser(data: { nickname: string; password: string }) {
  const res = await loginRequest(data);
  return res.data;
}
