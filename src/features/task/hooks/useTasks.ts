import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import type { Task, TaskFilters } from "@/types/task";

import { fetchTasks } from "../task.service";

export function useTasks(initialFilters?: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    pageSize: 20,
    ...(initialFilters || {}),
  });

  const [hasMore, setHasMore] = useState(true);

  const loadTasks = useCallback(
    async (currentFilters: TaskFilters, append = false) => {
      try {
        setLoading(true);

        const result = await fetchTasks(currentFilters);

        setTasks((prev) => {
          const updated = append ? [...prev, ...result.items] : result.items;

          setHasMore(updated.length < result.total);

          return updated;
        });
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks(filters, filters.page !== 1);
  }, [filters, loadTasks]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setFilters((prev) => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));
  }, [loading, hasMore]);

  const refetch = async () => {
    const resetFilters = {
      ...filters,
      page: 1,
    };

    setFilters(resetFilters);

    await loadTasks(resetFilters, false);
  };

  const updateFilters = (newFilters: Partial<TaskFilters>) => {
    setTasks([]);

    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  return {
    tasks,
    loading,
    filters,
    setFilters: updateFilters,
    refetch,
    loadMore,
    hasMore,
  };
}
