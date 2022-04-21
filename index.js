require('dotenv').config();

const Web3 = require("web3")
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER));

const bytecode = fs.readFileSync('bin/Main_sol_Main.bin', {encoding: 'utf-8'})
const abi = JSON.parse(fs.readFileSync('bin/Main_sol_Main.abi', {encoding: 'utf-8'}))

const MainContract = new web3.eth.Contract(abi)
MainContract.deploy({data: bytecode})
    .send({
        from: '0x52d9806D0f35a2bb3abC2d99e5C97A7a1da8267f',
        gas: 1500000,
        gasPrice: web3.utils.toWei('0.00003', 'ether')
    })
    .then(instance => {
        MainContract.options.address = instance.options.address
        web3.eth.accounts.signTransaction({
            from: process.env.ETH_ACCOUNT_ADDRESS,
        }, process.env.ETH_ACCOUNT_PRIVATE_KEY)

        // contract.methods.fund
        console.log(MainContract)
    });

