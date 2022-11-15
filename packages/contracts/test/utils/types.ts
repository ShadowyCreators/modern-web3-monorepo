import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

export type Account = {
  address: string;
  wallet: SignerWithAddress;
};
