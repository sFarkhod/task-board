import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import {
  getTaskPrioritySelectOptions,
  getTaskStatusSelectOptions,
  getTaskVisibilitySelectOptions,
} from "@/constants/taskOptions";
import { useRemoveTask } from "@/features/task/hooks/useRemoveTask";
import { useTask } from "@/features/task/hooks/useTask";
import { useTaskUpdate } from "@/features/task/hooks/useTaskUpdate";
import { useUsers } from "@/features/user/hooks/useUsers";
import { mapTaskToUpdatePayload } from "@/mapper/mapTaskToUpdatePayload";
import { useAuthStore } from "@/store/authStore";
import type { UpdateField } from "@/types/task";

import type { Option } from "../ui/CreatableSelect";
import FormField from "../ui/FormField";
import TaskTagsSection from "./TaskTagsSection";

interface Props {
  open: boolean;
  taskId: string | null;
  onClose: () => void;
  refetchTasks?: () => void;
}

export default function TaskModal({
  open,
  taskId,
  onClose,
  refetchTasks,
}: Props) {
  const user = useAuthStore((s) => s.user);

  const { t } = useTranslation("tasks");
  const { data: users } = useUsers();

  const { task, loading } = useTask(taskId || undefined);
  const { update, updating } = useTaskUpdate();
  const { remove, loading: removeLoading } = useRemoveTask();

  const [localTask, setLocalTask] = useState(task);
  const [isDirty, setIsDirty] = useState(false);

  const userOptions = users
    .filter((u) => u.value !== user?.id)
    .map((user) => ({
      label: user.label,
      value: user.value,
    }));

  useEffect(() => {
    if (!open || !task) return;
    const setData = () => {
      setLocalTask(task);
      setIsDirty(false);
    };

    setData();
  }, [task, open]);

  if (!open || loading || !localTask) return null;

  const sendUpdate = async (updatedTask: typeof localTask) => {
    if (!updatedTask) return;

    const prev = localTask;

    setLocalTask(updatedTask);

    try {
      await update(updatedTask.id, mapTaskToUpdatePayload(updatedTask));
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      setLocalTask(prev);
    }
  };
  const handleTextChange = (field: "title" | "description", value: string) => {
    setLocalTask((prev) => (prev ? { ...prev, [field]: value } : prev));
    setIsDirty(true);
  };
  const handleSelectUpdate = async (
    field: UpdateField,
    value: string | string[],
  ) => {
    if (!localTask) return;

    const updated = {
      ...localTask,
      [field]: value,
    };

    if (field === "visibility" && value !== "LIST") {
      updated.viewerUserIds = [];
    }

    try {
      await sendUpdate(updated);
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err));
    } finally {
      refetchTasks?.();
    }
  };

  const handleSave = async () => {
    if (!localTask) return;

    try {
      await sendUpdate(localTask);
      setIsDirty(false);
    } finally {
      refetchTasks?.();
    }
  };
  const handleDelete = async () => {
    try {
      await remove(localTask.id);
      onClose();
      refetchTasks?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={localTask.title}>
      <div className="space-y-4">
        <FormField id="title" label={t("title")}>
          <Input
            value={localTask.title}
            onChange={(e) => handleTextChange("title", e.target.value)}
            placeholder={t("title")}
          />
        </FormField>
        <FormField id="description" label={t("description")}>
          <Textarea
            t={t}
            value={localTask.description}
            onChange={(e) => handleTextChange("description", e.target.value)}
            placeholder={t("description")}
            rows={4}
          />
        </FormField>
        <FormField id="status" label={t("status")}>
          <Select
            options={getTaskStatusSelectOptions(t)}
            value={
              getTaskStatusSelectOptions(t).find(
                (o) => o.value === localTask.status,
              ) || null
            }
            onChange={(v) => handleSelectUpdate("status", v?.value)}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-x-4">
          <FormField id="priority" label={t("priority")}>
            <Select
              options={getTaskPrioritySelectOptions(t)}
              value={
                getTaskPrioritySelectOptions(t).find(
                  (o) => o.value === localTask.priority,
                ) || null
              }
              onChange={(v) => handleSelectUpdate("priority", v?.value)}
            />
          </FormField>
          <FormField id="visibility" label={t("visibility")}>
            <Select
              options={getTaskVisibilitySelectOptions(t)}
              value={
                getTaskVisibilitySelectOptions(t).find(
                  (o) => o.value === localTask.visibility,
                ) || null
              }
              onChange={(v) => handleSelectUpdate("visibility", v?.value)}
            />
          </FormField>
        </div>
        {localTask.visibility === "LIST" && (
          <FormField id="viewers" label={t("viewers")}>
            <Select
              isMulti
              options={userOptions}
              value={userOptions.filter((u) =>
                localTask.viewerUserIds?.includes(u.value),
              )}
              onChange={(selected) => {
                handleSelectUpdate(
                  "viewerUserIds",
                  (selected as Option[]).map((s) => s.value),
                );
              }}
            />
          </FormField>
        )}
        <TaskTagsSection
          task={localTask}
          onTaskChange={setLocalTask}
          refetchTasks={refetchTasks}
        />
        <div className="flex items-center gap-x-4 pt-4">
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={removeLoading}
            className="flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            {t("deleteTask")}
          </Button>
          {isDirty && (
            <Button
              loading={updating}
              onClick={handleSave}
              className="animate-pulse hover:animate-none"
            >
              {t("saveChanges")}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
