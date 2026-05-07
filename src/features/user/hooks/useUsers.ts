import { useEffect, useState } from "react";
import type { UserModel } from "../../../types/user";
import { fetchUsers } from "../user.service";

export function useUsers() {
  const [data, setData] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers();
      setData(res);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, refetch: fetch };
}
