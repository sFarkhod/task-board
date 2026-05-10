import { Plus } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import Select from "@/components/ui/Select";
import {
  getMineOptions,
  getPriorityOptions,
  getStatusOptions,
} from "@/constants/taskOptions";
import type { TaskFilters } from "@/types/task";

import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";

interface Props {
  filters: TaskFilters;
  onChange: (filters: Partial<TaskFilters>) => void;
  setOpen: (open: boolean) => void;
}

function TaskFilters({ filters, onChange, setOpen }: Props) {
  const { t } = useTranslation("tasks");

  const statusOptions = getStatusOptions(t);
  const priorityOptions = getPriorityOptions(t);
  const mineOptions = getMineOptions(t);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center gap-x-4">
        <SearchInput
          placeholder={t("searchTasks")}
          value={filters.q || ""}
          onChange={(value) => onChange({ q: value })}
          className="max-w-96"
        />
        <Button
          variant="primary"
          className="max-w-40 flex items-center justify-center rounded-lg px-4"
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-2" size={20} />
          <span>{t("newTask")}</span>
        </Button>
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <Select
          options={statusOptions}
          value={statusOptions.find((o) => o.value === filters.status) || null}
          onChange={(value) =>
            onChange({
              status: value?.value as TaskFilters["status"],
            })
          }
          placeholder={t("status")}
          isClearable
        />
        <Select
          options={priorityOptions}
          value={
            priorityOptions.find((o) => o.value === filters.priority) || null
          }
          onChange={(value) =>
            onChange({
              priority: value?.value as TaskFilters["priority"],
            })
          }
          placeholder={t("priority")}
          isClearable
        />
        <Select
          options={mineOptions}
          value={mineOptions.find((o) => o.value === filters.mine) || null}
          onChange={(value) =>
            onChange({
              mine: value?.value as TaskFilters["mine"],
            })
          }
          placeholder={t("mine")}
          isClearable
        />
      </div>
    </div>
  );
}

export default memo(TaskFilters);
