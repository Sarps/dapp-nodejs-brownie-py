
from brownie import accounts, config, Main

def deploy_main():
    account = accounts[0] # accounts.add(config['wallets']['key'])
    contract = Main.deploy({"from": account})
    print(contract.ownerBalance())

def main():
    print('Deploying main...')
    deploy_main()
