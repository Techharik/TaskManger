import { z } from "zod";
export declare const createCommentSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export type CreateCommentDto = z.infer<typeof createCommentSchema>;
