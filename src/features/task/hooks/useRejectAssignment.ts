import { useState } from "react";

import { rejectAssignmentService } from "../task.service";

export function useRejectAssignment() {
  const [loading, setLoading] = useState(false);

  const reject = async (id: string, comment: string) => {
    try {
      setLoading(true);
      await rejectAssignmentService(id, comment);
    } finally {
      setLoading(false);
    }
  };

  return { reject, loading };
}
