import { Example__factory } from '../typechain/index';
import chai, { use } from 'chai';
import { solidity } from "ethereum-waffle";
import { Account } from './utils/types';
import { Example } from "../typechain/contracts/Example"
import { getAccounts } from './utils/accounts';


chai.use(solidity);
const { expect } = chai;

describe("@forked-test", async ()=>{
    let Example : Example;
    let owner : Account;
    let user : Account;
    const exampleVariable = "first string to test";
    before(async () => {
        [ owner, user ] = await getAccounts();
        Example = await new Example__factory(owner.wallet).deploy(exampleVariable);
    });

    it("getExampleVariable after consturction", async () => { 
        let retVal = await Example.getExampleVariable();
        expect(retVal).to.be.equal(exampleVariable);
    });
    it("getExampleVariable after set", async() => {
        let exampleVariable_withGet = "second string to test";
        await Example.setExampleVariable(exampleVariable_withGet);
        let retVal = await Example.getExampleVariable();
        expect(retVal).to.be.equal(exampleVariable_withGet);
    });
    }
);
