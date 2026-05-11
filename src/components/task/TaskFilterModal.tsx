import type { TFunction } from "i18next";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import {
  getMineOptions,
  getOrderOptions,
  getPriorityOptions,
  getSortOptions,
  getStatusOptions,
} from "@/constants/taskOptions";
import type { TaskFilters } from "@/types/task";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  onReset: () => void;
  t: TFunction;
}

export default function TaskFilterModal({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  t,
}: Props) {
  const statusOptions = getStatusOptions(t);
  const priorityOptions = getPriorityOptions(t);
  const mineOptions = getMineOptions(t);
  const sortOptions = getSortOptions(t);
  const orderOptions = getOrderOptions(t);

  return (
    <Modal open={open} onClose={onClose} title={t("filterTasks")}>
      <div className="space-y-4">
        <Select
          placeholder={t("status")}
          isClearable
          options={statusOptions}
          value={statusOptions.find((o) => o.value === filters.status) || null}
          onChange={(v) => onChange({ ...filters, status: v?.value })}
        />
        <Select
          placeholder={t("priority")}
          isClearable
          options={priorityOptions}
          value={
            priorityOptions.find((o) => o.value === filters.priority) || null
          }
          onChange={(v) => onChange({ ...filters, priority: v?.value })}
        />
        <Select
          placeholder={t("mine")}
          isClearable
          options={mineOptions}
          value={mineOptions.find((o) => o.value === filters.mine) || null}
          onChange={(v) => onChange({ ...filters, mine: v?.value })}
        />
        <Select
          placeholder={t("sortBy")}
          isClearable
          options={sortOptions}
          value={sortOptions.find((o) => o.value === filters.sort) || null}
          onChange={(v) => onChange({ ...filters, sort: v?.value })}
        />
        <Select
          placeholder={t("order")}
          isClearable
          options={orderOptions}
          value={orderOptions.find((o) => o.value === filters.order) || null}
          onChange={(v) => onChange({ ...filters, order: v?.value })}
        />
        <div className="flex justify-between gap-x-4 pt-4">
          <Button variant="secondary" onClick={onReset}>
            {t("reset")}
          </Button>
          <Button onClick={onClose}>{t("close")}</Button>
        </div>
      </div>
    </Modal>
  );
}
