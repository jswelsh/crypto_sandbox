const ethers = require('ethers');

/*
    -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
    standalone: {
        name: 'moonbeam-standalone',
        rpc: 'http://localhost:9933',
        chainId: 1281,
    },
    moonbase: {
        name: 'moonbase-alpha',
        rpc: 'https://rpc.testnet.moonbeam.network',
        chainId: 1287,
    },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.standalone.rpc,
    {
        chainId: providerRPC.standalone.chainId,
        name: providerRPC.standalone.name,
    }
); //Change to correct network

// Variables
const account_from = {
    privateKey: '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342'/* 'YOUR-PRIVATE-KEY-HERE', */
};
const addressTo = '0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b'/* 'ADDRESS-TO-HERE'; */

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
-- Create and Deploy Transaction --
*/
const send = async () => {
    console.log(
        `Attempting to send transaction from ${wallet.address} to ${addressTo}`
    );

   // Create Tx Object
    const tx = {
        to: addressTo,
        value: ethers.utils.parseEther('1'),
    };

    // Sign and Send Tx - Wait for Receipt
    const createReceipt = await wallet.sendTransaction(tx);
    await createReceipt.wait();
    console.log(`Transaction successful with hash: ${createReceipt.hash}`);
};

send();