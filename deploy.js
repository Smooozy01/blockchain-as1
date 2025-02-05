const {Web3} = require('web3');
const fs = require('fs');
require('dotenv').config();

const web3 = new Web3(process.env.Holesky_RPC_URL);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const bytecode = fs.readFileSync('EtherWallet_sol_EtherWallet.bin', 'utf8');
const abi = JSON.parse(fs.readFileSync('EtherWallet_sol_EtherWallet.abi', 'utf8'));

const deploy = async () => {
    const contract = new web3.eth.Contract(abi);
    const tx = contract.deploy({ data: bytecode });
    const gas = await tx.estimateGas({from: account.address});
    const gasPrice = await web3.eth.getGasPrice();
    const result = await tx.send({ from: account.address, gas, gasPrice });

    console.log("Contract deployed at address:", result.options.address);
};

deploy();