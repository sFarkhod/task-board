import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import type { Task, TaskFilters } from "@/types/task";

import { fetchTasks } from "../task.service";

export function useTasks(initialFilters?: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<TaskFilters>(initialFilters || {});

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const result = await fetchTasks(filters);
        setTasks(result.items);
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [filters]);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetchTasks(filters);
      setTasks(result.items);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<TaskFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return {
    tasks,
    loading,
    filters,
    setFilters: updateFilters,
    refetch,
  };
}
