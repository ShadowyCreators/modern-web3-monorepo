import {z} from 'zod'
require('dotenv').config()

const envSchema = z.object({
    PORT: z
    .number()
})

export const parsedEnv = envSchema.safeParse(process.env)