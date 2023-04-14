import {z} from 'zod'

const envSchema = z.object({
    PORT: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))).optional()
})

export const parsedEnv = envSchema.parse(process.env)