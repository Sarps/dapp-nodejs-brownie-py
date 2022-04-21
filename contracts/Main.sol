
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "Ballot.sol";

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

}
