import { z } from "zod";

export const registerSchema = z.object({
  nickname: z
    .string()
    .min(3, "auth:nickname_min")
    .max(24, "auth:nickname_max")
    .regex(/^[a-z0-9_]+$/, "auth:nickname_invalid"),

  password: z.string().min(8, "auth:password_min"),

  email: z.string().email("auth:invalid_email").optional().or(z.literal("")),
});

export const loginSchema = z.object({
  nickname: z.string().min(1, "auth:nickname_required"),
  password: z.string().min(1, "auth:password_required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
