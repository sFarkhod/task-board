import { useState } from "react";

import { deleteTaskService } from "../task.service";

export function useRemoveTask() {
  const [loading, setLoading] = useState(false);

  const remove = async (id: string) => {
    try {
      setLoading(true);
      await deleteTaskService(id);
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
}
