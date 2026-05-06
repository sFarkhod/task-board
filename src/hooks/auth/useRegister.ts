import { useState } from "react";
import { registerUser } from "../../features/auth/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { RegisterFormData } from "../../features/auth/schema";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const result = await registerUser(data);
      if (result?.user) {
        login(result.user, result?.accessToken);
      }

      navigate("/");
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
}
