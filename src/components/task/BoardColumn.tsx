import clsx from "clsx";

import { statusConfig } from "@/constants/statusConfig";
import type { Task } from "@/types/task";

import TaskCard from "./TaskCard";

interface Props {
  status: string;
  title: string;
  tasks: Task[];
  users: { label: string; value: string }[];
  refetchTasks?: () => void;
  onTaskClick?: (taskId: string) => void;
  t: (key: string) => string;
}

export default function BoardColumn({
  status,
  title,
  tasks,
  users,
  refetchTasks,
  onTaskClick,
  t,
}: Props) {
  const config =
    statusConfig[status as keyof typeof statusConfig] ?? statusConfig.todo;
  const StatusIcon = config.icon;
  return (
    <div className="flex flex-col min-w-[20rem] bg-gray-200 rounded-lg shadow">
      <div className="flex items-center justify-between bg-gray-200 rounded-t-lg sticky -top-4 z-10 p-4">
        <span className="flex gap-x-2 items-center">
          <span
            className={clsx(
              "flex h-6 w-6 items-center justify-center rounded-md",
              config.bgColor,
            )}
          >
            <StatusIcon className={clsx("h-3.5 w-3.5", config.color)} />
          </span>
          <span className="font-semibold text-gray-700">{title}</span>
        </span>
        <p className="rounded-full py-1 px-3 bg-gray-300 text-sm text-gray-700">
          {tasks.length}
        </p>
      </div>

      <div className="space-y-3 p-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            users={users}
            task={task}
            refetchTasks={refetchTasks}
            onClick={() => onTaskClick?.(task.id)}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
