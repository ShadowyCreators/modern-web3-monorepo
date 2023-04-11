import {z} from 'zod'
require('dotenv').config()

const envSchema = z.object({
    MNEMONIC: z
        .string()
        .refine(
          mnemonic => !mnemonic || mnemonic.split(/[\s,|-]+/).length === 12 || mnemonic.split(/[\s,|-]+/).length === 24
        ),
    INFURA_TOKEN: z.string(),
    FORK_ETH_URL: z
            .string()
            .url(), 
    FORK: z
        .boolean()
        .optional(), 
    FORK_POL_URL: z
        .string()
        .url(), 
    FORK_CHAINID: z
        .string()
        .optional(), 
    POLYGONSCAN_API_KEY: z
        .string()
        .optional()
})

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success){
    console.error('❌ Invalid environment variables.', JSON.stringify(parsedEnv.error.format(), null, 4))
    process.exit(1)
}
export const validatedENV = parsedEnv.data
