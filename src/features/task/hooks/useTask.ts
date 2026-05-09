import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import type { Task } from "@/types/task";

import { fetchTaskById } from "../task.service";

export function useTask(id?: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        setLoading(true);
        const result = await fetchTaskById(id);
        setTask(result);
      } catch (err: unknown) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  const refetch = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const result = await fetchTaskById(id);
      setTask(result);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  return {
    task,
    loading,
    refetch,
  };
}
