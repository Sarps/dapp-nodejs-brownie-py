from brownie import Main, accounts


def test_balance():
    # Arrange
    account = accounts[0]

    # Act
    contract = Main.deploy({"from": account})
    starting_balance = contract.balance()

    # Assert
    assert starting_balance == 0


def test_owner_balance():
    # Arrange
    account = accounts[0]

    # Act
    contract = Main.deploy({"from": account})
    owner_balance = contract.ownerBalance()

    # Assert
    assert owner_balance != 0
