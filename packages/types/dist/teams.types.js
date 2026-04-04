import { z } from "zod";
export const createTeamSchema = z.object({
    name: z.string().min(3, "Name is required"),
    description: z.string().optional(),
    photo: z.string().url("Invalid photo URL").optional(),
});
export const updateTeamSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    photo: z.string().url().optional(),
});
export const addMemberSchema = z.object({
    targetUserId: z.string().uuid("Invalid user id"),
    role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).optional(),
});
