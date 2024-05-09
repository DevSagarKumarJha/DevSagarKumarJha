import {z} from 'zod';

export const uploadProfilePicSchema = z.string().url();