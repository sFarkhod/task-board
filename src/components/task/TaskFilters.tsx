import { Plus } from "lucide-react";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { TaskFilters } from "@/types/task";

import Button from "../ui/Button";
import SearchInput from "../ui/SearchInput";
import TaskFilterModal from "./TaskFilterModal";

interface Props {
  filters: TaskFilters;
  onChange: (filters: Partial<TaskFilters>) => void;
  setOpen: (open: boolean) => void;
}

function TaskFilters({ filters, onChange, setOpen }: Props) {
  const { t } = useTranslation("tasks");

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex justify-between lg:items-center items-start gap-x-4">
        <div className="flex lg:flex-row gap-y-2 flex-col items-center gap-x-3">
          <SearchInput
            placeholder={t("searchTasks")}
            value={filters.q || ""}
            onChange={(value) => onChange({ q: value })}
            className="w-full max-w-64 shrink-0"
          />
          <Button
            variant="default"
            className="px-10 border border-pureSilicon rounded-lg"
            onClick={() => setFilterOpen(true)}
          >
            {t("filter")}
          </Button>
        </div>
        <Button
          variant="primary"
          className="max-w-40 flex items-center justify-center rounded-lg px-4"
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-2" size={20} />
          <span>{t("newTask")}</span>
        </Button>
      </div>

      <TaskFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={(f) => onChange(f)}
        onReset={() =>
          onChange({
            status: undefined,
            priority: undefined,
            mine: undefined,
            tag: "",
            sort: "createdAt",
            order: "desc",
          })
        }
        t={t}
      />
    </div>
  );
}

export default memo(TaskFilters);
