import { useState } from "react";

import type { UpdateTaskPayload } from "@/types/task";

import { updateTaskService } from "../task.service";

export function useTaskUpdate() {
  const [updating, setUpdating] = useState(false);

  const update = async (id: string, data: UpdateTaskPayload) => {
    try {
      setUpdating(true);
      const updated = await updateTaskService(id, data);
      return updated;
    } finally {
      setUpdating(false);
    }
  };

  return { update, updating };
}
