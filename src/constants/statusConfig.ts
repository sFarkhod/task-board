import { CheckCircle2, Circle, Clock } from "lucide-react";

export const statusConfig = {
  todo: {
    icon: Circle,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  inProgress: {
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  done: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
};

export const priorityColors = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

export const statusColors = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-purple-100 text-purple-700",
};

export const taskStatusTranslationKey = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
} as const;

export const taskPriorityTranslationKey = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;
