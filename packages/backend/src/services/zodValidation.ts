import {z} from 'zod'

const envSchema = z.object({
    PORT: z.number().optional()
})

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success){
    console.error('❌ Invalid environment variables.', JSON.stringify(parsedEnv.error.format(), null, 4))
    process.exit(1)
}
export const validatedENV = parsedEnv.data