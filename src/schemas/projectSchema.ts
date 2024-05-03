import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title must not be empty"),
    description: z.string().min(1, "Content must not be empty"),
    img: z.array(z.string()).min(1, "At least one image URL is required"),
    url: z.string().min(1, "URL is required"),
    createdAt: z.date(),
})