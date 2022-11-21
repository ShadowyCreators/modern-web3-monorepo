import type { BigNumber } from 'ethers'

export interface ContractAddress {
  address: string
  info: {
    name: string
    symbol: string
    totalSupply: BigNumber
    exampleVariable: string
  }
}
