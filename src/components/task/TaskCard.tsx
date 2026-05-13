import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import {
  assignmentStatusColors,
  priorityColors,
  statusColors,
  taskPriorityTranslationKey,
  taskStatusTranslationKey,
} from "@/constants/statusConfig";
import { useApproveAssignment } from "@/features/task/hooks/useApproveAssignment";
import { useAssignTask } from "@/features/task/hooks/useAssignTask";
import { useRejectAssignment } from "@/features/task/hooks/useRejectAssignment";
import type { Task } from "@/types/task";
import { getUser } from "@/utils/authUtil";
import { getAssignmentStatusLabel } from "@/utils/getAssignmentStatusLabel";

import Card from "../ui/Card";
import UserAvatar from "../ui/UserAvatar";
import AssigneeSelect from "./AssigneeSelect";
import AssignmentActions from "./AssignmentActions";

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
  const { approve, loading: approving } = useApproveAssignment();
  const { reject, loading: rejecting } = useRejectAssignment();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const currentUserId = getUser()?.id || "";

  const isPendingForMe =
    task.assignmentStatus === "PENDING" && task.assignee?.id === currentUserId;

  const handleAssign = async (userId: string | null) => {
    try {
      await assign(task.id, userId || "");
      refetchTasks?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };
  const handleApprove = async () => {
    try {
      await approve(task.id);
      refetchTasks?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };
  const handleReject = async () => {
    try {
      await reject(task.id, "Rejected");
      refetchTasks?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "shadow-sm hover:shadow-md cursor-pointer flex flex-col gap-3",
        isDragging && "opacity-50",
      )}
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
        <div className="flex flex-wrap gap-2">
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

      <div className="mt-2">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {t(taskPriorityTranslationKey[task.priority])}
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        {task.assignmentStatus !== "NONE" && (
          <span
            className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
              assignmentStatusColors[task.assignmentStatus]
            }`}
          >
            {getAssignmentStatusLabel(task.assignmentStatus, t)}
          </span>
        )}

        {isPendingForMe ? (
          <AssignmentActions
            onApprove={handleApprove}
            onReject={handleReject}
            loading={approving || rejecting}
          />
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            <AssigneeSelect
              users={users}
              value={task.assignee?.id}
              currentUserId={currentUserId}
              onChange={handleAssign}
            />
          </div>
        )}
      </div>

      {task.creator && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <UserAvatar name={task.creator.nickname} size={24} />
          <span className="text-xs text-gray-500">
            {t("createdBy")}{" "}
            <span className="font-medium">{task.creator.nickname}</span>
          </span>
        </div>
      )}
    </Card>
  );
}
