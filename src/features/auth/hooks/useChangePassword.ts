import { useState } from "react";

import { changePasswordService } from "../auth.service";

export function useChangePassword() {
  const [loading, setLoading] = useState(false);

  const change = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);

      await changePasswordService(currentPassword, newPassword);
    } finally {
      setLoading(false);
    }
  };

  return {
    change,
    loading,
  };
}
