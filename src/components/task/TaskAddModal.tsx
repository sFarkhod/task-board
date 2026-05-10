import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "@/api/handleApiError";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import {
  getTaskPrioritySelectOptions,
  getTaskStatusSelectOptions,
  getTaskVisibilitySelectOptions,
} from "@/constants/taskOptions";
import { useCreateTask } from "@/features/task/hooks/useCreateTask";
import {
  type CreateTaskFormData,
  createTaskSchema,
} from "@/features/task/task.schema";
import { useUsers } from "@/features/user/hooks/useUsers";
import getError from "@/utils/getError";

import type { Option } from "../ui/CreatableSelect";
import FormField from "../ui/FormField";
import Textarea from "../ui/Textarea";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TaskAddModal({ open, onClose, onSuccess }: Props) {
  const { create, loading } = useCreateTask();
  const { data: users } = useUsers();
  const { t } = useTranslation("tasks");
  const { t: tCommon } = useTranslation("common");

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      status: "TODO",
      priority: "LOW",
      visibility: "ANYONE",
      viewerUserIds: [],
    },
  });

  const visibility = watch("visibility");

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      await create(data);
      reset();
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("createTask")}
      description={t("createTaskDescription")}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="title"
          label={t("title")}
          error={getError(t, errors?.title?.message)}
        >
          <Input
            {...register("title")}
            placeholder={t("title")}
            error={errors.title ? true : false}
          />
        </FormField>

        <Textarea
          {...register("description")}
          t={tCommon}
          label={t("description")}
          placeholder={t("description")}
          maxLength={200}
          showRemaining
          rows={4}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormField id="status" label={t("status")}>
              <Select
                placeholder={t("status")}
                options={getTaskStatusSelectOptions(t)}
                value={
                  getTaskStatusSelectOptions(t).find(
                    (o) => o.value === field.value,
                  ) || null
                }
                error={errors.status && t(errors.status.message!)}
                onChange={(v) => field.onChange(v?.value)}
              />
            </FormField>
          )}
        />

        <div className="grid grid-cols-2 gap-x-4">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <FormField id="priority" label={t("priority")}>
                <Select
                  placeholder={t("priority")}
                  options={getTaskPrioritySelectOptions(t)}
                  value={
                    getTaskPrioritySelectOptions(t).find(
                      (o) => o.value === field.value,
                    ) || null
                  }
                  error={errors.priority && t(errors.priority.message!)}
                  onChange={(v) => field.onChange(v?.value)}
                />
              </FormField>
            )}
          />
          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <FormField id="visibility" label={t("visibility")}>
                <Select
                  placeholder={t("visibility")}
                  options={getTaskVisibilitySelectOptions(t)}
                  value={
                    getTaskVisibilitySelectOptions(t).find(
                      (o) => o.value === field.value,
                    ) || null
                  }
                  error={errors.visibility && t(errors.visibility.message!)}
                  onChange={(v) => field.onChange(v?.value)}
                />
              </FormField>
            )}
          />
        </div>

        {visibility === "LIST" && (
          <Controller
            name="viewerUserIds"
            control={control}
            render={({ field }) => (
              <FormField id="viewerUserIds" label={t("viewers")}>
                <Select
                  isMulti
                  options={users}
                  value={users.filter((u) => field.value?.includes(u.value))}
                  onChange={(selected) => {
                    field.onChange(selected.map((s: Option) => s.value));
                  }}
                />
              </FormField>
            )}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="bg-gray-300 text-black"
          >
            {tCommon("cancel")}
          </Button>
          <Button loading={loading} variant="primary" type="submit">
            {t("createTask")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
