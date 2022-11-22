<script setup lang="ts">
import ConnectWalletBtn from './ConnectWalletBtn.vue'
import ContractCard from './ContractCard.vue'
import { useConnectWallet } from '../stores/connectWallet'

const walletConnected = useConnectWallet()
</script>

<template>
  <div>
    <ConnectWalletBtn />
  </div>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello Shadower</h1>
        <div v-if="walletConnected.connectedWallet">
          <p class="py-6">
            You can deploy your own 'example.sol' contract or use this test contract address:
            0x06c742474F40b77B747bC447096B6c3d3e596E71 (Goerli testnet)
          </p>
          <h2>
            <ContractCard />
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
