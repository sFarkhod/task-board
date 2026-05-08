import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
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
import type { Task,TaskFilters } from "@/types/task";

//! GET TASKS
export const fetchTasks = async (params?: TaskFilters) => {
  try {
    const res = await getTasks(params);
    return mapTaskList(res.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
    return {
      items: [],
      total: 0,
      page: params?.page || 1,
      pageSize: params?.pageSize || 10,
    };
  }
};

//! GET TASK BY ID
export const fetchTaskById = async (id: string) => {
  try {
    const res = await getTaskById(id);
    return mapTask(res.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! CREATE TASK
export const createTaskService = async (data: Partial<Task>) => {
  try {
    const res = await createTask(data);
    return mapTask(res.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! UPDATE TASK
export const updateTaskService = async (id: string, data: Partial<Task>) => {
  try {
    const res = await updateTask(id, data);
    return mapTask(res.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! DELETE TASK
export const deleteTaskService = async (id: string) => {
  try {
    return await removeTask(id);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! STATUS UPDATE
export const updateTaskStatusService = async (
  id: string,
  status: Task["status"],
) => {
  try {
    return await updateTaskStatus(id, status);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! ASSIGN TASK
export const assignTaskService = async (id: string, assigneeId: string) => {
  try {
    return await assignTask(id, assigneeId);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! APPROVE ASSIGNMENT
export const approveAssignmentService = async (id: string) => {
  try {
    return await approveAssignment(id);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! REJECT ASSIGNMENT
export const rejectAssignmentService = async (id: string, comment: string) => {
  try {
    return await rejectAssignment(id, comment);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! TAG ADD
export const addTaskTagService = async (id: string, name: string) => {
  try {
    const res = await addTaskTag(id, name);
    return mapTask(res.data);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};

//! TAG REMOVE
export const removeTaskTagService = async (id: string, tagId: string) => {
  try {
    return await removeTaskTag(id, tagId);
  } catch (error) {
    toast.error(getApiErrorMessage(error));
  }
};
