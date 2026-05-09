import { useState } from "react";

import type { CreateTaskFormData } from "../task.schema";
import { createTaskService } from "../task.service";

export function useCreateTask() {
  const [loading, setLoading] = useState(false);

  const create = async (data: CreateTaskFormData) => {
    try {
      setLoading(true);
      await createTaskService(data);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
}
