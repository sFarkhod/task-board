import { api } from "@/api/axios";
import type { Task, TaskFilters,TaskListResponse } from "@/types/task";

export const getTasks = (params?: TaskFilters) =>
  api.get<TaskListResponse>("/tasks", { params });

export const getTaskById = (id: string) => api.get<Task>(`/tasks/${id}`);

export const createTask = (data: Partial<Task>) =>
  api.post<Task>("/tasks", data);

export const updateTask = (id: string, data: Partial<Task>) =>
  api.put(`/tasks/${id}`, { data });

export const removeTask = (id: string) =>
  api.delete(`/tasks/${id}`);

export const updateTaskStatus = (id: string, status: Task["status"]) =>
  api.patch(`/tasks/${id}/assignee-status`, { status });

export const assignTask = (id: string, assigneeId: string) =>
  api.post(`/tasks/${id}/assignment`, { assigneeId });

export const approveAssignment = (id: string) =>
  api.post(`/tasks/${id}/assignment/approve`);

export const rejectAssignment = (id: string, comment: string) =>
  api.post(`/tasks/${id}/assignment/reject`, {
    blockAssigner: false,
    comment,
  });

export const addTaskTag = (id: string, name: string) =>
  api.post<Task>(`/tasks/${id}/tags`, { name });

export const removeTaskTag = (id: string, tagId: string) =>
  api.delete(`/tasks/${id}/tags/${tagId}`);