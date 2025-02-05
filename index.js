const {Web3} = require('web3');
require('dotenv').config();

// Connect to Holesky Testnet
const web3 = new Web3(process.env.Holesky_RPC_URL);

// Set up account using private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

console.log("Connected to Holesky Testnet. Account:", account.address);