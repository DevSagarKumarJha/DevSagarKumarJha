import {z} from 'zod';

export const uploadProfilePicSchema = z.object({
    imgurl: z.string().url()
});