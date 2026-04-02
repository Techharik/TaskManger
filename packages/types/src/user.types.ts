import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalida email address"),
  password: z.string().min(6, "Passowrd mush be atleast 6 chars"),
});

export const loginSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 chacracters"),
});

export type registerDto = z.infer<typeof registerSchema>;
export type loginDto = z.infer<typeof loginSchema>;
