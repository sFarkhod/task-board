import { useState } from "react";

import { assignTaskService } from "../task.service";

export function useAssignTask() {
  const [loading, setLoading] = useState(false);

  const assign = async (id: string, assigneeId: string) => {
    try {
      setLoading(true);
      await assignTaskService(id, assigneeId);
    } finally {
      setLoading(false);
    }
  };

  return { assign, loading };
}
