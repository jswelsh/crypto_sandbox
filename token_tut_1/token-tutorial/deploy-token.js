'use strict';

function deploy(builder) {
    // builder.provider
    //   - An ethers Provider connected to the Ethereum network

    // builder.compile(filename [, optimize])
    //   - Comnpile a Solidity file and return a Code object for each contract

    // builder.accounts
    //   - All accounts

    // builder.account
    //   - The current account; change this to affect what account is used
    //     Code.prototype.deploy()

    var codes = builder.compile('./FreeTestToken.sol', true);

    var freeTestTokenCode = codes.FreeTestToken;

    return freeTestTokenCode.deploy();
}

module.exports = deploy;
