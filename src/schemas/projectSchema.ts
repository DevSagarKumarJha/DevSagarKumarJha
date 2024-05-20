import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title must not be empty"),
    description: z.string().min(1, "Content must not be empty"),
    images: z.object({ url: z.string() }).array(),
    url: z.string().min(1, "URL is required"),
    createdAt: z.date(),
})