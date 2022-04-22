
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Main {

    mapping(address => uint256) public payments;
    address internal owner;

    modifier ownerAccount() {
        require(msg.sender == owner, "You can't withdraw");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function fund() public payable {}

    function withdraw() public payable ownerAccount {
        payable(owner).transfer(address(this).balance);
    }

    function balance() public view ownerAccount returns(uint256) {
        return address(this).balance;
    }

    function ownerBalance() public view ownerAccount returns(uint256) {
        return address(owner).balance;
    }

}
