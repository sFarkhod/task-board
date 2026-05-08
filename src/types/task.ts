import type { User } from "./auth";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type AssignmentStatus = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

export type TaskVisibility = "ONLY_ME" | "PUBLIC" | "PRIVATE";

export type UserModelForTask = Omit<User, "role">;

export type Tag = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;

  status: TaskStatus;
  priority: TaskPriority;
  visibility: TaskVisibility;

  creator: UserModelForTask;
  assignee: UserModelForTask | null;

  assignmentStatus: AssignmentStatus;
  assignedById: string | null;

  viewerUserIds: string[];

  tags: Tag[];

  createdAt: string;
  updatedAt: string;
};

export type TaskFilters = {
  page?: number;
  pageSize?: number;

  status?: TaskStatus;
  priority?: TaskPriority;

  assignmentStatus?: AssignmentStatus;

  q?: string;

  tag?: string[];

  sort?: string;
  order?: "asc" | "desc";

  mine?: "all" | "created" | "assigned" | "involved";
};

export type TaskListResponse = {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
};