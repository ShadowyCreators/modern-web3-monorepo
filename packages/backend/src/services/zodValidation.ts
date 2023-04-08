import {z} from 'zod'

const envSchema = z.object({
    PORT: z
    .number()
})

export const parsedEnv = envSchema.safeParse(process.env)
