import { z } from "zod";

export const blockUserSchema = z.object({
  blockedUserId: z.string().min(1, "selectUser"),
  comment: z
    .string()
    .max(200, "max200")
    .optional(),
});

export type BlockUserFormData = z.infer<typeof blockUserSchema>;