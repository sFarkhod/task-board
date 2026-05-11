import { useState } from "react";

import { approveAssignmentService } from "../task.service";

export function useApproveAssignment() {
  const [loading, setLoading] = useState(false);

  const approve = async (id: string) => {
    try {
      setLoading(true);
      await approveAssignmentService(id);
    } finally {
      setLoading(false);
    }
  };

  return { approve, loading };
}
