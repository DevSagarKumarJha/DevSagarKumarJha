import { z } from 'zod'

export const skillSchema = z.object({
  skill: z.string(),
});