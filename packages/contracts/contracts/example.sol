pragma solidity 0.8.15;

// SPDX-License-Identifier: MIT
// Source code: https://github.com/ShadowyCreators/modern-web3-monorepo

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract example is ERC20 {
    string internal _exampleVariable;

    constructor(string memory exampleVariable) 
        ERC20("exampleERC20", "EXAMPLE")
    {
        _exampleVariable = exampleVariable;
    }

    function setExampleVariable(string memory exampleVariable) external {
        _exampleVariable = exampleVariable;
    }

    function getExampleVariable() external view returns (string memory) {
        return _exampleVariable;
    }
}
