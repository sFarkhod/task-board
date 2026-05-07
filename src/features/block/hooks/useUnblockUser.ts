import { useState } from "react";

import { unblockUser } from "../block.service";

export function useUnblockUser() {
  const [loading, setLoading] = useState(false);

  const unblock = async (id: string) => {
    try {
      setLoading(true);
      await unblockUser(id);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { unblock, loading };
}
