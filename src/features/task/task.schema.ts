import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "titleRequired"),
  description: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

  assigneeId: z.string().optional(),
  visibility: z.enum(["ONLY_ME", "LIST", "ANYONE"]).optional(),

  viewerUserIds: z.array(z.string()).optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;