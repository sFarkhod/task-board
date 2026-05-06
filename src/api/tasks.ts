import type { Task } from "../types/task";
import { api } from "./axios";

export const getTasks = () => api.get<Task[]>("/tasks");

export const createTask = (data: Partial<Task>) =>
  api.post<Task>("/tasks", data);

export const updateTask = (id: string, data: Partial<Task>) =>
  api.put<Task>(`/tasks/${id}`, data);

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);