import {z} from 'zod'

const envSchema = z.object({
    PORT: z
    .number()
})