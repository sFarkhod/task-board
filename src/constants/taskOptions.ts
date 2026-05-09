import type { TFunction } from "i18next";

export const getStatusOptions = (t: TFunction) => [
  { label: t("allStatuses"), value: "" },
  { label: t("todo"), value: "TODO" },
  { label: t("inProgress"), value: "IN_PROGRESS" },
  { label: t("done"), value: "DONE" },
];

export const getPriorityOptions = (t: TFunction) => [
  { label: t("allPriorities"), value: "" },
  { label: t("low"), value: "LOW" },
  { label: t("medium"), value: "MEDIUM" },
  { label: t("high"), value: "HIGH" },
];

export const getMineOptions = (t: TFunction) => [
  { label: t("allTasks"), value: "all" },
  { label: t("createdByMe"), value: "created" },
  { label: t("assignedToMe"), value: "assigned" },
  { label: t("involved"), value: "involved" },
];

export const getTaskStatusSelectOptions = (t: TFunction) => [
  { label: t("todo"), value: "TODO" },
  { label: t("inProgress"), value: "IN_PROGRESS" },
  { label: t("done"), value: "DONE" },
];

export const getTaskPrioritySelectOptions = (t: TFunction) => [
  { label: t("low"), value: "LOW" },
  { label: t("medium"), value: "MEDIUM" },
  { label: t("high"), value: "HIGH" },
];

export const getTaskVisibilitySelectOptions = (t: TFunction) => [
  { label: t("onlyMe"), value: "ONLY_ME" },
  { label: t("public"), value: "PUBLIC" },
];
