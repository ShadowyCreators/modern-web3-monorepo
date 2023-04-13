import {z} from 'zod'
require('dotenv').config()

const envSchema = z.object({
    MNEMONIC: z
        .string()
        .refine(
          mnemonic => mnemonic.split(/[\s,|-]+/).length === 12 || mnemonic.split(/[\s,|-]+/).length === 24
        ),
    INFURA_TOKEN: z.string(),
    FORK_ETH_URL: z.string().url(), 
    FORK: z.string().optional(), 
    FORK_POL_URL: z.string().url(), 
    FORK_CHAINID: z.string().optional(), 
    POLYGONSCAN_API_KEY: z.string().optional()
})

export const parsedEnv = envSchema.parse(process.env)
