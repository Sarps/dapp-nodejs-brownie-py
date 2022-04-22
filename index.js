require('dotenv').config();

const Web3 = require("web3")
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER));

const loadSol = (sol = "Main", contract = "Main") => {
    const bytecode = fs.readFileSync(`bin/${sol}_sol_${contract}.bin`, {encoding: 'utf-8'})
    const abi = JSON.parse(fs.readFileSync(`bin/${sol}_sol_${contract}.abi`, {encoding: 'utf-8'}))
    return {bytecode, abi}
}

const deploy = async ({bytecode, abi}) => {
    const MainContract = await (new web3.eth.Contract(abi))
        .deploy({data: bytecode})
        .send({
            from: process.env.ETH_ACCOUNT_ADDRESS,
            gas: +process.env.ETH_TXN_GAS,
            gasPrice: web3.utils.toWei('0.00003', 'ether')
        });

    return MainContract;
}

deploy(loadSol()).then(contract => {
    console.log(contract.methods.balance())
})

