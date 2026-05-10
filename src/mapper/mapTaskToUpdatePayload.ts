import type { Task } from "@/types/task";
import type { UpdateTaskPayload } from "@/types/task";

export const mapTaskToUpdatePayload = (
  task: Task,
): UpdateTaskPayload => ({
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  visibility: task.visibility,
  viewerUserIds: task.viewerUserIds || [],
});