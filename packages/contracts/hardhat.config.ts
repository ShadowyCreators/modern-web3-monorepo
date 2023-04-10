import { validatedENV } from './src/services/zodValidation'
import chalk from 'chalk'
import { HardhatUserConfig } from 'hardhat/types'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy'
import 'solidity-coverage'

const forkingEthConfig = {
  url: <string>validatedENV.FORK_ETH_URL
  // blockNumber: parseInt(validatedENV.FORK_BLOCK_NUMBER!),
}

const forkingPolConfig = {
  url: <string>validatedENV.FORK_POL_URL
  // blockNumber: parseInt(validatedENV.FORK_BLOCK_NUMBER!),
}

const mochaConfig = {
  grep: '@forked',
  invert: !validatedENV.FORK,
  timeout: validatedENV.FORK ? 150000 : 20000
} as Mocha.MochaOptions

checkForkedProviderEnvironment()

interface HardhatUserConfigExtended extends HardhatUserConfig {
  typechain: {
    outDir: string
    target: string
  }
}

const config: HardhatUserConfigExtended = {
  solidity: {
    version: '0.8.15',
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  namedAccounts: {
    owner: 0,
    user: 1
  },
  networks: {
    hardhat: {
      chainId: validatedENV.FORK ? parseInt(validatedENV.FORK_CHAINID!) : 31337,
      // gas: "auto",
      // allowUnlimitedContractSize: true,
      forking: validatedENV.FORK
        ? validatedENV.FORK_CHAINID == (1).toString()
          ? forkingEthConfig
          : forkingPolConfig
        : undefined,
      accounts: {
        mnemonic: validatedENV.MNEMONIC,
        accountsBalance: '1000000000000000000000000000000'
      },
      live: false,
      saveDeployments: false,
      tags: ['hardhat']
    },
    polygon: {
      chainId: 137,
      url: 'https://polygon-mainnet.infura.io/v3/' + validatedENV.INFURA_TOKEN,
      // @ts-ignore
      accounts: { mnemonic: validatedENV.MNEMONIC },
      live: true,
      saveDeployments: true,
      tags: ['polygon']
    },
    polygon_fork: {
      chainId: 137,
      url: 'http://127.0.0.1:8545',
      live: true,
      saveDeployments: true,
      tags: ['polygon_fork']
    }
  },
  mocha: mochaConfig,
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5'
  },
  verify: {
    etherscan: {
      apiKey: validatedENV.POLYGONSCAN_API_KEY
    }
  }
}

function checkForkedProviderEnvironment() {
  if (
    validatedENV.FORK &&
    ((!validatedENV.FORK_ETH_URL && !validatedENV.FORK_POL_URL) ||
      validatedENV.FORK_ETH_URL === 'fake_fork_endpoint' ||
      validatedENV.FORK_POL_URL === 'fake_fork_endpoint')
  ) {
    console.log(
      chalk.red(
        'You are running forked provider tests with invalid endpoint.\n' +
          'Update your FORK_ENDPOINT  settings in the `.env` file.'
      )
    )
    process.exit(1)
  }
}

export default config
