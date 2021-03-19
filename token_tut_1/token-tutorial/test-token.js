'use strict';

var assert = require('assert');

var ethers = require('ethers');
var tools = require('ethers-cli');

// Our deployment script
var deployToken = require('./deploy-token.js');

// This is called by the Mocha test framework before each test
// is executed. You do not need to use Mocha for ethers-cli
// but it is a wonderful system. :)

// We keep a global builder object, which is assigned during each
// test case's setup
var builder = null;
beforeEach(function() {

    // Construct a new test builder
    builder = new tools.TestBuilder(deployToken);

    // Deploy the contract into this builder
    return builder.deploy();

});

describe('Minting', function() {
    it('mints tokens to a call to mint', function() {

        // Since we returned code.deploy() from our deployTokens, that
        // is assigned to the deployed property; which returns a contract.
        var tokenReadOnly = builder.deployed.connect(builder.provider);

        // You could also use `builder.deployments.FreeTestToken` to get the
        // deployed contract

        // Create a connection to the contract as a different user (A)
        var accountA = builder.accounts[1];
        var tokenUserA = builder.deployed.connect(accountA);

        // Create a connection to the contract as a different user (B)
        var accountB = builder.accounts[2];
        var tokenUserB = builder.deployed.connect(accountB);

        var seq = Promise.resolve();

        seq = seq.then(function() {
            return tokenUserA.mint();
        });


        seq = seq.then(function() {
            return tokenReadOnly.balanceOf(accountA.address).then(function(result) {
                var balance = result.balance;
                assert.ok(balance.eq(ethers.utils.parseEther('1.0')), 'After minting, the user has 1 ether worth of FreeTestTokens');
            });
        });

        // EXERCISE:
        //   Add test cases for transferring from user A to B

        // Return the promise so the test case waits until complete
        return seq;
    });
});
