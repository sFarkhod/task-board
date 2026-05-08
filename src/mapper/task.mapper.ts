import type { Task } from "@/types/task";

import { mapTags } from "./tag.mapper";

export const mapTask = (task: Task): Task => {
  return {
    ...task,

    title: task.title?.trim() ?? "",
    description: task.description?.trim() ?? "",

    creator: task.creator
      ? {
          id: task.creator.id,
          nickname: task.creator.nickname,
          email: task.creator.email,
        }
      : task.creator,

    assignee: task.assignee
      ? {
          id: task.assignee.id,
          nickname: task.assignee.nickname,
          email: task.assignee.email,
        }
      : null,

    tags: mapTags(task.tags),
  };
};