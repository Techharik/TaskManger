import { z } from "zod";
export const registerSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalida email address"),
    about: z.string().optional(),
    password: z.string().min(6, "Passowrd mush be atleast 6 chars"),
});
export const loginSchema = z.object({
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(6, "Password must be at least 6 chacracters"),
});
export const updateShema = z.object({
    name: z.string().min(3, "Name is required").optional(),
    email: z.string().email("Invalida email address").optional(),
    about: z.string().min(10, "minium 5 chars").optional(),
});
