import { useState } from "react";

import { addTaskTagService } from "../task-tag.service";

export function useAddTaskTag() {
  const [loading, setLoading] = useState(false);

  const addTag = async (taskId: string, name: string) => {
    try {
      setLoading(true);

      return await addTaskTagService(taskId, name);
    } finally {
      setLoading(false);
    }
  };

  return {
    addTag,
    loading,
  };
}
