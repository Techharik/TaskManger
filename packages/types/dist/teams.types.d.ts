import { z } from "zod";
export declare const createTeamSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateTeamSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    photo: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const addMemberSchema: z.ZodObject<{
    targetUserId: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        MEMBER: "MEMBER";
        VIEWER: "VIEWER";
    }>>;
}, z.core.$strip>;
export type CreateTeamDto = z.infer<typeof createTeamSchema>;
export type UpdateTeamDto = z.infer<typeof updateTeamSchema>;
export type AddMemberDto = z.infer<typeof addMemberSchema>;
