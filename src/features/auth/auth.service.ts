import { loginRequest, registerRequest } from "@/api/auth";
import { getApiErrorMessage } from "@/api/handleApiError";
import type { RegisterFormData } from "./schema";
import { toast } from "react-toastify";

export async function registerUser(data: RegisterFormData) {
  try {
    const res = await registerRequest({
      nickname: data.nickname,
      email: data.email || undefined,
      password: data.password,
    });

    return res.data;
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
}

export async function loginUser(data: { nickname: string; password: string }) {
  try {
    const res = await loginRequest(data);
    return res.data;
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
}
