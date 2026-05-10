import { useState } from "react";
import { useTranslation } from "react-i18next";

import TaskAddModal from "@/components/task/TaskAddModal";
import TaskCard from "@/components/task/TaskCard";
import TaskFilters from "@/components/task/TaskFilters";
import TaskModal from "@/components/task/TaskModal";
import Spinner from "@/components/ui/Spinner";
import { useTasks } from "@/features/task/hooks/useTasks";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Board() {
  usePageTitle("board");
  const { t } = useTranslation("tasks");
  const { tasks, loading, filters, setFilters, refetch } = useTasks();

  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setModalOpen(true);
  };

  return (
    <div className="pt-2">
      <TaskFilters filters={filters} onChange={setFilters} setOpen={setOpen} />

      {loading ? (
        <Spinner size="md" color="#D9DFE4" />
      ) : tasks.length === 0 ? (
        <div className="text-gray-500">{t("noTasksFound")}</div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => handleTaskClick(task.id)}
            />
          ))}
        </div>
      )}

      <TaskAddModal
        key={open ? "open" : "closed"}
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={refetch}
      />

      <TaskModal
        key={modalOpen ? "taskOpened" : "taskClosed"}
        open={modalOpen}
        taskId={selectedTaskId}
        onClose={() => {
          setModalOpen(false);
          setSelectedTaskId(null);
        }}
        refetchTasks={refetch}
      />
    </div>
  );
}
