import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import type { BlockedUserModel } from "@/types/block";

import { fetchBlockedUsers } from "../block.service";

export function useBlockedUsers() {
  const [data, setData] = useState<BlockedUserModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const result = await fetchBlockedUsers();
        setData(result);
      } catch (err: unknown) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetchBlockedUsers();
      setData(result);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, refetch };
}
