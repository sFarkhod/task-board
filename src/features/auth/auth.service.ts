import { loginRequest, registerRequest } from "@/api/auth";

import type { RegisterFormData } from "./schema";

export async function registerUser(data: RegisterFormData) {
  const result = await registerRequest({
    nickname: data.nickname,
    email: data.email || undefined,
    password: data.password,
  });

  return result.data;
}

export async function loginUser(data: { nickname: string; password: string }) {
  const result = await loginRequest(data);
  return result.data;
}
