import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "password_min"),
  newPassword: z.string().min(8, "password_min"),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;