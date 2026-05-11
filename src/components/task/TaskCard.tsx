import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import {
  priorityColors,
  statusColors,
  taskPriorityTranslationKey,
  taskStatusTranslationKey,
} from "@/constants/statusConfig";
import { useAssignTask } from "@/features/task/hooks/useAssignTask";
import type { Task } from "@/types/task";

import Card from "../ui/Card";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  task: Task;
  users: { label: string; value: string }[];
  onClick?: () => void;
  refetchTasks?: () => void;
  t: (key: string) => string;
}

export default function TaskCard({
  task,
  users,
  onClick,
  refetchTasks,
  t,
}: Props) {
  const { assign } = useAssignTask();

  const handleAssign = async (userId: string | null) => {
    try {
      await assign(task.id, userId || "");

      refetchTasks?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <Card
      onClick={onClick}
      className="shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">{task.title}</h2>

          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 wrap-break-word">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            statusColors[task.status]
          }`}
        >
          {t(taskStatusTranslationKey[task.status])}
        </span>
      </div>

      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {t(taskPriorityTranslationKey[task.priority])}
        </span>

        <div onClick={(e) => e.stopPropagation()}>
          <AssigneeSelect
            users={users}
            value={task.assignee?.id}
            onChange={handleAssign}
          />
        </div>
      </div>
    </Card>
  );
}
