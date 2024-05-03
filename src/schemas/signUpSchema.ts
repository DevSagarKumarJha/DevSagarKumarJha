import { string, z } from "zod";

export const phoneValidation = z
    .string()
    .regex(/^\+(?:[0-9] ?){6,14}[0-9]$/)


export const adminIdValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must not be more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any special characters")


export const signUpSchema = z.object(
    {
        adminId: adminIdValidation,
        name: z.string().max(20, "Name must not be more than 20 characters"),
        phone: phoneValidation,
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must have atleast 6 charcters" })
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_+=]{6,}$/)
    }
)