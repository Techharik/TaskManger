import { z } from "zod";
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    projectId: z.ZodString;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        TODO: "TODO";
        IN_PROGRESS: "IN_PROGRESS";
        DONE: "DONE";
    }>;
}, z.core.$strip>;
export declare const assignTaskSchema: z.ZodObject<{
    userId: z.ZodString;
}, z.core.$strip>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
export type UpdateStatusDto = z.infer<typeof updateStatusSchema>;
export type AssignTaskDto = z.infer<typeof assignTaskSchema>;
