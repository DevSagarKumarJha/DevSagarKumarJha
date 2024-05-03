import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(1,{ message: "Content must not be empty"}),
    content: z.string().min(1, { message: "Content must not be empty"}).max(1000, { message: "Content must  not be longer than 300 characters" }),
    img: z.array(z.string()).optional(),
    createdAt: z.date(),
})