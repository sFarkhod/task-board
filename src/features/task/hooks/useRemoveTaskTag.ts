import { useState } from "react";

import { removeTaskTagService } from "../task-tag.service";

export function useRemoveTaskTag() {
  const [loading, setLoading] = useState(false);

  const removeTag = async (taskId: string, tagId: string) => {
    try {
      setLoading(true);

      await removeTaskTagService(taskId, tagId);
    } finally {
      setLoading(false);
    }
  };

  return {
    removeTag,
    loading,
  };
}
