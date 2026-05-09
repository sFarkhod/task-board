import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

import { loginUser } from "../auth.service";
import type { LoginFormData } from "../schema";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginStoreFunction } = useAuthStore();

  const login = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const result = await loginUser(data);
      if (result?.user) {
        loginStoreFunction(result.user, result?.accessToken);
      }

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
}
