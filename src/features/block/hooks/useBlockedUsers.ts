import { useEffect, useState } from "react";
import type { BlockedUserModel } from "@/types/block";
import { fetchBlockedUsers } from "../block.service";

export function useBlockedUsers() {
  const [data, setData] = useState<BlockedUserModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const result = await fetchBlockedUsers();
      setData(result);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data, loading, refetch: fetchUsers };
}
