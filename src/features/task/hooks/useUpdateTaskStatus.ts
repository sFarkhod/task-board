import { useState } from "react";

import type { Task } from "@/types/task";

import { updateTaskStatusService } from "../task.service";

export function useUpdateTaskStatus() {
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id: string, status: Task["status"]) => {
    try {
      setLoading(true);
      await updateTaskStatusService(id, status);
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading };
}
