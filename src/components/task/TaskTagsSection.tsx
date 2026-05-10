import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import { useRemoveTaskTag } from "@/features/task/hooks/useRemoveTaskTag";
import type { Task } from "@/types/task";

import FormField from "../ui/FormField";
import TagSelect from "./TagSelect";

interface Props {
  task: Task;
  onTaskChange: (task: Task) => void;
  refetchTasks?: () => void;
}

export default function TaskTagsSection({ task, onTaskChange, refetchTasks }: Props) {
  const { t } = useTranslation("tasks");

  const { removeTag } = useRemoveTaskTag();

  const handleRemoveTag = async (tagId: string) => {
    try {
      await removeTag(task.id, tagId);
      onTaskChange({
        ...task,
        tags: task.tags.filter((tag) => tag.id !== tagId),
      });
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    } finally {
        refetchTasks?.();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {task.tags?.map((tag) => (
          <div
            key={tag.id}
            className="
              flex items-center gap-1
              px-2 py-1
              text-xs
              bg-gray-200
              rounded-md
            "
          >
            <span>{tag.name}</span>
            <X
              size={14}
              className="
                cursor-pointer
                text-gray-500
                hover:text-red-500
              "
              onClick={() => handleRemoveTag(tag.id)}
            />
          </div>
        ))}
      </div>
      <FormField id="addTag" label={t("addTag")}>
        <TagSelect task={task} onTaskChange={onTaskChange} refetchTasks={refetchTasks} />
      </FormField>
    </div>
  );
}
