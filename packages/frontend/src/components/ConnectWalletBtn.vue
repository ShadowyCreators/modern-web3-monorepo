<script setup lang="ts">
import { useConnectWallet } from '../stores/connectWallet'

const walletConnected = useConnectWallet()
</script>

<template>
  <div
    class="btn btn-accent btn-lg bg-green-800 absolute rounded-lg border-collapse text-center top-10 right-20 w-60 h-20"
    @click="walletConnected.connectWallet"
  >
    {{
      walletConnected.connectedWallet?.chainId
        ? `${walletConnected.accountWithDots} on ${walletConnected.connectedChainName}`
        : 'Connect Wallet'
    }}
  </div>
</template>
