import type { Example } from '../../../contracts/typechain/index'
import exampleArtifact from '../../../contracts/artifacts/contracts/example.sol/example.json'
import { BigNumber, ethers, Signer } from 'ethers'
import type { ContractAddress } from '../types/example'
import { defineStore } from 'pinia'

export const exampleContractInfo = defineStore('contract-info', {
  state: (): ContractAddress => ({
    address: '',
    info: {
      name: '',
      symbol: '',
      totalSupply: BigNumber.from(0),
      exampleVariable: ''
    }
  }),
  getters: {
    currentContractAddress: state => {
      if (state.address === '') return 'no address'
      return state.address
    },
    currentContractInfo: state => {
      if (state.address === '') return 'no address, info'
      return state.info
    }
  },
  actions: {
    async fetchContactInfo(address: string, provider: ethers.providers.Provider) {
      try {
        const contractInstance = new ethers.Contract(address, exampleArtifact.abi, provider) as Example
        this.address = address
        this.info = {
          name: await contractInstance.name(),
          symbol: await contractInstance.symbol(),
          totalSupply: await contractInstance.totalSupply(),
          exampleVariable: await contractInstance.getExampleVariable()
        }
      } catch (err) {
        alert('problem while fetching info')
      }
    }
  }
})
