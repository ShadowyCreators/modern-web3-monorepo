import {z} from 'zod'

const envSchema = z.object({
    BASE_URL: z
        .string()
        .url()
})

export const parsedEnv = envSchema.safeParse(process.env)
