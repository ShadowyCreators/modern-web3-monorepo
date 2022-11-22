import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

export interface ConnectWallet {
  chainId: number
  address: string
  provider: any
}

export const useConnectWallet = defineStore('useConnectWallet', {
  state: (): { connectedWallet?: ConnectWallet } => {
    return {
      connectedWallet: undefined
    }
  },
  actions: {
    async connectWallet() {
      try {
        const providerOptions = {
          /* See Provider Options Section */
        }
        const web3Modal = new Web3Modal({
          network: 'mainnet', // optional
          cacheProvider: true, // optional
          providerOptions // required
        })
        const provider = await web3Modal.connect()

        const library = new ethers.providers.Web3Provider(provider)

        const accounts = await library.listAccounts()

        const network = await library.getNetwork()

        this.connectedWallet = {
          chainId: network.chainId,
          address: accounts ? accounts[0] : 'unknown',
          provider
        }

        provider.on('accountsChanged', (accounts: string[]) => {
          if (this.connectedWallet) {
            console.log('account changed')
            this.connectedWallet.address = accounts ? accounts[0] : 'unknown'
          } else {
            console.error('this should not happen')
          }
        })

        provider.on('chainChanged', async (chainId: string) => {
          if (this.connectedWallet) {
            this.connectedWallet.chainId = parseInt(chainId)
          } else {
            console.error('this should not happen')
          }
        })

        // Subscribe to provider connection
        provider.on('connect', () => {
          this.connectedWallet = {
            chainId: network.chainId,
            address: accounts ? accounts[0] : 'unknown',
            provider
          }
        })

        provider.on('disconnect', (error: { code: number; message: string }) => {
          this.connectedWallet = undefined
          console.log(error)
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  getters: {
    accountWithDots: state => {
      if (!state.connectedWallet) return null
      const length = state.connectedWallet.address.length
      return state.connectedWallet.address.substring(0, 5) + '...' + state.connectedWallet.address.substring(length - 4)
    },
    connectedChainName: state => {
      switch (state.connectedWallet?.chainId) {
        case 80001:
          return 'Mumbai Testnet'
        case 137:
          return 'Polygon'
        case 5:
          return 'Goerli Testnet'
        case 1:
          return 'Ethereum'
        default:
          return 'Unsupported Network'
      }
    }
  }
})
