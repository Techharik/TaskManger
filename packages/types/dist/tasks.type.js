import { z } from "zod";
export const createTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    projectId: z.string().uuid(),
});
export const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
});
export const updateStatusSchema = z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});
export const assignTaskSchema = z.object({
    userId: z.string().uuid(),
});
