import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import type { Tag } from "@/types/task";

import { fetchTags } from "../tag.service";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      try {
        setLoading(true);

        const result = await fetchTags();

        setTags(result);
      } catch (err) {
        toast.error(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadTags();
  }, []);

  return {
    tags,
    setTags,
    loading,
  };
}
