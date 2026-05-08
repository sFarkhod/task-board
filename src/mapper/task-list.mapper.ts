import type { TaskListResponse } from "@/types/task";

import { mapTask } from "./task.mapper";

export const mapTaskList = (data: TaskListResponse): TaskListResponse => {
  return {
    ...data,
    items: data.items.map(mapTask),
  };
};
