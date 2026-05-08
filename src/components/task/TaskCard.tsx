import type { Task } from "@/types/task";

import Card from "../ui/Card";

interface Props {
  task: Task;
}

const priorityColors = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusColors = {
  TODO: "bg-gray-100 text-gray-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  DONE: "bg-purple-100 text-purple-700",
};

export default function TaskCard({ task }: Props) {
  return (
    <Card className="shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">{task.title}</h2>

          {task.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 wrap-break-word">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
            statusColors[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        {/* Priority */}
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>

        {/* Assignee */}
        <div className="text-xs text-gray-500 truncate max-w-32">
          {task.assignee ? `@${task.assignee.nickname}` : "Unassigned"}
        </div>
      </div>
    </Card>
  );
}
