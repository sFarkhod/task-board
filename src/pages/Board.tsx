import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import BoardColumn from "@/components/task/BoardColumn";
import TaskAddModal from "@/components/task/TaskAddModal";
import TaskFilters from "@/components/task/TaskFilters";
import TaskModal from "@/components/task/TaskModal";
import Spinner from "@/components/ui/Spinner";
import { statusToApiMap } from "@/constants/statusConfig";
import { useTasks } from "@/features/task/hooks/useTasks";
import { useUpdateTaskStatus } from "@/features/task/hooks/useUpdateTaskStatus";
import { useUsers } from "@/features/user/hooks/useUsers";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Board() {
  usePageTitle("board");

  const { t } = useTranslation("tasks");
  const { tasks, loading, filters, setFilters, refetch, loadMore, hasMore } =
    useTasks();
  const { data: users } = useUsers();
  const { ref, inView } = useInView();
  const { updateStatus } = useUpdateTaskStatus();

  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const groupedTasks = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  useEffect(() => {
    if (!inView) return;
    if (!hasMore) return;
    if (loading) return;

    loadMore();
  }, [inView, hasMore, loading, loadMore]);

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setModalOpen(true);
  };
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = statusToApiMap[over.id as keyof typeof statusToApiMap];

    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) return;

    try {
      await updateStatus(taskId, newStatus);

      refetch();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <div className="pt-2">
      <TaskFilters filters={filters} onChange={setFilters} setOpen={setOpen} />
      {tasks.length === 0 && !loading ? (
        <div className="text-gray-500">{t("noTasksFound")}</div>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BoardColumn
              status="todo"
              title={t("todo")}
              users={users}
              tasks={groupedTasks.TODO}
              onTaskClick={handleTaskClick}
              refetchTasks={refetch}
              t={t}
            />
            <BoardColumn
              status="inProgress"
              title={t("inProgress")}
              users={users}
              tasks={groupedTasks.IN_PROGRESS}
              onTaskClick={handleTaskClick}
              refetchTasks={refetch}
              t={t}
            />
            <BoardColumn
              status="done"
              title={t("done")}
              users={users}
              tasks={groupedTasks.DONE}
              onTaskClick={handleTaskClick}
              refetchTasks={refetch}
              t={t}
            />
          </div>
        </DndContext>
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
      <div ref={ref} className="h-10" />
      {loading && (
        <div className="py-6 flex justify-center">
          <Spinner size="md" color="#D9DFE4" />
        </div>
      )}
    </div>
  );
}
