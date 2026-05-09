import { useState } from "react";

import { blockUser } from "../block.service";

export function useBlockUser() {
  const [loading, setLoading] = useState(false);

  const block = async (data: { blockedUserId: string; comment?: string }) => {
    try {
      setLoading(true);
      await blockUser(data);
    } finally {
      setLoading(false);
    }
  };

  return { block, loading };
}
