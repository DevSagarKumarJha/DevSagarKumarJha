import {z} from 'zod'

export const socialsFormSchema= z.object({
    name: z.string().min(1, "Name must have at least 1 character"),
    url: z.string().url('Invalid credential URL').min(1, 'Credential URL must have at least 1 character').default("")
})