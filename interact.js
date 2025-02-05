const {Web3} = require('web3');
const fs = require('fs');
require('dotenv').config();

const web3 = new Web3(process.env.Holesky_RPC_URL);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const abi = JSON.parse(fs.readFileSync('EtherWallet_sol_EtherWallet.abi', 'utf8'));
const contractAddress = '0xD3B9b52366BB33Cf855057E51dC9f17b4300d962';
const contract = new web3.eth.Contract(abi, contractAddress);

const interact = async () => {
    // Check contract balance
    const balance = await contract.methods.getBalance().call();
    console.log("Contract Balance:", web3.utils.fromWei(balance, 'ether'), "ETH");

    // Withdraw funds (only owner)
    const withdrawTx = await contract.methods.withdraw().send({ from: account.address });
    console.log("Withdraw Transaction:", withdrawTx);

    // Check balance after withdrawal
    const newBalance = await contract.methods.getBalance().call();
    console.log("New Contract Balance:", web3.utils.fromWei(newBalance, 'ether'), "ETH");
};

interact();