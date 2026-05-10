import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import CreatableSelect from "@/components/ui/CreatableSelect";
import { useTags } from "@/features/tag/hooks/useTags";
import { useAddTaskTag } from "@/features/task/hooks/useAddTaskTag";
import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onTaskChange: (task: Task) => void;
  refetchTasks?: () => void;
}

export default function TagSelect({ task, onTaskChange, refetchTasks }: Props) {
  const { t } = useTranslation("tasks");
  const { tags, setTags, loading } = useTags();
  const { addTag } = useAddTaskTag();

  const [value, setValue] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const options = useMemo(() => {
    return tags
      .filter((tag) => !task.tags?.some((t) => t.id === tag.id))
      .map((tag) => ({
        label: tag.name,
        value: tag.name,
      }));
  }, [tags, task.tags]);

  const handleChange = async (
    option: {
      label: string;
      value: string;
    } | null,
  ) => {
    if (!option) return;

    try {
      setValue(option);

      const updatedTask = await addTag(task.id, option.value);

      if (updatedTask) {
        onTaskChange(updatedTask);
        
        updatedTask.tags.forEach((tag) => {
          const exists = tags.some((t) => t.id === tag.id);

          if (!exists) {
            setTags((prev) => [...prev, tag]);
          }
        });
      }

      setValue(null);
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
      refetchTasks?.();
    }
  };

  return (
    <CreatableSelect
      options={options}
      value={value}
      onChange={handleChange}
      loading={loading}
      isClearable
      placeholder={t("addTag")}
    />
  );
}
