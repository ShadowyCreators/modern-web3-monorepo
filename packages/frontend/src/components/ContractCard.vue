<script setup lang="ts">
import { ethers } from 'ethers'
import { ref } from 'vue'
import { exampleOperations } from '../composable/exampleOperations'
import { exampleContractInfo } from '../stores/erc20Contract'

const contractAddress = ref('')

const contractInfo = exampleContractInfo()

const contractExampleInfo = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as unknown as ethers.providers.ExternalProvider)
  await contractInfo.fetchContactInfo(contractAddress.value, provider)
  console.log(updateNewVariable.value, 'new variable')
}

const { setExampleVariable, updateNewVariable } = exampleOperations()
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="Type here the CONTRACT ADDRESS"
      v-model="contractAddress"
      class="relative input input-bordered input-accent w-full max-w-xs"
    />

    <button
      type="submit"
      class="absolute inline-block ml-5 mt-1 justify-center w-40 py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="contractExampleInfo"
    >
      Check Address
    </button>
  </div>
  <div>
    <input
      type="text"
      placeholder="Type here the NEW VARIABLE"
      v-model="updateNewVariable.newVariable"
      class="relative input input-bordered mt-5 input-accent w-full max-w-xs"
    />
    <button
      type="submit"
      :disabled="updateNewVariable.loading"
      class="absolute inline-block ml-5 mt-6 justify-center w-40 py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="setExampleVariable(contractAddress)"
    >
      Set Variable
    </button>
    <h1 class="text-accent mt-4">Contract Info:</h1>
    <ul class="mt-2 w-100" v-if="contractInfo.address">
      <li v-for="(value, key) in contractInfo.info">
        <span class="text-center"> {{ key.toLocaleUpperCase() }}: </span
        ><span class="text-xl text-accent"> {{ value }} </span>
      </li>
    </ul>
  </div>
</template>
