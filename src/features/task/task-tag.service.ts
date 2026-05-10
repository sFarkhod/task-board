import { addTaskTag, removeTaskTag } from "@/api/tasks";
import { mapTask } from "@/mapper/task.mapper";

export const addTaskTagService = async (taskId: string, name: string) => {
  const res = await addTaskTag(taskId, name);
  return mapTask(res.data);
};

export const removeTaskTagService = async (taskId: string, tagId: string) => {
  await removeTaskTag(taskId, tagId);
};
