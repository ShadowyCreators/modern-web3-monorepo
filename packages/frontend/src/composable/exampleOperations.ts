import exampleArtifact from '../../../contracts/artifacts/contracts/example.sol/example.json'
import { ethers } from 'ethers'
import type { Example } from '../../../contracts/typechain/index'
import { ref } from 'vue'

export const exampleOperations = () => {
  const updateNewVariable = ref({ loading: false, newVariable: '' })

  const setExampleVariable = async (contractAddress: string) => {
    updateNewVariable.value.loading = true
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as unknown as ethers.providers.ExternalProvider
      )
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, exampleArtifact.abi, signer) as Example
      const updateTX = await contractInstance.setExampleVariable(updateNewVariable.value.newVariable)

      await updateTX.wait()

      alert('transaction succeeded!')
      updateNewVariable.value.loading = false
    } catch (error) {
      updateNewVariable.value.loading = false
      alert('ERROR when updating variable')
    }
  }

  return { setExampleVariable, updateNewVariable }
}
