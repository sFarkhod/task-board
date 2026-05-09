import {
  addTaskTag,
  approveAssignment,
  assignTask,
  createTask,
  getTaskById,
  getTasks,
  rejectAssignment,
  removeTask,
  removeTaskTag,
  updateTask,
  updateTaskStatus,
} from "@/api/tasks";
import { mapTask } from "@/mapper/task.mapper";
import { mapTaskList } from "@/mapper/task-list.mapper";
import type { Task, TaskFilters } from "@/types/task";

//! GET TASKS
export const fetchTasks = async (params?: TaskFilters) => {
  const result = await getTasks(params);
  return mapTaskList(result.data);
};

//! GET TASK BY ID
export const fetchTaskById = async (id: string) => {
  const result = await getTaskById(id);
  return mapTask(result.data);
};

//! CREATE TASK
export const createTaskService = async (data: Partial<Task>) => {
  const result = await createTask(data);
  return mapTask(result.data);
};

//! UPDATE TASK
export const updateTaskService = async (id: string, data: Partial<Task>) => {
  const result = await updateTask(id, data);
  return mapTask(result.data);
};

//! DELETE TASK
export const deleteTaskService = async (id: string) => {
  return await removeTask(id);
};

//! STATUS UPDATE
export const updateTaskStatusService = async (
  id: string,
  status: Task["status"],
) => {
  return await updateTaskStatus(id, status);
};

//! ASSIGN TASK
export const assignTaskService = async (id: string, assigneeId: string) => {
  return await assignTask(id, assigneeId);
};

//! APPROVE ASSIGNMENT
export const approveAssignmentService = async (id: string) => {
  return await approveAssignment(id);
};

//! REJECT ASSIGNMENT
export const rejectAssignmentService = async (id: string, comment: string) => {
  return await rejectAssignment(id, comment);
};

//! TAG ADD
export const addTaskTagService = async (id: string, name: string) => {
  const result = await addTaskTag(id, name);
  return mapTask(result.data);
};

//! TAG REMOVE
export const removeTaskTagService = async (id: string, tagId: string) => {
  return await removeTaskTag(id, tagId);
};
