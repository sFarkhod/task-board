export const getAssignmentStatusLabel = (
  status: string,
  t: (key: string) => string,
) => {
  const map: Record<string, string> = {
    NONE: t("none"),
    PENDING: t("pending"),
    APPROVED: t("approved"),
    REJECTED: t("rejected"),
  };

  return map[status] || status;
};