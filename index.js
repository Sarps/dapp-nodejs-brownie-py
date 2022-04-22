require('dotenv').config();

const Web3 = require("web3")
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER));
const account = web3.eth.accounts.wallet.add(process.env.ETH_ACCOUNT_PRIVATE_KEY)

const loadSol = (sol = "Main", contract = "Main") => {
    const bytecode = fs.readFileSync(`bin/${sol}_sol_${contract}.bin`, {encoding: 'utf-8'})
    const abi = JSON.parse(fs.readFileSync(`bin/${sol}_sol_${contract}.abi`, {encoding: 'utf-8'}))
    return {bytecode, abi}
}

const deploy = async ({bytecode, abi}) => {
    return new web3.eth.Contract(abi, null, {
        from: account.address,
        gas: +process.env.ETH_TXN_GAS,
        gasPrice: web3.utils.toWei(process.env.ETH_TXN_GAS_PRICE, 'ether'),
        data: bytecode
    }).deploy().send();
}

deploy(loadSol()).then(contract =>
    contract.methods.balance().call()
).then(console.log)

