import { useState } from "react";

import { unblockUser } from "../block.service";

export function useUnblockUser() {
  const [loading, setLoading] = useState(false);

  const unblock = async (id: string) => {
    try {
      setLoading(true);
      await unblockUser(id);
    } finally {
      setLoading(false);
    }
  };

  return { unblock, loading };
}
